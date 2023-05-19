#!/bin/env bash
set -e

if [ $# -eq 0 ]; then
  cd /app/
  npm ci && npm run build
  npm --workspace=api run migration:run 
  npm start

else
  exec $@

fi
