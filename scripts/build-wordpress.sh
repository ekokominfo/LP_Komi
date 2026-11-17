#!/usr/bin/env bash
set -euo pipefail
cd "$(dirname "$0")/.."
npx vite build --config wordpress/vite.config.js
for asset in logo-kominfo.png logo-pulpis.png icon-pulpis.png office-fallback.png pimpinan.png; do
  cp "public/assets/$asset" wordpress/komi-office/assets/
done
cp node_modules/three/LICENSE wordpress/komi-office/THREE-LICENSE.txt
python - <<'PY'
from pathlib import Path
import zipfile
root=Path('wordpress/komi-office')
with zipfile.ZipFile('downloads/komi-office-wordpress.zip','w',zipfile.ZIP_DEFLATED) as z:
 for p in sorted(root.rglob('*')):
  if p.is_file(): z.write(p, p.relative_to(root.parent))
print('Created downloads/komi-office-wordpress.zip')
PY
