# 🚀 GUIA DE DEPLOYMENT NO HOSTINGER

## Pré-requisitos
- Node.js 14+ (Hostinger já tem instalado)
- npm (vem com Node.js)

## Passo 1: Conectar via SSH ao Hostinger

```bash
ssh u993207092@45.152.46.112
```

## Passo 2: Navegar até o diretório public_html

```bash
cd ~/public_html/site-romalha
```

## Passo 3: Instalar dependências

```bash
npm install
```

## Passo 4: Criar arquivo .env (se necessário)

```bash
cat > .env << 'ENVEOF'
PORT=3000
ADMIN_PASSWORD=aurora2026
GITHUB_TOKEN=seu_token_aqui
GITHUB_REPO=tavaresmatias/site-romalha
GITHUB_BRANCH=main
ENVEOF
```

## Passo 5: Testar localmente

```bash
npm start
```

Acessar: http://localhost:3000

## Passo 6: Configurar para rodar com PM2 (Production)

```bash
npm install -g pm2
pm2 start app.js --name "site-romalha"
pm2 startup
pm2 save
```

## Passo 7: Configurar Nginx como Proxy (opcional)

Se usar Nginx, adicionar ao vhost:

```nginx
server {
    listen 80;
    server_name romalha.tiagotavares.online;

    location / {
        proxy_pass http://localhost:3000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
    }
}
```

## Acessar o Painel Admin

```
https://romalha.tiagotavares.online/admin/
Senha: aurora2026
```

## Troubleshooting

### Porta 3000 já em uso
```bash
lsof -i :3000
kill -9 <PID>
```

### Ver logs
```bash
pm2 logs site-romalha
```

### Reiniciar
```bash
pm2 restart site-romalha
```

---

**Feito por: Claude Code**
**Data: 2026-06-27**
