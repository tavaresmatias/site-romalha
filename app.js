const express = require('express');
const fs = require('fs');
const path = require('path');
const multer = require('multer');
const session = require('express-session');
const { exec } = require('child_process');

const app = express();
const PORT = process.env.PORT || 3000;

// Caminhos absolutos
const DATA_FILE = path.join(__dirname, 'data.json');
const IMG_DIR = path.join(__dirname, 'img');

// Criar diretório de imagens se não existir
if (!fs.existsSync(IMG_DIR)) {
  fs.mkdirSync(IMG_DIR, { recursive: true });
}

// Configuração de upload de imagens
const upload = multer({
  dest: IMG_DIR,
  fileFilter: (req, file, cb) => {
    const ext = path.extname(file.originalname).toLowerCase();
    if (['.jpg', '.jpeg', '.png', '.gif', '.webp'].includes(ext)) {
      cb(null, true);
    } else {
      cb(new Error('Apenas imagens são permitidas'));
    }
  }
});

// Middleware
app.use(express.static(__dirname, { index: false }));
app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ limit: '50mb', extended: true }));

app.use(session({
  secret: process.env.SESSION_SECRET || 'romalha-secret-key-2024',
  resave: false,
  saveUninitialized: true,
  cookie: { httpOnly: true }
}));

// Senha do admin
const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || 'aurora2026';

// Carregar dados
function loadData() {
  try {
    return JSON.parse(fs.readFileSync(DATA_FILE, 'utf8'));
  } catch (e) {
    console.error('Erro ao carregar data.json:', e);
    return {};
  }
}

// Salvar dados
function saveData(data) {
  fs.writeFileSync(DATA_FILE, JSON.stringify(data, null, 2), 'utf8');
}

// Sincronização com GitHub
function syncToGitHub(message) {
  const token = process.env.GITHUB_TOKEN;
  const repo = process.env.GITHUB_REPO;
  const branch = process.env.GITHUB_BRANCH || 'main';

  if (!token || !repo) {
    console.log('ℹ️ GITHUB_TOKEN/GITHUB_REPO não configurados — edições salvas só localmente.');
    return;
  }

  const remote = `https://x-access-token:${token}@github.com/${repo}.git`;
  const safeMsg = String(message || 'Atualiza conteúdo via painel').replace(/["`$\\]/g, '');

  const cmd = [
    `cd "${__dirname}"`,
    `git add data.json img`,
    `git -c user.email="painel@romalha.tiagotavares.online" -c user.name="Painel Admin" commit -m "${safeMsg}" || echo "Nada para commitar"`,
    `git push "${remote}" HEAD:${branch}`
  ].join(' && ');

  exec(cmd, { timeout: 60000 }, (err, stdout, stderr) => {
    if (err) {
      console.error('❌ Falha ao sincronizar com o GitHub:', (stderr || err.message || '').replace(token, '***'));
    } else {
      console.log('✅ Conteúdo sincronizado com o GitHub.');
    }
  });
}

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// ROTAS DE API
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

// GET: Dados públicos (sem autenticação)
app.get('/api/data', (req, res) => {
  res.json(loadData());
});

// GET: Posts do blog paginados (público)
app.get('/api/blog', (req, res) => {
  const data = loadData();
  let posts = data.blog || [];

  const now = new Date();
  posts = posts.filter(post =>
    post.status === 'published' &&
    new Date(post.date) <= now
  );

  posts.sort((a, b) => new Date(b.date) - new Date(a.date));

  const page = parseInt(req.query.page) || 1;
  const limit = parseInt(req.query.limit) || 3;
  const startIndex = (page - 1) * limit;
  const endIndex = page * limit;

  const results = {};
  results.total = posts.length;
  results.posts = posts.slice(startIndex, endIndex);
  results.hasMore = endIndex < posts.length;

  res.json(results);
});

// GET: Post de blog por slug (público)
app.get('/api/blog/:slug', (req, res) => {
  const data = loadData();
  const posts = data.blog || [];

  const now = new Date();
  const post = posts.find(p =>
    p.slug === req.params.slug &&
    p.status === 'published' &&
    new Date(p.date) <= now
  );

  if (post) {
    res.json(post);
  } else {
    res.status(404).json({ error: 'Post não encontrado' });
  }
});

// POST: Login
app.post('/api/login', (req, res) => {
  const { password } = req.body;

  if (password === ADMIN_PASSWORD) {
    req.session.authenticated = true;
    res.json({ success: true, message: 'Autenticado com sucesso' });
  } else {
    res.status(401).json({ success: false, message: 'Senha incorreta' });
  }
});

// POST: Logout
app.post('/api/logout', (req, res) => {
  req.session.destroy();
  res.json({ success: true });
});

// Middleware de autenticação
const checkAuth = (req, res, next) => {
  if (req.session.authenticated) {
    next();
  } else {
    res.status(401).json({ error: 'Não autenticado' });
  }
};

// GET: Carregar dados (requer autenticação)
app.get('/api/admin/data', checkAuth, (req, res) => {
  res.json(loadData());
});

// POST: Salvar dados (requer autenticação)
app.post('/api/admin/data', checkAuth, (req, res) => {
  try {
    saveData(req.body);
    res.json({ success: true, message: 'Dados salvos com sucesso' });
    syncToGitHub('Atualiza conteúdo do site via painel admin');
  } catch (e) {
    res.status(500).json({ error: 'Erro ao salvar dados' });
  }
});

// POST: Upload de imagem (requer autenticação)
app.post('/api/admin/upload', checkAuth, upload.single('image'), (req, res) => {
  if (!req.file) {
    return res.status(400).json({ error: 'Nenhuma imagem foi enviada' });
  }

  const fileName = Date.now() + path.extname(req.file.originalname);
  const newPath = path.join(IMG_DIR, fileName);

  fs.renameSync(req.file.path, newPath);
  res.json({ success: true, path: `img/${fileName}` });
});

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// ROTAS DE PÁGINAS
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});

app.get('/blog', (req, res) => {
  res.sendFile(path.join(__dirname, 'blog.html'));
});

app.get('/blog/:slug', (req, res) => {
  res.sendFile(path.join(__dirname, 'blog-detalhe.html'));
});

app.get('/admin', (req, res) => {
  res.sendFile(path.join(__dirname, 'admin', 'index.html'));
});

app.listen(PORT, () => {
  console.log(`🚀 Servidor rodando em http://localhost:${PORT}`);
  console.log(`📊 Painel admin em http://localhost:${PORT}/admin`);
});
