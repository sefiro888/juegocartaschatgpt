import { spawnSync } from 'node:child_process';
import { fileURLToPath } from 'node:url';

function readPositiveInteger(args, flag, fallback) {
  const index = args.indexOf(flag);
  if (index === -1) return fallback;

  const value = Number.parseInt(args[index + 1] ?? '', 10);
  if (!Number.isInteger(value) || value < 1) {
    throw new Error(`${flag} requiere un numero entero mayor que cero.`);
  }
  return value;
}

function readString(args, flag, fallback) {
  const index = args.indexOf(flag);
  if (index === -1) return fallback;

  const value = args[index + 1]?.trim();
  if (!value) throw new Error(`${flag} requiere un valor.`);
  return value;
}

const args = process.argv.slice(2);
const seeds = readPositiveInteger(args, '--seeds', 3);
const rounds = readPositiveInteger(args, '--rounds', 60);
const seedPrefix = readString(args, '--seed-prefix', 'balance-cli');
const totalMatches = 12 * 11 * seeds;
const vitestEntry = fileURLToPath(new URL('../node_modules/vitest/vitest.mjs', import.meta.url));
const seedLabel = seeds === 1 ? 'semilla' : 'semillas';

console.info(
  `Analizando ${totalMatches} partidas (${seeds} ${seedLabel} por emparejamiento, ${rounds} rondas maximas)...`,
);

const result = spawnSync(
  process.execPath,
  [
    vitestEntry,
    'run',
    'src/core/__tests__/balanceAnalysis.test.ts',
    '--reporter=verbose',
  ],
  {
    cwd: fileURLToPath(new URL('..', import.meta.url)),
    stdio: 'inherit',
    env: {
      ...process.env,
      BALANCE_REPORT: '1',
      BALANCE_SEEDS: String(seeds),
      BALANCE_ROUNDS: String(rounds),
      BALANCE_SEED_PREFIX: seedPrefix,
    },
  },
);

if (result.error) throw result.error;
process.exitCode = result.status ?? 1;
