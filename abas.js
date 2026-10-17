const jogos = [
  { emoji: '🔎', nome: 'Caça-Palavras',   nivel: 1, cor: '#ffc93c' },
  { emoji: '🔤', nome: 'Jogo da Forca',   nivel: 1, cor: '#5aa7e6' },
  { emoji: '🧩', nome: 'Cruzadinha',      nivel: 2, cor: '#5ec26a' },
  { emoji: '🧠', nome: 'Jogo da Memória', nivel: 2, cor: '#9b5de5' },
  { emoji: '🔠', nome: 'Monte a Palavra', nivel: 3, cor: '#f4683c' }
];

const historias = [
  { emoji: '🦁', nome: 'O Leão que Perdeu o Rugido', nivel: 1, cor: '#ffc93c' },
  { emoji: '☁️', nome: 'A Nuvem Que Queria Chover',  nivel: 1, cor: '#5aa7e6' },
  { emoji: '🐸', nome: 'O Sapo Saltitante',          nivel: 2, cor: '#5ec26a' },
  { emoji: '⭐', nome: 'A Estrela Dorminhoca',       nivel: 2, cor: '#9b5de5' },
  { emoji: '🎂', nome: 'O Bolo de Letras',           nivel: 3, cor: '#f4683c' },
  { emoji: '🏠', nome: 'A Casa das Vogais',          nivel: 3, cor: '#3ec9c9' }
];

const avisoEl = document.createElement('div');
avisoEl.className = 'aba-aviso';
avisoEl.setAttribute('role', 'status');
document.body.appendChild(avisoEl);
let tempoAviso;
function mostrarAviso(texto) {
  avisoEl.textContent = texto;
  avisoEl.classList.add('mostra');
  clearTimeout(tempoAviso);
  tempoAviso = setTimeout(() => avisoEl.classList.remove('mostra'), 2200);
}

function criarCartoes(idGrade, lista, textoBotao) {
  const grade = document.getElementById(idGrade);
  lista.forEach(item => {
    const cartao = document.createElement('article');
    cartao.className = 'aba-item';
    cartao.innerHTML = `
      <div class="aba-capa" style="background:${item.cor}">${item.emoji}</div>
      <span class="aba-nivel">Nível ${item.nivel}</span>
      <h3>${item.nome}</h3>
      <button class="aba-acao" type="button">${textoBotao}</button>
    `;
    cartao.querySelector('.aba-acao').addEventListener('click', () => {
      mostrarAviso(`"${item.nome}" em breve!`);
    });
    grade.appendChild(cartao);
  });
}
criarCartoes('grade-jogos', jogos, 'Jogar');
criarCartoes('grade-historias', historias, 'Ler história');

const abas = {
  '#jogos': 'aba-jogos',
  '#historias': 'aba-historias',
  '#progresso': 'aba-progresso'
};
let abaAtual = '#inicio';

function marcarMenu() {
  document.querySelectorAll('header nav a').forEach(a => {
    a.classList.toggle('ativo', a.getAttribute('href') === abaAtual);
  });
}

function mostrarAba(hash) {
  const id = abas[hash];
  document.querySelectorAll('.aba').forEach(a => a.classList.toggle('ativa', a.id === id));
  document.body.classList.toggle('em-aba', !!id);
  abaAtual = id ? hash : '#inicio';
  marcarMenu();
  window.scrollTo(0, 0);
}

document.addEventListener('click', e => {
  const link = e.target.closest('a[href^="#"]');
  if (!link) return;
  const hash = link.getAttribute('href');
  if (hash === '#inicio' || abas[hash]) {
    e.preventDefault();
    history.pushState(null, '', hash);
    mostrarAba(hash);
  }
}, true);

addEventListener('popstate', () => mostrarAba(location.hash));

addEventListener('scroll', marcarMenu, { passive: true });

mostrarAba(location.hash);

const trofeus = [
  { emoji: '🏆', nome: 'Campeão do Alfabeto', progresso: 82, cor: '#ffc93c' },
  { emoji: '🎵', nome: 'Músico de Letras',    progresso: 82, cor: '#3ec9c9' },
  { emoji: '✏️', nome: 'Criador de Palavras', progresso: 82, cor: '#9b5de5' },
  { emoji: '📚', nome: 'Leitor de Histórias', progresso: 82, cor: '#5ec26a' }
];

const areaProgresso = document.querySelector('#aba-progresso .aba-conteudo');
const gradeTrofeus = document.createElement('div');
gradeTrofeus.className = 'aba-trofeus';

trofeus.forEach(t => {
  const cartao = document.createElement('article');
  cartao.className = 'aba-trofeu';
  cartao.innerHTML = `
    <div class="aba-trofeu-capa" style="background:${t.cor}">${t.emoji}</div>
    <h3>${t.nome}</h3>
    <div class="aba-barra" role="progressbar" aria-valuemin="0" aria-valuemax="100" aria-valuenow="${t.progresso}" aria-label="${t.nome}">
      <span style="width:${t.progresso}%"></span>
    </div>
    <p>${t.progresso}% concluído</p>
  `;
  gradeTrofeus.appendChild(cartao);
});
areaProgresso.appendChild(gradeTrofeus);

const quadroHero = document.querySelector('.quadro');
if (quadroHero) {
  quadroHero.innerHTML = `
    <div class="abc-grande" role="img" aria-label="ABC">
      <span>A</span><span>B</span><span>C</span>
    </div>`;
}

const emojisCartoes = {
  t1: { emoji: '🎮', nome: 'Controle de videogame' },
  t2: { emoji: '📖', nome: 'Livro aberto' },
  t3: { emoji: '🏫', nome: 'Quadro escolar' }
};

Object.entries(emojisCartoes).forEach(([classe, dados]) => {
  const moldura = document.querySelector(`.card.${classe} .moldura`);
  if (moldura) {
    moldura.innerHTML = `<span class="emoji-grande" role="img" aria-label="${dados.nome}">${dados.emoji}</span>`;
  }
});