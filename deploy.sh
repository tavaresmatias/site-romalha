#!/bin/bash

# ========================================
# SCRIPT DE DEPLOYMENT - SITE ROMALHA
# Execute no SSH do Hostinger
# ========================================

echo "🚀 Iniciando deployment..."

# 1. Navegar até o diretório
cd ~/public_html/site-romalha || { echo "❌ Diretório não encontrado"; exit 1; }
echo "✅ Diretório correto: $(pwd)"

# 2. Fazer git pull
echo "📥 Atualizando código do GitHub..."
git pull origin main
echo "✅ Código atualizado"

# 3. Instalar dependências
echo "📦 Instalando dependências Node.js..."
npm install
echo "✅ Dependências instaladas"

# 4. Verificar se PM2 está instalado
if ! command -v pm2 &> /dev/null; then
    echo "📥 Instalando PM2 globalmente..."
    npm install -g pm2
    echo "✅ PM2 instalado"
fi

# 5. Parar versão anterior (se existir)
echo "🛑 Parando versão anterior..."
pm2 delete "site-romalha" 2>/dev/null || true

# 6. Iniciar com PM2
echo "🚀 Iniciando aplicação com PM2..."
pm2 start app.js --name "site-romalha"
pm2 startup
pm2 save
echo "✅ Aplicação iniciada"

# 7. Verificar status
echo ""
echo "📊 Status do PM2:"
pm2 status
pm2 logs site-romalha --lines 10

echo ""
echo "✅ DEPLOYMENT CONCLUÍDO!"
echo ""
echo "🌐 Seu site está em: https://romalha.tiagotavares.online"
echo "🔐 Painel admin em: https://romalha.tiagotavares.online/admin/"
echo "🔑 Senha: aurora2026"
