# Linea base de balance local

Fecha: 2026-07-21

## Metodo

- 12 mazos oficiales enfrentados entre si desde ambos lados del tablero.
- 3 semillas por emparejamiento.
- 396 partidas simuladas con las mismas reglas del motor.
- Limite de 60 rondas para detectar bloqueos.
- Politica automatica comun para todos los mazos.

## Resultado

- Partidas terminadas: 387 de 396 (97,7 %).
- Duracion media: 20,4 rondas.
- Las partidas con limite se concentran principalmente en Embestida de Brasas.

| Mazo | Victorias | Derrotas | Empates | Tasa de victoria |
| --- | ---: | ---: | ---: | ---: |
| Embestida de Brasas | 27 | 31 | 8 | 40,9 % |
| Caldera Colosal | 38 | 28 | 0 | 57,6 % |
| Dominio Glacial | 29 | 35 | 2 | 43,9 % |
| Nexus Estelar | 19 | 46 | 1 | 28,8 % |
| Raices Salvajes | 25 | 40 | 1 | 37,9 % |
| Guardianes del Bosque | 27 | 37 | 2 | 40,9 % |
| Legion del Alba | 43 | 23 | 0 | 65,2 % |
| Bastion Dorado | 45 | 19 | 2 | 68,2 % |
| Cripta Maldita | 22 | 42 | 2 | 33,3 % |
| Pacto de Sangre | 31 | 35 | 0 | 47,0 % |
| Abismo Astral | 40 | 26 | 0 | 60,6 % |
| Entropia Silenciosa | 41 | 25 | 0 | 62,1 % |

## Lectura

La muestra ya no presenta mazos sin victorias ni tasas superiores al 70 %. Nexus Estelar sigue siendo el mazo mas exigente y Bastion Dorado el mas consistente. Esta simulacion sirve como alarma y referencia, no sustituye partidas humanas: la politica automatica no puede valorar faroles, posicionamiento creativo ni todas las secuencias de control.

Antes de volver a modificar estadisticas conviene recoger partidas humanas y comparar:

- tasa de victoria por mazo y por posicion inicial;
- ronda de finalizacion;
- cartas sin jugar al terminar;
- dano total al Nexo;
- frecuencia de invocacion, movimiento, ataque y hechizo.
