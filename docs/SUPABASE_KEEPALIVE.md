# Supabase Free Plan Keep-Alive

## Scope

The online game uses Supabase project `vzqlcdhpywixbmjldhzf`:

- `src/online/supabaseClient.ts` creates the browser client with
  `VITE_SUPABASE_URL` and `VITE_SUPABASE_PUBLISHABLE_KEY`.
- Anonymous Supabase Auth sessions identify both players.
- `src/online/matchService.ts` reads and updates `public.online_matches` and
  subscribes to its Realtime changes.
- Row Level Security limits match access to the participating authenticated
  users.
- `.github/workflows/deploy-pages.yml` already injects the same two public
  values into the GitHub Pages build.

The local `.env.local` points to the expected project. It remains ignored by
Git and no key value is committed by this change.

## Why this exists

Supabase may pause Free Plan projects with insufficient database activity over
a seven-day period. Its documentation says that a few user database requests
per day are typically enough for a low-activity project.

The workflow calls one minimal database function three times per day. It does
not authenticate a player, read a match, update a timestamp, or create rows.

This reduces the likelihood of inactivity pausing, but it is not a service
availability guarantee. Supabase documents a paid plan as the guaranteed way
to disable inactivity pausing.

## Security design

`public.project_keepalive()`:

- accepts no parameters;
- uses `security invoker`;
- has an empty `search_path`;
- reads no tables and returns only the boolean value `true`;
- revokes inherited execution from `public` and `authenticated`;
- grants execution only to the low-privilege `anon` Data API role.

The workflow uses the existing Supabase publishable key. Supabase documents
publishable keys as suitable for browsers and GitHub Actions. It does not use
or require a secret key, `service_role`, database password, personal access
token, or Supabase Management API token.

Never replace the publishable key in this workflow with any elevated key.

## Files

- `supabase/migrations/20260731000000_add_project_keepalive.sql`
- `.github/workflows/supabase-keepalive.yml`
- `docs/SUPABASE_KEEPALIVE.md`

No game source file or dependency is changed.

## One-time activation

### 1. Create the database function

Open Supabase Dashboard for project `vzqlcdhpywixbmjldhzf`, go to `SQL Editor`,
and run the contents of:

`supabase/migrations/20260731000000_add_project_keepalive.sql`

The repository does not currently use Supabase CLI migrations, so committing
the SQL file records the database change but does not apply it automatically.

### 2. Confirm GitHub Actions secrets

In the main repository, open:

`Settings` > `Secrets and variables` > `Actions`

Confirm these repository secrets exist:

- `VITE_SUPABASE_URL`
- `VITE_SUPABASE_PUBLISHABLE_KEY`

`VITE_SUPABASE_URL` must be exactly:

`https://vzqlcdhpywixbmjldhzf.supabase.co`

Use only the `sb_publishable_...` key already used by the web game.

### 3. Put the workflow on the default branch

GitHub only runs scheduled workflows from the default branch. Merge or commit
`.github/workflows/supabase-keepalive.yml` to `main` in
`sefiro888/juegocartaschatgpt`.

### 4. Verify once manually

Open `Actions` > `Keep Supabase project active` > `Run workflow`.

A successful run ends with:

`Supabase database health check completed successfully.`

An HTTP `404` usually means the SQL migration has not been applied. An HTTP
`401` or `403` usually means the publishable key or function grant is wrong.

## Schedule and cost

The workflow runs at `02:23`, `10:23`, and `18:23` UTC. Each execution makes
one small RPC request and uses no repository checkout, Node installation, npm
dependency, build, or game test.

For private repositories, these short jobs consume a small part of the included
GitHub Actions minutes. Standard runners are free for public repositories.

GitHub may delay scheduled jobs during high load. Public-repository schedules
can also be disabled after 60 days without repository activity. If development
stops for that long, check the Actions page and re-enable the workflow.

## Monitoring

- GitHub records every run and reports non-200 responses as failures.
- Enable GitHub notifications for failed Actions workflows.
- Supabase sends warning and confirmation emails when project pausing is being
  considered or has occurred.
- If Supabase changes its Free Plan policy, review this workflow against the
  current official documentation.

## Removal

Delete `.github/workflows/supabase-keepalive.yml`, then run:

```sql
revoke all on function public.project_keepalive() from public, anon, authenticated;
drop function if exists public.project_keepalive();
```

Removing this feature does not affect `online_matches`, player authentication,
Realtime subscriptions, saved match state, or any game rule.

## Official references

- [Supabase project pausing](https://supabase.com/docs/guides/platform/free-project-pausing)
- [Supabase API key security](https://supabase.com/docs/guides/getting-started/api-keys)
- [Supabase database functions](https://supabase.com/docs/guides/database/functions)
- [Supabase Data API security](https://supabase.com/docs/guides/api/securing-your-api)
- [GitHub Actions scheduled workflows](https://docs.github.com/en/actions/reference/workflows-and-actions/events-that-trigger-workflows#schedule)
