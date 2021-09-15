#! /bin/bash
free -m | awk 'FNR == 2 {print $2,$7}'