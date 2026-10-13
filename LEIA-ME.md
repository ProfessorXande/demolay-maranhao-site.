# Site do Grande Conselho DeMolay Maranhão

Site estático (HTML, CSS e JavaScript puro), publicado na Vercel a partir do GitHub.

## Pastas e arquivos

- `index.html`: a página (cabeçalho, menu, botão de modo claro/escuro e rodapé)
- `css/estilo.css`: cores, fontes e layout, nos modos claro e escuro
- `js/dados.js`: todo o conteúdo (lideranças, galerias, capítulos e honrarias)
- `js/app.js`: monta as páginas a partir dos dados
- `img/liderancas/`: fotos das lideranças atuais
- `img/emblemas/`: emblemas, insígnias e selos das gestões
- `revistas/`: as 8 edições da revista Litteris et Virtutibus (PDF) e as capas

## Como atualizar o site no ar

1. Entre no repositório `demolay-maranhao-site` no GitHub.
2. Clique em "Add file" e depois em "Upload files".
3. Arraste os itens de dentro da pasta do site: index.html, LEIA-ME.md e as pastas css, js, img e revistas.
4. Clique em "Commit changes". Em cerca de 1 minuto a Vercel atualiza o site.

## Como mudar o conteúdo

Quase tudo se muda em `js/dados.js`:

- Nova gestão: copie o bloco da gestão mais recente e troque os nomes.
- `cap` é o número do capítulo (ex.: `"919"`). O site escreve sozinho o nome do capítulo e a cidade.
- Foto nova: coloque o arquivo em `img/liderancas/` e escreva o caminho no campo `foto`.
- Revista nova: coloque o PDF em `revistas/`, a capa em `revistas/capas/` e acrescente uma linha na lista `REVISTAS` em `js/app.js`.

## Fotos antigas

Parte das fotos das gestões antigas ainda vem do site do Wix. Se o site do Wix for apagado, essas fotos somem
e o site mostra as iniciais no lugar. Para evitar isso, é só salvar essas fotos em `img/liderancas/`.
