/* Site do Grande Conselho DeMolay MA — navegação e montagem das páginas.
   O conteúdo fica em js/dados.js; aqui só tem a forma de mostrar. */
(function () {
  const D = window.DADOS;
  const $app = document.getElementById('app');

  /* ---------- utilidades ---------- */
  const esc = s => String(s ?? '').replace(/[&<>"]/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]));
  const WIX = 'https://static.wixstatic.com/media/0c5e23_';
  const E = 'img/emblemas/';
  const IMG = {
    emblema: E + 'gce-ma.png',
    foto: WIX + '920d42d0e64b4396b4c98671adaf09e9~mv2.jpg/v1/fill/w_1600,h_1000,al_c,q_80/foto.jpg',
    dmma: E + 'dmma-branco.png',
    ordem: E + 'ordem-demolay.png',
    cavalaria: E + 'cavalaria.png',
    escudeiros: E + 'escudeiros.png',
    chevalier: E + 'chevalier.png',
    legiao: E + 'legiao-de-honra.png',
    cruz: E + 'cruz-de-honra.png',
    alma: E + 'demolay-de-alma.png',
    comendador: E + 'comendador.png',
    gracruz: E + 'gra-cruz.png',
    manto: E + 'manto-prateado.png',
    amdl: E + 'amdl.png',
    alumni: E + 'alumni.png',
    clube: E + 'clube-maes.png',
    frank: E + 'frank-land.png',
    jacques: E + 'jacques-demolay.png',
    scdb: E + 'scdb.png',
    parceiros: [['Grande Loja Maçônica do Estado do Maranhão', 'e5278e69df43470aac83457c451cca4f'], ['Grande Oriente do Brasil — Maranhão', '8585d98c881b4619b87ae0eea083f416'], ['Supremo Conselho do Grau 33', 'e108147d4b7f4306b293fe81c0b8feee']],
  };
  // selo de cada gestão (só quando gestão e lema batem)
  const SELOS = {
    '2025/2027|Inspirar e Servir': 'gestao-inspirar-e-servir', '2023/2025|Viver DeMolay': 'gestao-viver-demolay',
    '2024/2025|Cativando Virtudes': 'gestao-cativando-virtudes', '2023/2024|União DeMolay': 'gestao-uniao-demolay',
    '2022/2023|Praticar DeMolay': 'gestao-praticar-demolay', '2021/2022|Reinventar DeMolay': 'gestao-reinventar-demolay',
    '2020/2021|Enraizando Virtudes': 'gestao-enraizando-virtudes',
    '2019/2020|Viver DeMolay': 'gestao-viver-demolay-2019', '2018/2019|Sentimento DeMolay': 'gestao-sentimento-demolay',
    '2025/2026|Elevando Virtudes': 'gestao-elevando-virtudes',
    '2026/2027|Pureza de Ideais': 'gestao-pureza-de-ideais', '2017/2018|Efetivando Líderes em um Maranhão de Virtudes': 'gestao-efetivando-lideres',
    '2021/2023|Sobre Virtudes': 'gestao-sobre-virtudes', '2019/2021|Ser DeMolay': 'gestao-ser-demolay',
  };
  const selo = (gestao, lema) => { const f = SELOS[gestao + '|' + lema]; return f ? `<img class="selo" src="${E}${f}.png" alt="Selo da gestão ${esc(lema)}" loading="lazy">` : ''; };
  // revistas da AMDL, em ordem de publicação
  const REVISTAS = [
    ['1', 'Outubro de 2019', 'Nasce a Academia Maranhense DeMolay de Letras', 43],
    ['2', '20 de dezembro de 2019', 'Pensamentos de outros momentos: uma recapitulação de partes da nossa história', 46],
    ['3', 'Agosto de 2020', 'Ordem DeMolay: encantos e tolerância', 26],
    ['4', 'Dezembro de 2020', '', 22],
    ['5', 'Agosto de 2021', 'Ordem DeMolay: o imaginário popular', 43],
    ['6', 'Dezembro de 2021', '', 19],
    ['7', 'Agosto de 2022', '', 29],
    ['8', 'Dezembro de 2022', '', 12],
    ['9', '24 de outubro de 2026', 'Os novos imortais e as vozes dos concursos de 2023 e 2025', 32],
  ];
  const RECORTE = { c: [35, 28, 110], a: [47, 52, 128], b: [47, 235, 128] }; // recorte só da pessoa, sem o anel das artes antigas
  function urlFoto(f) {
    if (typeof f === 'string') return f;
    const [id, r] = f; const [x, y, s] = RECORTE[r] || RECORTE.c;
    return `${WIX}${id}~mv2.png/v1/crop/x_${x},y_${y},w_${s},h_${s}/fill/w_280,h_280,al_c,q_85/foto.png`;
  }
  const iniciais = n => n.replace(/\b(de|da|do|dos|das|e)\b/gi, '').trim().split(/\s+/).filter(Boolean).map(p => p[0]).filter((_, i, a) => i === 0 || i === a.length - 1).join('').toUpperCase();
  // imagem que some sozinha se não carregar
  const img = (src, alt, cls = '') => `<img src="${esc(src)}" alt="${esc(alt)}" class="${cls}" loading="lazy" onerror="this.remove()">`;

  const CAPS = Object.fromEntries(D.capitulos.map(c => [c.n, c]));
  function origem(n) {
    if (!n) return '';
    const c = CAPS[n];
    const nome = c ? `Capítulo ${c.nome} nº ${n}` : `Capítulo nº ${n}`;
    const cid = c && c.cidade ? ` · ${c.cidade}/MA` : '';
    return nome + cid;
  }
  const COLS = Object.fromEntries((D.colegios || []).map(c => [c[0], c]));
  const origemColegio = n => { const c = COLS[n]; return c ? `Colégio Alumni ${c[1]} nº ${c[0]} · ${c[2]}/MA` : `Colégio Alumni nº ${n}`; };
  const PINO = '<svg width="12" height="14" viewBox="0 0 12 14" aria-hidden="true"><path fill="currentColor" d="M6 0a6 6 0 0 0-6 6c0 4.4 6 8 6 8s6-3.6 6-8a6 6 0 0 0-6-6zm0 8.2A2.2 2.2 0 1 1 6 3.8a2.2 2.2 0 0 1 0 4.4z"/></svg>';

  // insígnia do cargo, ao lado da foto
  const INSIG = [[/^Grande Mestre Estadual Adjunto/, 'gmea'], [/^Grande Mestre Estadual/, 'gme'], [/^Grande Secretário Estadual Adjunto/, 'gsea'], [/^Grande Secretário Estadual/, 'gse'],
    [/^Grande Tesoureiro Estadual Adjunto/, 'gtea'], [/^Grande Tesoureiro Estadual/, 'gte'], [/^Grande Orador Estadual Adjunto/, 'goea'], [/^Grande Orador Estadual/, 'goe'],
    [/Oficial Executivo/, 'oe'], [/^Mestre Conselheiro Estadual Adjunto/, 'mcea'], [/^Mestre Conselheiro Estadual/, 'mce'], [/^(MCR|Mestre Conselheiro Regional)/, 'mcr']];
  const insignia = c => { if (!c) return ''; const m = INSIG.find(([r]) => r.test(c)); return m ? `<img class="insignia" src="img/insignias/${m[1]}.png" alt="" title="Insígnia: ${esc(c)}" loading="lazy">` : ''; };
  function foto(p, cargo) {
    return `<div class="foto"><div class="foto__dentro"><b>${esc(iniciais(p.nome))}</b>${p.foto ? img(urlFoto(p.foto), 'Foto de ' + p.nome) : ''}</div>${insignia(cargo)}</div>`;
  }
  function pessoa(p, cargo) {
    const c = cargo ?? p.cargo;
    return `<article class="pessoa">${foto(p, c)}<div>
      <h3>${esc(p.nome)}</h3>
      ${c ? `<p class="cargo">${esc(c)}</p>` : ''}
      ${p.cap ? `<p class="origem">${PINO}<span>${esc(origem(p.cap))}</span></p>` : ''}
      ${p.colegio ? `<p class="origem">${PINO}<span>${esc(origemColegio(p.colegio))}</span></p>` : ''}
      ${p.obs ? `<p class="obs">${esc(p.obs)}</p>` : ''}
    </div></article>`;
  }
  const secao = (conteudo, cls = '') => `<section class="secao ${cls}"><div class="miolo">${conteudo}</div></section>`;
  const cabeca = (olho, titulo, lead, centro) => `<div class="cabeca ${centro ? 'centro' : ''}">${olho ? `<p class="olho">${olho}</p>` : ''}<h2 class="titulo">${titulo}</h2>${lead ? `<p class="lead">${lead}</p>` : ''}</div>`;
  function faixa(olho, titulo, texto, trilha) {
    return `<header class="faixa"><div class="miolo">
      ${trilha ? `<p class="trilha"><a href="#inicio">Início</a> / ${trilha}</p>` : ''}
      <p class="olho">${olho}</p><h1>${titulo}</h1>${texto ? `<p>${texto}</p>` : ''}</div></header>`;
  }
  const cartao = (href, small, titulo, texto, mais = 'Ver →', im) => `<a class="cartao" href="${href}">${im ? `<span class="cartao__icone">${img(im, '')}</span>` : ''}<small>${small}</small><h3>${titulo}</h3><p>${texto}</p><span class="mais">${mais}</span></a>`;

  /* ---------- menu ---------- */
  const MENU = [
    ['inicio', 'Início'],
    ['noticias', 'Notícias'],
    ['A Ordem', [['ordem', 'A Ordem DeMolay'], ['cavalaria', 'A Ordem da Cavalaria'], ['escudeiros', 'A Ordem dos Escudeiros'], ['historia', 'Nossa história no Maranhão']]],
    ['onde-estamos', 'Onde estamos'],
    ['Gabinete Estadual', [['gabinete', 'Líderes Estaduais — Juvenil'], ['regionais', 'Mestres Conselheiros Regionais'], '|Galerias', ['galeria-mce', 'Mestres Conselheiros Estaduais e Adjuntos']]],
    ['Diretoria Executiva', [['diretoria', 'Líderes Estaduais — Adulto'], ['oficiais', 'Oficiais Executivos'], ['comissoes', 'Comissões Estaduais'], '|Galerias', ['galeria-gme', 'Grandes Mestres Estaduais']]],
    ['Galeria de Honra', [['destaques', 'DeMolay e Consultor do Ano'], ['merito', 'Mérito DeMolay Maranhão'], ['academia', 'Academia Maranhense DeMolay de Letras'], ['revistas', 'Revista Litteris et Virtutibus'], '|Honrarias', ['chevalier', 'Grau de Chevalier'], ['legiao', 'Legião de Honra'], ['cruz', 'Cruz de Honra'], ['alma', 'DeMolay de Alma'], ['honrarias-cavalaria', 'Honrarias da Cavalaria']]],
    ['alumni', 'Alumni MA'],
  ];
  function montaMenu() {
    const ul = document.getElementById('menu');
    ul.innerHTML = MENU.map(([a, b], i) => {
      if (typeof b === 'string') return `<li data-rota="${a}"><a href="#${a}">${b}</a></li>`;
      const rotas = b.filter(x => Array.isArray(x)).map(x => x[0]).join(' ');
      return `<li data-rota="${rotas}"><button type="button" aria-expanded="false" id="m${i}">${a}</button><ul class="sub">${b.map(x => typeof x === 'string' ? `<li class="rotulo">${x.slice(1)}</li>` : `<li><a href="#${x[0]}">${x[1]}</a></li>`).join('')}</ul></li>`;
    }).join('');
    ul.querySelectorAll('button').forEach(bt => bt.addEventListener('click', () => {
      const li = bt.parentElement; const abre = !li.classList.contains('aberto');
      ul.querySelectorAll('li.aberto').forEach(x => x.classList.remove('aberto'));
      li.classList.toggle('aberto', abre); bt.setAttribute('aria-expanded', abre);
    }));
    document.getElementById('hamb').addEventListener('click', () => ul.classList.toggle('mostra'));
  }
  function marcaMenu(rota) {
    document.querySelectorAll('#menu > li').forEach(li => li.classList.toggle('ativo', li.dataset.rota.split(' ').includes(rota)));
    document.querySelectorAll('#menu li.aberto').forEach(x => x.classList.remove('aberto'));
    if (document.activeElement && document.activeElement.closest && document.activeElement.closest('#menu')) document.activeElement.blur();
    document.getElementById('menu').classList.remove('mostra');
  }

  /* ---------- dados derivados ---------- */
  const vig = D.gce.find(g => g.vigente);
  const gabVig = vig.gabinetes.find(g => g.vigente) || vig.gabinetes[vig.gabinetes.length - 1];
  const N = D.numeros;

  /* ---------- páginas ---------- */
  const P = {};
  const anterior = (titulo, conteudo) => `<details class="anterior"><summary><span>Ver ${titulo}</span></summary><div class="anterior__corpo">${conteudo}</div></details>`;


  /* ---------- notícias ---------- */
  const MESES = ['janeiro','fevereiro','março','abril','maio','junho','julho','agosto','setembro','outubro','novembro','dezembro'];
  const dataLonga = d => { const [a, m, dd] = d.split('-').map(Number); return `${dd} de ${MESES[m - 1]} de ${a}`; };
  const noticias = () => (window.NOTICIAS || []).slice().sort((a, b) => b.data.localeCompare(a.data));
  const cartaoNoticia = n => `<a class="noticia-cartao" href="#noticia-${n.id}"><span class="noticia-cartao__foto">${img(n.capa, '')}</span><span class="noticia-cartao__corpo"><small>${dataLonga(n.data)}${n.local ? ' · ' + esc(n.local) : ''}</small><h3>${esc(n.titulo)}</h3><p>${esc(n.resumo)}</p><span class="mais">Ler a notícia →</span></span></a>`;
  P.noticias = () => {
    const L = noticias();
    return `${faixa('Notícias', 'Notícias do DeMolay Maranhão', 'Iniciações, eventos, visitas e acontecimentos da Ordem DeMolay em todo o Estado.')}
    ${secao(L.length ? `<div class="noticias">${L.map(cartaoNoticia).join('')}</div>` : '<p class="vazio">Nenhuma notícia publicada ainda.</p>')}`;
  };
  P.noticia = id => {
    const n = noticias().find(x => x.id === id);
    if (!n) return P.naoachou();
    const outras = noticias().filter(x => x.id !== id).slice(0, 3);
    return `<section class="materia"><div class="miolo materia__miolo">
      <a class="materia__voltar" href="#noticias">← Todas as notícias</a>
      <p class="olho">${dataLonga(n.data)}${n.local ? ' · ' + esc(n.local) : ''}</p>
      <h1>${esc(n.titulo)}</h1>
      <p class="materia__resumo">${esc(n.resumo)}</p>
      ${n.fotos && n.fotos[0] ? `<figure class="materia__foto">${img(n.fotos[0][0], n.fotos[0][1] || n.titulo)}${n.fotos[0][1] ? `<figcaption>${esc(n.fotos[0][1])}</figcaption>` : ''}</figure>` : ''}
      <div class="materia__texto">${n.texto.map(t => `<p>${esc(t)}</p>`).join('')}</div>
      ${n.fotos && n.fotos.length > 1 ? `<div class="materia__galeria">${n.fotos.slice(1).map(f => `<figure>${img(f[0], f[1] || n.titulo)}${f[1] ? `<figcaption>${esc(f[1])}</figcaption>` : ''}</figure>`).join('')}</div>` : ''}
    </div></section>
    ${outras.length ? secao(`${cabeca('Notícias', 'Outras notícias', '')}<div class="noticias">${outras.map(cartaoNoticia).join('')}</div>`, 'secao--cinza') : ''}`;
  };
  const blocoNoticiasInicio = () => {
    const L = noticias().slice(0, 3);
    return L.length ? secao(`${cabeca('Notícias', 'Últimas notícias', '')}<div class="noticias">${L.map(cartaoNoticia).join('')}</div>
      <div class="botoes" style="justify-content:center;margin-top:32px"><a class="btn btn--azul" href="#noticias">Ver todas as notícias</a></div>`, 'secao--cinza') : '';
  };
  P.inicio = () => {
    const dmAtual = D.destaques[D.destaques.length - 1];
    return `
    <section class="hero">
      <div class="hero__foto" style="background-image:url('${IMG.foto}')"></div>
      <div class="miolo">
        <div class="hero__emblema">${img(IMG.emblema, 'Emblema do Grande Conselho Estadual da Ordem DeMolay do Maranhão')}</div>
        <p class="selo-texto">Grande Conselho Estadual nº 17</p>
        <h1>Ordem DeMolay <em>Maranhão</em></h1>
        <p>A Ordem DeMolay é uma organização para jovens de 12 a 21 anos, patrocinada pela Maçonaria desde 1919, que forma bons filhos, bons cidadãos e líderes. No Maranhão, desde 1991, de São Luís ao sertão.</p>
        <div class="botoes"><a class="btn btn--ouro" href="https://ocaminhocomecaaqui.com.br/" target="_blank" rel="noopener">Quero fazer parte</a><a class="btn btn--linha" href="#ordem">Conheça a Ordem</a></div>
      </div>
      <div class="hero__onda"></div>
    </section>
    ${secao(`<div class="numeros">
      <div class="numero"><strong>${N.capitulosAtivos}</strong><span>Capítulos em atividade</span></div>
      <div class="numero"><strong>${N.cidadesAtivas}</strong><span>Cidades com Capítulo ativo</span></div>
      <div class="numero"><strong>${(Math.floor(N.cadastrados / 100) * 100).toLocaleString('pt-BR')}+</strong><span>Membros já cadastrados</span></div>
      <div class="numero"><strong>1991</strong><span>Presente no Estado desde</span></div></div>`)}
    ${blocoNoticiasInicio()}
    ${secao(`${cabeca('O caminho na Ordem', 'Há um lugar para cada fase', 'A Ordem acompanha o jovem por anos: começa antes da adolescência e segue depois dela. Cada etapa tem seus ritos e suas responsabilidades.')}
      <div class="caminho">
        <div class="fase"><div class="fase__n">1</div><small>7 a 11 anos</small><h3>Ordem dos Escudeiros</h3><p>Os primeiros passos, com as virtudes da verdade, da justiça e da sabedoria.</p><a href="#escudeiros">Conhecer →</a></div>
        <div class="fase"><div class="fase__n">2</div><small>12 a 21 anos</small><h3>Ordem DeMolay</h3><p>O Capítulo: liderança na prática, amizade, serviço à comunidade e os Graus Iniciático e DeMolay.</p><a href="#ordem">Conhecer →</a></div>
        <div class="fase"><div class="fase__n">3</div><small>16 a 20 anos</small><h3>Ordem da Cavalaria</h3><p>Nos Priorados, o DeMolay aprofunda o ritual, a história e o funcionamento da Ordem.</p><a href="#cavalaria">Conhecer →</a></div>
        <div class="fase"><div class="fase__n">4</div><small>Sênior DeMolay</small><h3>Alumni e Maçonaria</h3><p>Depois dos 21 anos, o Sênior DeMolay segue ligado à Ordem pela Alumni e, muitas vezes, pela Maçonaria.</p><a href="#alumni">Conhecer →</a></div>
      </div>
      <div class="botoes"><a class="btn btn--ouro" href="#onde-estamos">Ver Capítulos no Maranhão</a></div>`, 'secao--escura')}
    ${secao(`${cabeca('Administração vigente', 'Quem conduz a Ordem hoje', `Grande Conselho Estadual · gestão ${vig.periodo}${vig.lema ? ' · “' + vig.lema + '”' : ''}. Gabinete Estadual · gestão ${gabVig.ano}${gabVig.lema ? ' · “' + gabVig.lema + '”' : ''}.`, true)}
      <div class="vigente">${vig.adultos.map(p => pessoa(p)).join('')}${gabVig.pessoas.map(p => pessoa(p)).join('')}</div>
      <div class="botoes" style="justify-content:center"><a class="btn btn--azul" href="#diretoria">Diretoria Executiva</a><a class="btn btn--linha-azul" href="#gabinete">Gabinete Estadual</a></div>`)}
    ${secao(`${cabeca('Destaques de ' + dmAtual.ano, 'DeMolay e Consultor do Ano', 'A cada ano, um único DeMolay e um único Consultor de todo o Estado recebem este reconhecimento.', true)}
      <div class="vigente" style="max-width:640px;margin:0 auto">${pessoa(dmAtual.demolay, 'DeMolay do Ano ' + dmAtual.ano)}${pessoa(dmAtual.consultor, 'Consultor do Ano ' + dmAtual.ano)}</div>
      <div class="botoes" style="justify-content:center"><a class="btn btn--azul" href="#destaques">Ver todos os anos</a></div>`, 'secao--cinza')}
    ${secao(`${cabeca('Memória do Grande Conselho', 'Galerias históricas', 'Cada gestão termina, mas não se apaga: passa a fazer parte da história da Ordem no Maranhão.')}
      <div class="cartoes">
        ${cartao('#galeria-mce', 'Galeria', 'Mestres Conselheiros Estaduais e Adjuntos', 'Todos os líderes juvenis do Estado, de 1998 até hoje.', 'Ver a galeria →')}
        ${cartao('#galeria-gme', 'Galeria', 'Grandes Mestres Estaduais', 'Das Oficialarias de 1991 ao Grande Conselho Estadual nº 17.', 'Ver a galeria →')}
        ${cartao('#regionais', 'Galeria', 'Mestres Conselheiros Regionais', 'As lideranças juvenis de cada Oficialaria Executiva.', 'Ver a galeria →')}
        ${cartao('#historia', 'Linha do tempo', 'Nossa história no Maranhão', 'Os marcos da Ordem DeMolay maranhense, de 1919 até hoje.', 'Ler →')}
      </div>`)}
    ${secao(`${cabeca('Galeria de Honra', 'Reconhecimento a quem serve a Ordem', '')}
      <div class="cartoes">
        ${cartao('#merito', 'Honraria estadual', 'Mérito DeMolay Maranhão', 'A honraria que só a Ordem DeMolay maranhense pode conceder.', undefined, IMG.emblema)}
        ${cartao('#academia', `${D.amdl.length} cadeiras · 8 revistas`, 'Academia Maranhense DeMolay de Letras', 'Ocupantes e patronos das cadeiras e a revista Litteris et Virtutibus.', undefined, IMG.amdl)}
        ${cartao('#chevalier', `${D.honrarias.chevalier.length} agraciados`, 'Grau de Chevalier', 'A maior honraria que um DeMolay ativo pode receber.', undefined, IMG.chevalier)}
        ${cartao('#legiao', `${D.honrarias.legiao.length} legionários`, 'Legião de Honra', 'Reconhecimento a Seniores DeMolay e amigos da Ordem.', undefined, IMG.legiao)}
      </div>`, 'secao--cinza')}
    ${secao(`${cabeca('O caminho começa aqui', 'Pronto para dar o próximo passo?', 'Procure o Capítulo DeMolay mais perto de você e junte-se a nós.', true)}
      <div class="botoes"><a class="btn btn--ouro" href="https://ocaminhocomecaaqui.com.br/" target="_blank" rel="noopener">Quero fazer parte</a><a class="btn btn--linha" href="#onde-estamos">Onde estamos</a></div>`, 'secao--escura')}
    ${secao(`${cabeca('Parceiros e apoiadores', 'Quem caminha com a Ordem DeMolay', '', true)}
      <div class="parceiros"><span title="Supremo Conselho DeMolay Brasil">${img(IMG.scdb, 'Supremo Conselho DeMolay Brasil')}</span>${IMG.parceiros.map(([n, id]) => `<span title="${esc(n)}">${img(WIX + id + '~mv2.png/v1/fit/w_300,h_300,al_c/p.png', n)}</span>`).join('')}</div>`)}`;
  };

  P.ordem = () => `${faixa('Ordem DeMolay', 'O que é a Ordem DeMolay?', 'Um grupo de jovens patrocinado e apoiado pela Maçonaria desde 1919.', 'A Ordem')}
    ${secao(`<div class="texto"><div class="corpo">
      <p>A Ordem DeMolay é um grupo de jovens patrocinado e apoiado pela Maçonaria desde 1919. Foi criada nos Estados Unidos por Frank Sherman Land, maçom da cidade de Kansas City.</p>
      <p>Nossa Ordem tem por objetivo formar bons cidadãos, que respeitam as leis, convivem em harmonia com a sociedade, auxiliam o próximo em suas necessidades básicas e educacionais e que, pelo exemplo, sirvam de modelo para todos os jovens. Nas palavras do Primeiro Diácono na Cerimônia de Iniciação:</p>
      <blockquote class="citacao">“O grande objetivo de nossa Ordem é ensinar e praticar as virtudes que nos levam a uma vida pura, reta, patriótica e reverente, como a melhor preparação para a maioridade da qual nos aproximamos. Nós procuramos, sinceramente, ser melhores filhos, melhores irmãos e melhores amigos, para que, ao chegarmos aos anos da maioridade, possamos ser melhores homens.”</blockquote>
      <h2>Como a Ordem se organiza</h2>
      <p>O Capítulo DeMolay concede os Graus Iniciático e DeMolay e é a célula base da Ordem. A Ordem Sagrada dos Soldados Companheiros de Jacques DeMolay se reúne em Priorados, que conferem o Grau de Nobre Cavaleiro e do Ébano. A Corte de Chevalier reúne os DeMolays que receberam o Grau de Chevalier, a maior honraria que um membro ativo pode receber.</p>
      <h2>O que o jovem aprende</h2>
      <ul><li>Falar em público</li><li>Procedimentos parlamentares</li><li>Hierarquia e disciplina</li><li>Respeito às regras</li><li>A importância de auxiliar a comunidade</li><li>Responsabilidade</li></ul>
      <p><strong>Procure o Capítulo DeMolay mais próximo e junte-se a nós!</strong></p>
      <div class="botoes"><a class="btn btn--azul" href="#onde-estamos">Onde estamos</a><a class="btn btn--linha-azul" href="https://ocaminhocomecaaqui.com.br/" target="_blank" rel="noopener">Quero fazer parte</a></div>
    </div><aside class="lateral">${img(IMG.ordem, 'Emblema da Ordem DeMolay')}<p>Ordem DeMolay · desde 1919</p></aside></div>`)}`;

  P.cavalaria = () => `${faixa('Ordem da Cavalaria', 'O que é a Ordem da Cavalaria', 'Nobres Cavaleiros da Ordem Sagrada dos Soldados Companheiros de Jacques DeMolay.', 'A Ordem')}
    ${secao(`<div class="texto"><div class="corpo">
      <p>A Ordem da Cavalaria, cujo nome oficial é “Nobres Cavaleiros da Ordem Sagrada dos Soldados Companheiros de Jacques DeMolay”, é uma organização complementar formada por DeMolays ativos entre 16 e 20 anos de idade.</p>
      <p>Não é uma honraria nem um prêmio. Esta Organização Afiliada tem rituais e oficiais próprios e se organiza em unidades análogas aos Capítulos, chamadas Priorados.</p>
      <p>A principal função de um Priorado é orientar sobre os aspectos internos da Ordem DeMolay: procedimentos ritualísticos e litúrgicos, a história da Ordem e o seu funcionamento em todos os níveis.</p>
      <p>A Ordem da Cavalaria é um direito de todo DeMolay ativo entre 16 e 20 anos que esteja regular em seu Capítulo e que conheça de memória os questionários e juramentos dos Graus Iniciático e DeMolay.</p>
      <h2>Curiosidade</h2>
      <p>Os primeiros Cavaleiros eram DeMolays de 18 a 21 anos com grande posição em seus Capítulos. O primeiro Priorado nasceu no Capítulo Mãe, em Kansas City (EUA). Sua carta é de 27 de outubro de 1947, mas a primeira Investidura aconteceu em 10 de janeiro de 1948, no Ivanhoe Masonic Temple, presidida por Everett L. Davis, o primeiro Ilustre Comendador Cavaleiro. As esporas usadas naquele dia estão expostas no Frank S. Land Memorial.</p>
      <h2>Priorados ativos e regulares</h2>
      ${listaUnid(D.priorados.filter(o => o.ativo))}
      <div class="botoes"><a class="btn btn--azul" href="#honrarias-cavalaria">Honrarias da Cavalaria</a></div>
    </div><aside class="lateral">${img(IMG.cavalaria, 'Insígnia da Ordem da Cavalaria')}<p>Insígnia da Ordem da Cavalaria</p></aside></div>`)}`;

  P.escudeiros = () => `${faixa('Ordem dos Escudeiros', 'O que é a Ordem dos Escudeiros', 'Para garotos de 7 a 11 anos completos.', 'A Ordem')}
    ${secao(`<div class="texto"><div class="corpo">
      <p>A Ordem dos Escudeiros é uma organização juvenil para garotos com idade entre sete e onze anos completos, patrocinada pela Ordem DeMolay, que busca engajar as crianças nas atividades da DeMolay para um futuro ingresso.</p>
      <h2>As virtudes dos Escudeiros</h2>
      <ul><li>Verdade</li><li>Justiça</li><li>Sabedoria</li></ul>
      <h2>Castelos ativos e regulares</h2>
      ${listaUnid(D.castelos.filter(o => o.ativo))}
    </div><aside class="lateral">${img(IMG.escudeiros, 'Emblema da Ordem dos Escudeiros')}<p>Ordem dos Escudeiros</p></aside></div>`)}`;

  P.historia = () => `${faixa('Nossa história', 'A Ordem DeMolay no Maranhão', 'Das primeiras Oficialarias, nos anos 1990, ao Grande Conselho Estadual nº 17.', 'A Ordem')}
    ${secao(`<div class="figuras"><figure>${img(IMG.jacques, 'Jacques DeMolay')}<figcaption><b>Jacques DeMolay</b>Último Grão-Mestre dos Cavaleiros Templários, que dá nome à Ordem.</figcaption></figure><figure>${img(IMG.frank, 'Frank Sherman Land')}<figcaption><b>Frank Sherman Land</b>Maçom de Kansas City que fundou a Ordem DeMolay em 1919.</figcaption></figure></div>`)}
    ${secao(`<ol class="marcos">${D.historia.map(m => `<li><b>${m.ano}</b><h3>${esc(m.titulo)}</h3><p>${esc(m.texto)}</p></li>`).join('')}</ol>
      <div class="botoes"><a class="btn btn--azul" href="#galeria-gme">Galeria dos Grandes Mestres</a><a class="btn btn--linha-azul" href="#galeria-mce">Galeria dos Mestres Conselheiros</a></div>`)}`;

  P['onde-estamos'] = () => {
    const ativos = D.capitulos.filter(c => c.ativo), outros = D.capitulos.filter(c => !c.ativo);
    const regioes = {};
    ativos.forEach(c => (regioes[c.regiao || 'Outras'] ||= []).push(c));
    const ordem = Object.keys(regioes).sort((a, b) => parseInt(a) - parseInt(b));
    const bloco = (olho, titulo, L, im) => L.length ? `<div><div class="cabeca-icone pequeno">${im ? img(im, titulo) : ''}<div><p class="olho">${olho}</p><h3>${titulo}</h3></div></div>${listaUnid(L)}</div>` : '';
    return `${faixa('Onde estamos', 'A Ordem DeMolay pelo Maranhão', `${ativos.length} Capítulos em atividade em ${N.cidadesAtivas} cidades, organizados em Oficialarias Executivas, além de Castelos, Priorados, Cortes e Clubes.`)}
    ${secao(`${cabeca('Mapa', 'Nossas organizações no mapa', 'Todas as organizações DeMolay do Maranhão. Clique em um ponto para ver o nome, o endereço e o patrocínio.')}
      <div id="mapa" class="mapa" role="region" aria-label="Mapa das organizações DeMolay no Maranhão"><p class="vazio">Carregando o mapa…</p></div>
      <p class="legenda">Cada ponto é uma organização. Pontos apagados são organizações inativas. Use as caixas no canto do mapa para mostrar ou esconder cada tipo.</p>`)}
    ${secao(`${cabeca('Capítulos DeMolay', 'Capítulos ativos e regulares', 'Agrupados pela Oficialaria Executiva de cada região do Estado.')}
      <div class="linha-tempo">${ordem.map(r => `<div class="gestao"><div><p class="gestao__ano" style="font-size:22px">${esc(r.split(' - ')[0].replace('/Região', ''))}</p><p class="gestao__lema" style="font-style:normal">${esc(r.split(' - ')[1] || '')}</p></div>${listaUnid(regioes[r])}</div>`).join('')}</div>`)}
    ${secao(`${cabeca('Nossa história', 'Outros Capítulos do Maranhão', 'Capítulos que também fazem parte da história da Ordem no Estado.')}${listaUnid(outros)}`, 'secao--cinza')}
    ${secao(`<div style="display:grid;gap:56px">
      ${bloco('Ordem dos Escudeiros · 7 a 11 anos', 'Castelos', D.castelos, IMG.escudeiros)}
      ${bloco('Ordem da Cavalaria', 'Priorados', D.priorados, IMG.cavalaria)}
      ${bloco('Grau de Chevalier', 'Cortes de Chevalier', D.cortes, IMG.chevalier)}
      ${bloco('Legião de Honra', 'Preceptorias', D.preceptorias, IMG.legiao)}
      ${bloco('Família DeMolay', 'Clubes de Mães e Amigos', D.clubes, IMG.clube)}
    </div>`)}
    ${secao(`${cabeca('Sede', 'Grande Conselho Estadual', 'R. 44, Quadra 59, nº 23, Conjunto Bequimão, São Luís – MA, 65066-620')}
      <div class="botoes"><a class="btn btn--ouro" href="https://www.google.com/maps/search/?api=1&query=R.+44,+Quadra+59,+23+Bequim%C3%A3o+S%C3%A3o+Lu%C3%ADs+MA" target="_blank" rel="noopener">Abrir no mapa</a></div>`, 'secao--escura')}`;
  };

  // coordenadas aproximadas do centro de cada cidade
  const COORD = {
    'São Luís': [-2.53, -44.30], 'Itapecuru Mirim': [-3.39, -44.36], 'Chapadinha': [-3.74, -43.36], 'Pedreiras': [-4.57, -44.60],
    'Lago da Pedra': [-4.57, -45.13], 'Barra do Corda': [-5.51, -45.24], 'Esperantinópolis': [-4.88, -44.69], 'Timon': [-5.09, -42.84],
    'Coelho Neto': [-4.26, -43.01], 'Zé Doca': [-3.27, -45.66], 'Santa Inês': [-3.67, -45.38], 'São João dos Patos': [-6.50, -43.70],
    'Barão de Grajaú': [-6.74, -43.03], 'Paraibano': [-6.43, -43.98], 'Balsas': [-7.53, -46.04], 'Imperatriz': [-5.53, -47.49],
    'Grajaú': [-5.82, -46.14], 'Carolina': [-7.34, -47.46], 'Açailândia': [-4.95, -47.51], 'Porto Franco': [-6.34, -47.40], 'Estreito': [-6.56, -47.45],
  };
  // cidade não informada no SISDM: posição provável (ver LEIA-ME)
  const CIDADE_PROVAVEL = { 'Rosa Fraterna|49': 'São Luís', 'Timbiras|16': 'São Luís' };
  const TIPOS = [
    ['Capítulos', 'capitulos', 'Capítulo', '#C8102E'],
    ['Castelos', 'castelos', 'Castelo', '#E3A21A'],
    ['Priorados', 'priorados', 'Priorado', '#2E8B57'],
    ['Cortes de Chevalier', 'cortes', 'Corte', '#7B3FA0'],
    ['Preceptorias', 'preceptorias', 'Preceptoria', '#0B2A61'],
    ['Clubes de Mães e Amigos', 'clubes', 'Clube', '#D9468F'],
    ['Colégios Alumni', 'colegios', 'Colégio Alumni', '#1597A6'],
  ];
  function montaMapa() {
    const el = document.getElementById('mapa');
    if (!el) return;
    if (!window.L) { el.innerHTML = '<p class="vazio">O mapa aparece no site publicado.</p>'; return; }
    el.innerHTML = '';
    // junta todas as organizações, ativas e inativas
    const todas = [];
    TIPOS.forEach(([grupo, chave, tipo, cor]) => {
      (D[chave] || []).forEach(o => {
        const org = Array.isArray(o) ? { n: o[0], nome: o[1], cidade: o[2], ativo: true } : o;
        const cidade = org.cidade || CIDADE_PROVAVEL[org.nome + '|' + org.n] || '';
        if (!COORD[cidade]) return;
        todas.push({ ...org, cidade, grupo, tipo, cor });
      });
    });
    // espalha os pontos de uma mesma cidade em volta do centro dela
    const porCidade = {};
    todas.forEach(o => (porCidade[o.cidade] ||= []).push(o));
    const mapa = L.map(el, { scrollWheelZoom: false }).setView([-5.3, -45.3], 6);
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', { maxZoom: 15, attribution: '&copy; OpenStreetMap' }).addTo(mapa);
    const camadas = {}; const marcas = [];
    TIPOS.forEach(([grupo]) => { camadas[grupo] = L.layerGroup().addTo(mapa); });
    Object.entries(porCidade).forEach(([cidade, L0]) => {
      const [lat, lng] = COORD[cidade]; const n = L0.length;
      L0.forEach((o, k) => {
        // os pontos de uma mesma cidade formam uma espiral em pixels, que fica igual em qualquer zoom
        const ang = k * 2.39996; const r = n === 1 ? 0 : 13 * Math.sqrt(k + 0.5);
        const dx = Math.round(r * Math.cos(ang)), dy = Math.round(r * Math.sin(ang));
        const pos = [lat, lng];
        const icone = L.divIcon({ className: '', html: `<span class="pino ${o.ativo ? '' : 'pino--inativo'}" style="--cor:${o.cor}"></span>`, iconSize: [18, 18], iconAnchor: [9 - dx, 9 - dy], popupAnchor: [dx, dy - 6] });
        const html = `<div class="pop"><p class="pop__g" style="color:${o.cor}">${o.tipo}${o.ativo ? '' : ' · inativo'}</p><h4>${esc(o.nome)} nº ${esc(o.n)}</h4><p>${esc(cidade)}/MA</p>${o.endereco ? `<p><small>${esc(o.endereco)}</small></p>` : ''}${o.patrocinio ? `<p><small>Patrocínio: ${esc(o.patrocinio)}</small></p>` : ''}</div>`;
        const m = L.marker(pos, { icon: icone, title: `${o.tipo} ${o.nome}` }).bindPopup(html, { maxWidth: 280 });
        camadas[o.grupo].addLayer(m); marcas.push(m);
      });
    });
    const rotulos = {};
    TIPOS.forEach(([grupo, , , cor]) => { rotulos[`<span class="leg-ponto" style="--cor:${cor}"></span>${grupo} (${todas.filter(o => o.grupo === grupo).length})`] = camadas[grupo]; });
    L.control.layers(null, rotulos, { collapsed: false, position: 'topright' }).addTo(mapa);
    const ajusta = () => { mapa.invalidateSize(); mapa.fitBounds(L.latLngBounds(Object.keys(porCidade).map(c => COORD[c])).pad(0.12)); };
    ajusta(); setTimeout(ajusta, 250);
  }


  function unidade(o, tipo) {
    return `<div class="unidade ${o.ativo ? '' : 'inativa'}"><b>${esc(o.nome)} nº ${o.n}</b>
      <span>${o.cidade ? esc(o.cidade) + '/MA' : 'Maranhão'}${o.fundacao ? ' · fundado em ' + o.fundacao : ''}</span>
      ${o.endereco ? `<span class="end">${PINO} ${esc(o.endereco)}</span>` : ''}
      ${o.patrocinio ? `<span>Patrocínio: ${esc(o.patrocinio)}</span>` : ''}</div>`;
  }
  const listaUnid = (L, tipo) => `<div class="unidades">${L.map(o => unidade(o, tipo)).join('')}</div>`;

  /* Gabinete / Diretoria */
  P.gabinete = () => {
    const mcrVig = D.mcr.find(m => m.vigente);
    return `${faixa('Gabinete Estadual', 'Líderes Estaduais — Juvenil', `Gestão ${gabVig.ano}${gabVig.lema ? ' · “' + gabVig.lema + '”' : ''}`, 'Gabinete Estadual')}
    ${secao(`${cabeca('Gestão vigente', 'Mestre Conselheiro Estadual e Adjunto', '', true)}<div class="vigente" style="max-width:640px;margin:0 auto">${gabVig.pessoas.map(p => pessoa(p)).join('')}</div>`)}
    ${secao(`${cabeca('Oficialarias Executivas', 'Mestres Conselheiros Regionais', '')}<div class="pessoas">${mcrVig.pessoas.map(p => pessoa(p)).join('')}</div>
      <div class="botoes"><a class="btn btn--azul" href="#regionais">Gestões anteriores</a><a class="btn btn--linha-azul" href="#galeria-mce">Galeria de MCE e MCEA</a></div>`, 'secao--cinza')}`;
  };
  P.regionais = () => {
    const bloco = g => `<div class="gestao ${g.vigente ? 'gestao--vigente' : ''}"><div><p class="gestao__ano">${esc(g.gestao)}</p>${g.lema ? `<p class="gestao__lema">“${esc(g.lema)}”</p>` : ''}${selo(g.gestao, g.lema)}${g.vigente ? '<span class="tag">Gestão vigente</span>' : ''}</div><div class="dupla">${g.pessoas.map(p => pessoa(p)).join('')}</div></div>`;
    const atual = D.mcr.filter(g => g.vigente), antigas = D.mcr.filter(g => !g.vigente);
    return `${faixa('Gabinete Estadual', 'Mestres Conselheiros Regionais', 'As lideranças juvenis de cada Oficialaria Executiva, gestão a gestão.', 'Gabinete Estadual')}
    ${secao(`<div class="linha-tempo">${atual.map(bloco).join('')}</div>`)}
    ${secao(anterior(`as gestões anteriores (${antigas.length})`, `<div class="linha-tempo">${antigas.map(bloco).join('')}</div>`), 'secao--cinza')}`;
  };

  P['galeria-mce'] = () => {
    const linhas = [];
    D.gce.slice().reverse().forEach(g => g.gabinetes.slice().reverse().forEach(m => linhas.push(m)));
    return `${faixa('Galeria', 'Mestres Conselheiros Estaduais e Adjuntos', 'Os líderes juvenis do Maranhão, gestão a gestão, sempre lado a lado.', 'Gabinete Estadual')}
    ${secao(`<div class="linha-tempo">${linhas.map(m => `<div class="gestao ${m.vigente ? 'gestao--vigente' : ''}"><div><p class="gestao__ano">${m.ano}</p>${m.lema ? `<p class="gestao__lema">“${esc(m.lema)}”</p>` : ''}${selo(m.ano, m.lema)}${m.vigente ? '<span class="tag">Gestão vigente</span>' : ''}</div><div class="dupla">${m.pessoas.map(p => pessoa(p)).join('')}</div></div>`).join('')}</div>`)}
    ${secao(`${cabeca('Antes de 2004', 'Lideranças juvenis das Oficialarias Executivas', 'Até 2004 não havia Mestre Conselheiro Estadual Adjunto: o auxiliar direto do MCE era o Secretário do Congresso Estadual.')}
      <div class="linha-tempo">${D.oficialarias.slice().reverse().filter(o => o.jovens.length).map(o => `<div class="gestao"><div><p class="gestao__ano">${o.periodo}</p></div><div class="dupla">${o.jovens.map(p => pessoa(p)).join('')}</div></div>`).join('')}</div>`, 'secao--cinza')}`;
  };
  P['galeria-gme'] = () => `${faixa('Galeria', 'Grandes Mestres Estaduais', 'A liderança adulta da Ordem DeMolay no Maranhão desde as primeiras Oficialarias.', 'Diretoria Executiva')}
    ${secao(`${cabeca('Desde 2004', 'Grande Conselho Estadual nº 17', '')}<div class="linha-tempo">${D.gce.slice().reverse().map(g => `<div class="gestao ${g.vigente ? 'gestao--vigente' : ''}"><div><p class="gestao__ano">${g.periodo}</p>${g.lema ? `<p class="gestao__lema">“${esc(g.lema)}”</p>` : ''}${selo(g.gestao || g.periodo, g.lema)}${g.vigente ? '<span class="tag">Gestão vigente</span>' : ''}</div><div class="dupla">${pessoa(g.adultos[0])}</div></div>`).join('')}</div>`)}
    ${secao(`${cabeca('1991 a 2004', '1ª e 2ª Oficialarias Executivas', 'Antes do Grande Conselho, a liderança adulta do Estado eram os Oficiais Executivos, ao Norte e ao Sul.')}<div class="linha-tempo">${D.oficialarias.slice().reverse().map(o => `<div class="gestao"><div><p class="gestao__ano">${o.periodo}</p></div><div class="dupla">${o.adultos.map(p => pessoa(p)).join('')}</div></div>`).join('')}</div>`, 'secao--cinza')}`;

  const blocoEquipe = (eq, titulo) => `<div class="gestao"><div><p class="gestao__ano">${esc(eq.gestao)}</p>${eq.lema ? `<p class="gestao__lema">“${esc(eq.lema)}”</p>` : ''}${selo(eq.gestao, eq.lema)}${titulo ? `<span class="tag">${titulo}</span>` : ''}</div><div class="dupla">${eq.pessoas.map(p => pessoa(p)).join('')}</div></div>`;
  P.diretoria = () => `${faixa('Diretoria Executiva', 'Líderes Estaduais — Adulto', `Grande Conselho Estadual · gestão ${D.diretoria.gestao} · “${D.diretoria.lema}”`, 'Diretoria Executiva')}
    ${secao(`<div class="pessoas">${D.diretoria.pessoas.map(p => pessoa(p)).join('')}</div>`)}
    ${secao(`${anterior(`as gestões anteriores (${D.diretoriaAnterior.length})`, `<div class="linha-tempo">${D.diretoriaAnterior.map(g => blocoEquipe(g)).join('')}</div>`)}
      <div class="botoes"><a class="btn btn--azul" href="#galeria-gme">Galeria dos Grandes Mestres</a><a class="btn btn--linha-azul" href="#oficiais">Oficiais Executivos</a></div>`, 'secao--cinza')}`;
  P.oficiais = () => `${faixa('Diretoria Executiva', 'Oficiais Executivos', 'Os Oficiais Executivos auxiliam o Grande Conselho na gestão de cada Oficialaria do Estado.', 'Diretoria Executiva')}
    ${secao(`${cabeca('Gestão ' + D.oficiais.gestao, 'Oficiais Executivos', '')}<div class="pessoas">${D.oficiais.pessoas.map(p => pessoa(p)).join('')}</div>`)}
    ${secao(`${anterior(`as gestões anteriores (${D.oficiaisAnterior.length})`, `<div class="linha-tempo">${D.oficiaisAnterior.map(g => blocoEquipe(g)).join('')}</div>`)}`, 'secao--cinza')}`;
  const blocoComissoes = L => `<div class="linha-tempo">${L.map(c => `<div class="gestao"><div>${foto({ nome: c.nome.replace(/^(Comissão|Coordenação) Estadual (de |da |)/, ''), foto: c.icone })}<h3 style="font-size:19px">${esc(c.nome)}</h3>${c.ato ? `<p class="gestao__lema" style="font-style:normal">${esc(c.ato)}</p>` : ''}</div><div class="dupla">${c.pessoas.map(p => pessoa(p)).join('')}</div></div>`).join('')}</div>`;
  P.comissoes = () => `${faixa('Diretoria Executiva', 'Comissões Estaduais', `Gestão ${D.comissoes.gestao} · nomeadas pelo Grande Mestre Estadual.`, 'Diretoria Executiva')}
    ${secao(blocoComissoes(D.comissoes.lista))}`;

  /* Honrarias */
  function tabela(id, colunas, linhas, vazio = 'Ninguém encontrado com esse nome.', ph = 'Buscar pelo nome ou capítulo') {
    return `<div class="ferramentas"><input class="busca" id="busca-${id}" type="search" placeholder="${ph}" aria-label="Buscar na lista"><span class="conta" id="conta-${id}">${linhas.length} nomes</span></div>
      <div class="tabela-caixa"><table id="tab-${id}"><thead><tr>${colunas.map(c => `<th>${c}</th>`).join('')}</tr></thead><tbody>${linhas.join('')}</tbody></table><p class="vazio" id="vazio-${id}" hidden>${vazio}</p></div>`;
  }
  function ligaBusca() {
    document.querySelectorAll('.busca').forEach(inp => {
      const id = inp.id.slice(6); const tb = document.querySelector(`#tab-${id} tbody`); const conta = document.getElementById('conta-' + id);
      const tira = s => s.normalize('NFD').replace(/[̀-ͯ]/g, '').toLowerCase();
      inp.addEventListener('input', () => {
        const q = tira(inp.value.trim()); let n = 0;
        tb.querySelectorAll('tr').forEach(tr => { const ok = !q || tira(tr.textContent).includes(q); tr.hidden = !ok; if (ok) n++; });
        conta.textContent = n + (n === 1 ? ' nome' : ' nomes');
        document.getElementById('vazio-' + id).hidden = n > 0;
      });
    });
  }
  const capCel = n => { if (!n) return '<td>—</td>'; const c = CAPS[n]; return `<td>${c ? esc(c.nome) + ' nº ' + n : 'nº ' + n}${c && c.cidade ? `<span class="cid">${esc(c.cidade)}/MA</span>` : ''}</td>`; };
  const linhaHonra = r => `<tr><td><b>${esc(r[0])}</b></td>${capCel(r[2])}<td class="num">${esc(r[1] || '—')}</td><td class="num">${esc(r[3] || '—')}</td></tr>`;
  function paginaHonra(chave, olho, titulo, texto, imagem, col4 = 'Data') {
    const L = D.honrarias[chave];
    return `${faixa(olho, titulo, texto, 'Galeria de Honra')}
      ${secao(`<div class="texto" style="grid-template-columns:minmax(0,1fr) 240px"><div style="min-width:0">${tabela(chave, ['Nome', 'Capítulo', 'ID', col4], L.map(linhaHonra))}</div>
      <aside class="lateral">${imagem ? img(imagem, titulo) : ''}<p><strong>${L.length}</strong> agraciados no Maranhão</p></aside></div>`)}`;
  }
  P.chevalier = () => paginaHonra('chevalier', 'Galeria de Honra', 'Grau de Chevalier', 'A maior honraria que um membro ativo da Ordem DeMolay pode receber.', IMG.chevalier, 'Investidura');
  P.legiao = () => paginaHonra('legiao', 'Galeria de Honra', 'Legião de Honra', 'Grau honorífico que reconhece Seniores DeMolay (Legião Ativa) e amigos da Ordem (Legião Honorária) por serviços notáveis.', IMG.legiao, 'Tipo');
  P.cruz = () => paginaHonra('cruz', 'Galeria de Honra', 'Cruz de Honra', 'Honraria que reconhece serviços de destaque prestados à Ordem DeMolay.', IMG.cruz);
  P.alma = () => paginaHonra('alma', 'Galeria de Honra', 'DeMolay de Alma', 'Reconhecimento a quem se dedica à Ordem DeMolay com o espírito de um DeMolay.', IMG.alma);
  P['honrarias-cavalaria'] = () => {
    const H = D.honrarias;
    const priCel = p => !p ? '<td>—</td>' : `<td>${esc(p.nome)} nº ${esc(p.n)}${p.cidade ? `<span class="cid">${esc(p.cidade)}/MA</span>` : (p.uf && p.uf !== 'MA' ? `<span class="cid">${esc(p.uf)}</span>` : '')}</td>`;
    const linhaPri = r => `<tr><td><b>${esc(r[0])}</b></td>${priCel(r[2])}<td class="num">${esc(r[1] || '—')}</td><td class="num">${esc(r[3] || '—')}</td></tr>`;
    const bloco = (k, t, im) => `<div class="cabeca-icone">${img(im, t)}<h2 class="titulo">${t}</h2></div>${tabela(k, ['Nome', 'Priorado', 'ID', 'Data'], H[k].map(linhaPri), undefined, 'Buscar pelo nome ou priorado')}`;
    return `${faixa('Galeria de Honra', 'Honrarias da Cavalaria', 'Comendadores, Grã-Cruzes e Mantos Prateados da Ordem da Cavalaria no Maranhão.', 'Galeria de Honra')}
      ${secao(bloco('comendador', 'Comendador da Cavalaria', IMG.comendador))}${secao(bloco('gracruz', 'Grã-Cruz da Cavalaria', IMG.gracruz), 'secao--cinza')}${secao(bloco('manto', 'Manto Prateado', IMG.manto))}`;
  };
  P.merito = () => {
    const H = D.honrarias;
    return `${faixa('Honraria estadual', 'Mérito DeMolay Maranhão', 'A honraria que só a Ordem DeMolay maranhense pode conceder, entregue a quem prestou serviços de destaque à Ordem no Estado.', 'Galeria de Honra')}
      ${secao(`<div class="texto" style="grid-template-columns:minmax(0,1fr) 240px"><div style="min-width:0">${tabela('merito', ['Nome', 'Capítulo', 'ID', 'Concessão'], H.merito.map(linhaHonra))}</div>
        <aside class="lateral">${img(IMG.emblema, 'Emblema do Grande Conselho do Maranhão')}<p><strong>${H.merito.length}</strong> agraciados do Maranhão</p><p>Concedido na gestão do Grande Mestre Estadual Marcus Rafael Araújo Miranda.</p></aside></div>`)}
      ${secao(`${cabeca('De outras jurisdições', 'Agraciados de fora do Maranhão', '')}${tabela('meritoFora', ['Nome', 'Cargo à época', 'ID', 'Concessão'], H.meritoFora.map(r => `<tr><td><b>${esc(r[0])}</b></td><td>${esc(r[2])}</td><td class="num">${esc(r[1])}</td><td class="num">${esc(r[3])}</td></tr>`))}`, 'secao--cinza')}`;
  };
  P.destaques = () => {
    const anos = D.destaques.slice().reverse();
    const lado = (p, t) => `<div class="pessoa">${foto(p)}<div><small>${t}</small><h3>${esc(p.nome)}</h3>${p.cap ? `<p class="origem">${PINO}<span>${esc(origem(p.cap))}</span></p>` : ''}</div></div>`;
    return `${faixa('Premiação estadual', 'DeMolay do Ano e Consultor do Ano', 'Uma premiação muito digna: a cada ano, só um DeMolay e só um Consultor de todo o Maranhão recebem o título.', 'Galeria de Honra')}
      ${secao(`<div class="premios-topo">
        <div class="premio-info">${img(E + 'premio-demolay-do-ano.png', 'Insígnia do prêmio DeMolay do Ano')}<div><p class="olho">Prêmio</p><h3>DeMolay do Ano</h3><p>Insígnia do prêmio entregue, a cada ano, a um único DeMolay de todo o Maranhão.</p></div></div>
        <div class="premio-info">${img(E + 'guilda-avental-de-couro.png', 'Insígnia da Guilda do Avental de Couro')}<div><p class="olho">Prêmio</p><h3>Consultor do Ano</h3><p>Insígnia da Guilda do Avental de Couro, entregue, a cada ano, a um único Consultor de todo o Maranhão.</p></div></div>
      </div><div class="premios">${anos.map((a, i) => `<div class="premio ${i === 0 ? 'premio--atual' : ''}"><p class="premio__ano">${a.ano}</p>${lado(a.demolay, 'DeMolay do Ano')}${lado(a.consultor, 'Consultor do Ano')}</div>`).join('')}</div>`)}`;
  };
  const cartaoRevista = r => `<a class="revista" href="revistas/litteris-et-virtutibus-edicao-${r[0]}.pdf" target="_blank" rel="noopener">
      <span class="revista__capa">${img('revistas/capas/edicao-' + r[0] + '.jpg', 'Capa da ' + r[0] + 'ª edição')}</span>
      <span class="revista__n">${r[0]}ª edição</span><b>${esc(r[1])}</b>${r[2] ? `<span class="revista__tema">${esc(r[2])}</span>` : ''}
      <span class="revista__ler">Ler a revista · ${r[3]} páginas</span></a>`;
  P.revistas = () => `${faixa('AMDL', 'Revista Litteris et Virtutibus', 'A revista literária da Academia Maranhense DeMolay de Letras. Todas as edições publicadas, da primeira à mais recente.', 'Galeria de Honra')}
    ${secao(`<div class="revistas">${REVISTAS.map(cartaoRevista).join('')}</div>
      <p class="nota">As revistas abrem em PDF numa nova aba, onde também podem ser baixadas. Da 1ª à 8ª edição, as revistas usam o emblema antigo da Academia; a 9ª estreia o novo emblema.</p>`)}`;
  P.academia = () => `${faixa('AMDL', 'Academia Maranhense DeMolay de Letras', `${D.amdl.length} cadeiras, cada uma com seu patrono e seu ocupante.`, 'Galeria de Honra')}
    ${secao(`<div class="amdl-topo">${img(IMG.amdl, 'Emblema da Academia Maranhense DeMolay de Letras')}<div><p class="olho">Verba volant, scripta manent</p><h2 class="titulo">Registrar a história da Ordem DeMolay maranhense</h2><p class="lead">A Academia reúne quem escreve sobre a vida, os fatos e as memórias da Ordem no Maranhão, e publicou a revista Litteris et Virtutibus.</p><div class="botoes"><a class="btn btn--azul" href="#revistas">Ler as revistas</a></div></div></div>`)}
    ${secao(`<div class="cadeiras">${D.amdl.map(c => `<article class="cadeira"><p class="cadeira__n">Cadeira nº ${String(c.cadeira).padStart(2, '0')}</p>${foto(c)}<h3 style="font-size:18px">${esc(c.nome)}</h3><p class="cargo">${c.cadeira <= 40 ? 'Membro fundador' : 'Membro'}</p>${c.cap ? `<p class="origem">${PINO}<span>${esc(origem(c.cap))}</span></p>` : ''}<p class="patrono">Patrono<b>${esc(c.patrono)}</b></p></article>`).join('')}</div>`)}`;

  P.alumni = () => `${faixa('Alumni MA', 'Associação DeMolay Alumni do Maranhão', 'A ADAE reúne os Seniores DeMolay do Estado, que seguem servindo à Ordem depois dos 21 anos.')}
    ${secao(`<div class="amdl-topo">${img(IMG.alumni, 'Logo da DeMolay Alumni')}<div><p class="olho">Sênior DeMolay</p><h2 class="titulo">A Ordem continua depois dos 21 anos</h2><p class="lead">Os Seniores DeMolay seguem apoiando os Capítulos, os jovens e a Ordem em todo o Estado, reunidos nos Colégios Alumni.</p></div></div>`)}
    ${secao(`${cabeca('Diretoria', 'Presidentes da ADAE-MA', '')}<div class="linha-tempo">${D.alumni.map(a => `<div class="gestao ${a.vigente ? 'gestao--vigente' : ''}"><div><p class="gestao__ano">${esc(a.gestao)}</p>${a.lema ? `<p class="gestao__lema">“${esc(a.lema)}”</p>` : ''}${a.vigente ? '<span class="tag">Diretoria atual</span>' : ''}</div><div class="dupla">${a.pessoas.map(p => pessoa(p)).join('')}</div></div>`).join('')}</div>`, 'secao--cinza')}
    ${secao(`${cabeca('Onde estamos', 'Colégios Alumni do Maranhão', '')}<div class="unidades">${D.colegios.map(c => `<div class="unidade"><b>${esc(c[1])} nº ${c[0]}</b><span>${esc(c[2])}/MA</span></div>`).join('')}</div>`)}`;

  P.naoachou = () => `${faixa('Página não encontrada', 'Não encontramos esta página', 'Use o menu acima ou volte ao início.')}${secao('<div class="botoes"><a class="btn btn--azul" href="#inicio">Voltar ao início</a></div>')}`;

  /* ---------- roteador ---------- */
  function rota() {
    const r = (location.hash || '#inicio').slice(1).replace(/^\//, '') || 'inicio';
    const eNoticia = r.startsWith('noticia-');
    const f = eNoticia ? () => P.noticia(r.slice(8)) : (P[r] || P.naoachou);
    $app.innerHTML = `<div class="aparece">${f()}</div>`;
    marcaMenu(eNoticia ? 'noticias' : r);
    ligaBusca();
    montaMapa();
    window.scrollTo(0, 0);
    const t = $app.querySelector('h1');
    document.title = (r === 'inicio' ? '' : (t ? t.textContent + ' · ' : '')) + 'DeMolay Maranhão';
  }

  /* ---------- rodapé ---------- */
  function rodape() {
    document.getElementById('rodape').innerHTML = `<div class="miolo"><div class="grade">
      <div><img class="rodape__logo" src="${IMG.dmma}" alt="DeMolay Maranhão — Grande Conselho e Gabinete Estadual"><p class="nome">Grande Conselho Estadual nº 17</p><p>Grande Conselho da Ordem DeMolay para o Estado do Maranhão</p><p>R. 44, Quadra 59, nº 23, Conjunto Bequimão<br>São Luís – MA, 65066-620</p>
        <div class="redes"><a href="https://www.instagram.com/demolaymaranhao/" target="_blank" rel="noopener" aria-label="Instagram"><svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="3" y="3" width="18" height="18" rx="5"/><circle cx="12" cy="12" r="4"/><circle cx="17.5" cy="6.5" r="1" fill="currentColor"/></svg></a>
        <a href="https://www.facebook.com/demolaymaranhao" target="_blank" rel="noopener" aria-label="Facebook"><svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M14 8h3V4h-3c-2.8 0-4 1.7-4 4.3V10H7v4h3v8h4v-8h3l1-4h-4V8.6c0-.4.3-.6.6-.6z"/></svg></a></div></div>
      <div><h4>Navegação</h4><ul><li><a href="#ordem">A Ordem DeMolay</a></li><li><a href="#onde-estamos">Onde estamos</a></li><li><a href="#gabinete">Gabinete Estadual</a></li><li><a href="#diretoria">Diretoria Executiva</a></li><li><a href="#destaques">DeMolay e Consultor do Ano</a></li><li><a href="#merito">Mérito DeMolay Maranhão</a></li><li><a href="#academia">Academia de Letras</a></li></ul></div>
      <div><h4>Links rápidos</h4><ul><li><a href="https://sis.demolaybrasil.org.br/new/" target="_blank" rel="noopener">SISDM</a></li><li><a href="https://www.demolayshop.com.br/" target="_blank" rel="noopener">DeMolay Shop</a></li><li><a href="https://ocaminhocomecaaqui.com.br/" target="_blank" rel="noopener">Seja um DeMolay</a></li><li><a href="https://www.dmly.com.br/login" target="_blank" rel="noopener">DMLY</a></li></ul></div>
    </div><div class="base"><span>© ${new Date().getFullYear()} DeMolay Maranhão · Ordem DeMolay desde 1919</span><span>Gestão ${vig.periodo}</span></div></div>`;
  }

  /* ---------- modo claro / escuro ---------- */
  function tema() {
    const bt = document.getElementById('tema'); const raiz = document.documentElement;
    let salvo = null; try { salvo = localStorage.getItem('tema'); } catch (e) {}
    if (salvo === 'claro' || salvo === 'escuro') raiz.dataset.theme = salvo === 'escuro' ? 'dark' : 'light';
    const mq = window.matchMedia ? window.matchMedia('(prefers-color-scheme: dark)') : null;
    const escuroAgora = () => raiz.dataset.theme ? raiz.dataset.theme === 'dark' : !!(mq && mq.matches);
    const mostra = () => { const e = escuroAgora(); bt.setAttribute('aria-pressed', e); bt.title = e ? 'Mudar para o modo claro' : 'Mudar para o modo escuro'; bt.setAttribute('aria-label', bt.title); bt.classList.toggle('escuro', e); };
    bt.addEventListener('click', () => { const e = !escuroAgora(); raiz.dataset.theme = e ? 'dark' : 'light'; try { localStorage.setItem('tema', e ? 'escuro' : 'claro'); } catch (er) {} mostra(); });
    if (mq && mq.addEventListener) mq.addEventListener('change', mostra);
    mostra();
  }

  montaMenu(); rodape();
  try { tema(); } catch (e) { /* o site funciona mesmo sem o botão */ }
  window.addEventListener('hashchange', rota);
  rota();
})();
