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

const cartoesClicaveis = {
  t1: '#jogos',
  t2: '#historias'
};

Object.entries(cartoesClicaveis).forEach(([classe, destino]) => {
  const cartao = document.querySelector(`.card.${classe}`);
  if (!cartao) return;

  const titulo = cartao.querySelector('h3').textContent;
  cartao.classList.add('clicavel');
  cartao.setAttribute('role', 'link');
  cartao.setAttribute('tabindex', '0');
  cartao.setAttribute('aria-label', `Abrir ${titulo}`);

  const abrir = () => {
    history.pushState(null, '', destino);
    mostrarAba(destino);
  };

  cartao.addEventListener('click', abrir);
  cartao.addEventListener('keydown', e => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      abrir();
    }
  });
});

abas['#cadastrar'] = 'aba-cadastrar';
abas['#entrar'] = 'aba-entrar';

const linkCadastrar = document.querySelector('.acoes .btn-verde');
const linkEntrar = document.querySelector('.acoes .entrar');
linkCadastrar.setAttribute('href', '#cadastrar');
linkEntrar.setAttribute('href', '#entrar');

mostrarAba(location.hash);

function irPara(hash) {
  history.pushState(null, '', hash);
  mostrarAba(hash);
}

const CHAVE_USUARIOS = 'alfabetizacao_usuarios';
const CHAVE_SESSAO = 'alfabetizacao_sessao';

function lerUsuarios() {
  try { return JSON.parse(localStorage.getItem(CHAVE_USUARIOS)) || []; }
  catch { return []; }
}
function salvarUsuarios(lista) {
  try { localStorage.setItem(CHAVE_USUARIOS, JSON.stringify(lista)); } catch {}
}
function lerSessao() {
  try { return localStorage.getItem(CHAVE_SESSAO); } catch { return null; }
}
function salvarSessao(email) {
  try {
    if (email) localStorage.setItem(CHAVE_SESSAO, email);
    else localStorage.removeItem(CHAVE_SESSAO);
  } catch {}
}
function usuarioLogado() {
  const email = lerSessao();
  return email ? lerUsuarios().find(u => u.email === email) : null;
}

function atualizarCabecalho() {
  const usuario = usuarioLogado();
  if (usuario) {
    linkCadastrar.textContent = `Olá, ${usuario.nome}!`;
    linkCadastrar.setAttribute('href', '#progresso');
    linkEntrar.textContent = 'Sair';
    linkEntrar.setAttribute('href', '#sair');
  } else {
    linkCadastrar.textContent = 'Cadastrar';
    linkCadastrar.setAttribute('href', '#cadastrar');
    linkEntrar.textContent = 'Entrar';
    linkEntrar.setAttribute('href', '#entrar');
  }
}

linkEntrar.addEventListener('click', e => {
  if (!usuarioLogado()) return;
  e.preventDefault();
  salvarSessao(null);
  atualizarCabecalho();
  mostrarAviso('Até logo! 👋');
  irPara('#inicio');
});

function mostrarErro(id, texto) {
  document.getElementById(id).textContent = texto;
}

document.getElementById('form-cadastrar').addEventListener('submit', e => {
  e.preventDefault();
  const nome = document.getElementById('cad-nome').value.trim();
  const email = document.getElementById('cad-email').value.trim().toLowerCase();
  const senha = document.getElementById('cad-senha').value;
  const senha2 = document.getElementById('cad-senha2').value;

  if (nome.length < 2) return mostrarErro('erro-cadastrar', 'Digite o nome da criança.');
  if (!/^\S+@\S+\.\S+$/.test(email)) return mostrarErro('erro-cadastrar', 'Digite um e-mail válido.');
  if (senha.length < 6) return mostrarErro('erro-cadastrar', 'A senha precisa ter pelo menos 6 caracteres.');
  if (senha !== senha2) return mostrarErro('erro-cadastrar', 'As senhas não são iguais.');

  const usuarios = lerUsuarios();
  if (usuarios.some(u => u.email === email)) {
    return mostrarErro('erro-cadastrar', 'Já existe uma conta com esse e-mail. Tente entrar.');
  }

  usuarios.push({ nome, email, senha });
  salvarUsuarios(usuarios);
  salvarSessao(email);

  e.target.reset();
  mostrarErro('erro-cadastrar', '');
  atualizarCabecalho();
  mostrarAviso(`Conta criada! Bem-vindo(a), ${nome} 🎉`);
  irPara('#progresso');
});

document.getElementById('form-entrar').addEventListener('submit', e => {
  e.preventDefault();
  const email = document.getElementById('ent-email').value.trim().toLowerCase();
  const senha = document.getElementById('ent-senha').value;

  if (!email || !senha) return mostrarErro('erro-entrar', 'Preencha o e-mail e a senha.');

  const usuario = lerUsuarios().find(u => u.email === email && u.senha === senha);
  if (!usuario) return mostrarErro('erro-entrar', 'E-mail ou senha incorretos.');

  salvarSessao(email);
  e.target.reset();
  mostrarErro('erro-entrar', '');
  atualizarCabecalho();
  mostrarAviso(`Oi, ${usuario.nome}! 😊`);
  irPara('#progresso');
});

document.querySelectorAll('.aba-form input').forEach(campo => {
  campo.addEventListener('input', () => {
    document.querySelectorAll('.aba-erro').forEach(p => p.textContent = '');
  });
});

atualizarCabecalho();