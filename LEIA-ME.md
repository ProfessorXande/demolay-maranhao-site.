# Site do Grande Conselho DeMolay Maranhão

Site estático (HTML, CSS e JavaScript puro), sem banco de dados. Pode ser publicado na Vercel do mesmo jeito que o sistema da Loja.

## Arquivos

- `index.html` — a página (cabeçalho, menu e rodapé)
- `css/estilo.css` — cores, fontes e layout
- `js/dados.js` — **todo o conteúdo**: lideranças, galerias, capítulos e honrarias
- `js/app.js` — monta as páginas a partir dos dados

## Como publicar

1. Crie um repositório novo no GitHub (por exemplo `demolay-maranhao-site`) e envie esta pasta.
2. Na Vercel, clique em "Add New → Project", escolha o repositório e publique. Não precisa configurar nada.
3. Para usar um domínio próprio, adicione-o em "Settings → Domains" do projeto.

## Como atualizar

Quase tudo se atualiza só em `js/dados.js`:

- Nova gestão: copie o bloco da gestão mais recente em `gce` e troque os nomes.
- `cap` é o número do capítulo (ex.: `"919"`). O site escreve sozinho o nome do capítulo e a cidade.
- `foto` usa as imagens do site antigo no Wix. Pessoas sem foto aparecem com as iniciais.

## Fotos

As fotos ainda são carregadas do site antigo no Wix. Se o site do Wix for apagado, as fotos somem
(o site continua funcionando, com as iniciais no lugar). O ideal é, depois, salvar as fotos dentro do repositório.
