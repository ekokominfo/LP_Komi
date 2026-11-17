"""Bundle the built prototype into a downloadable offline HTML preview."""
from pathlib import Path
import re,base64,mimetypes
root=Path(__file__).resolve().parents[1]
dist=root/'dist'
html=(dist/'index.html').read_text()
script_path=re.search(r'<script[^>]+src="([^"]+)"[^>]*></script>',html).group(1)
style_path=re.search(r'<link[^>]+href="([^"]+\.css)"[^>]*>',html).group(1)
js=(dist/script_path.lstrip('/')).read_text()
css=(dist/style_path.lstrip('/')).read_text()
for asset in (dist/'assets').iterdir():
 if asset.suffix in ('.png','.jpeg','.jpg','.webp'):
  url='/assets/'+asset.name
  if url in js:
   uri='data:'+mimetypes.guess_type(asset)[0]+';base64,'+base64.b64encode(asset.read_bytes()).decode()
   js=js.replace(url,uri)
html=re.sub(r'<script[^>]+src="[^"]+"[^>]*></script>',lambda m:'<script type="module">'+js.replace('</script','<\\/script')+'</script>',html)
html=re.sub(r'<link[^>]+href="[^"]+\.css"[^>]*>',lambda m:'<style>'+css+'</style>',html)
out=root/'Preview-Diskominfostandi.html';out.write_text(html)
print(out, out.stat().st_size,'bytes')
