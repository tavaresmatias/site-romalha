# Guia de Deployment - Site Romalha Pereira

## 📋 Checklist Pré-Deployment

- [x] HTML estruturado
- [x] CSS responsivo
- [x] JavaScript funcional
- [x] Conteúdo atualizado
- [x] WhatsApp integrado (24 98864-8105)
- [ ] Fotos reais adicionadas
- [ ] Domínio configurado
- [ ] SSL/HTTPS ativo
- [ ] Deploy em produção

---

## 🌐 Domínio

**Domínio:** romalhapereira.com.br

### Passos para Configuração:

1. **Registre o domínio** (se ainda não tiver):
   - Acesse: Registro.br, GoDaddy, Locaweb, etc.
   - Registre: romalhapereira.com.br

2. **Configure o DNS** para apontar para seu hosting:
   - Tipo A: aponte para o IP do seu servidor
   - Tipo CNAME (opcional): www.romalhapereira.com.br

3. **Instale certificado SSL**:
   - Use Let's Encrypt (grátis)
   - Ative HTTPS

---

## 🚀 Opções de Hosting

### Opção 1: GitHub Pages (Grátis, Simples)
```bash
# 1. Acesse Settings do repositório
# 2. Vá em "Pages"
# 3. Selecione "main" branch
# 4. Configure o domínio customizado: romalhapereira.com.br
# 5. Ative "Enforce HTTPS"
```

### Opção 2: Vercel (Grátis, Rápido)
```bash
# 1. Acesse: vercel.com
# 2. Clique "Import Project"
# 3. Selecione o repositório site-romalha
# 4. Configure domínio: romalhapereira.com.br
# 5. Deploy automático
```

### Opção 3: Netlify (Grátis, Fácil)
```bash
# 1. Acesse: netlify.com
# 2. Clique "New site from Git"
# 3. Conecte o repositório
# 4. Configure domínio
# 5. Deploy automático
```

### Opção 4: Servidor Próprio/TrueNAS
```bash
# 1. Faça upload dos arquivos para seu servidor
# 2. Configure Apache/Nginx
# 3. Aponte domínio para seu IP
# 4. Instale certificado SSL
```

---

## 📸 Adicionar Fotos Reais

Para substituir os placeholders:

1. **Copie as fotos para:** `/assets/img/`
2. **Atualize o HTML:**
   ```html
   <div class="about-image">
       <img src="assets/img/romalha-foto.jpg" alt="Romalha Pereira">
   </div>
   ```

3. **Optimize as imagens:**
   - Tamanho máximo: 500KB
   - Formato: JPEG ou WebP
   - Dimensão: 600x800px

---

## ✅ Checklist Final

Antes de publicar:

- [ ] Testou em desktop?
- [ ] Testou em mobile?
- [ ] WhatsApp funciona?
- [ ] Links internos funcionam?
- [ ] Domínio está configurado?
- [ ] SSL/HTTPS ativo?
- [ ] Performance ótima (PageSpeed > 90)?
- [ ] SEO configurado (meta tags)?

---

## 🎯 Próximos Passos

1. **Fazer push do código:**
   ```bash
   cd ~/Documents/github/Tiago/site-romalha
   git push -u origin main
   ```

2. **Escolher hosting e fazer deploy**

3. **Configurar domínio romalhapereira.com.br**

4. **Adicionar fotos reais**

5. **Testar tudo em produção**

---

## 📱 Contato

**WhatsApp:** 24 98864-8105
**GitHub:** github.com/tavaresmatias/site-romalha

---

**Criado em:** 2026-06-25
**Última atualização:** 2026-06-25
