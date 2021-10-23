#! /bin/bash
free -m | awk 'FNR == 2 {print ($3 / $2) * 100}'