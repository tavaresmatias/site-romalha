# 🚀 Guia - Fazer Push para GitHub

## Pré-requisitos

- [ ] Git instalado
- [ ] Conta GitHub (já tem: tavaresmatias)
- [ ] Token pessoal do GitHub (gerar em https://github.com/settings/tokens)

---

## Opção 1: Via Terminal (Recomendado)

### Passo 1: Gerar Token no GitHub

1. Acesse: https://github.com/settings/tokens
2. Clique em "Generate new token" → "Generate new token (classic)"
3. Preencha:
   - **Note:** site-romalha-push
   - **Expiration:** 30 days
4. Marque:
   - ✅ repo (completo)
   - ✅ workflow
   - ✅ admin:public_key
5. Clique "Generate token"
6. **Copie o token** (aparece uma única vez)

### Passo 2: Fazer Push

```bash
# Navegue até a pasta
cd ~/Documents/github/Tiago/site-romalha

# Configure git (uma vez)
git config --global user.name "Tiago Tavares"
git config --global user.email "tiltfilm2@gmail.com"

# Faça o push
git push -u origin main

# Quando pedir:
# Username: tavaresmatias
# Password: [cole o token aqui]
```

---

## Opção 2: Via SSH (Avançado)

Se você já tem SSH configurado:

```bash
cd ~/Documents/github/Tiago/site-romalha
git remote set-url origin git@github.com:tavaresmatias/site-romalha.git
git push -u origin main
```

---

## Opção 3: Via GitHub Desktop (Visual)

1. Baixe: https://desktop.github.com/
2. Faça login com sua conta
3. Clone o repositório
4. Faça o push pelo botão "Push origin"

---

## ✅ Verificar se deu certo

Após o push, acesse:
```
https://github.com/tavaresmatias/site-romalha
```

Deve aparecer:
- ✅ Todos os arquivos (index.html, css/, js/, etc)
- ✅ 6+ commits
- ✅ Pasta assets/img (vazia)

---

## 📸 Próximo: Adicionar Fotos

Após fazer o push:

1. Salve as fotos da Romalha em:
   ```
   /Users/tiagotavares/Documents/github/Tiago/site-romalha/assets/img/
   ```

2. Nomeie como:
   - `romalha-perfil.jpg` (foto para a seção sobre)
   - (opcional) `romalha-trabalho.jpg`

3. Faça commit das fotos:
   ```bash
   cd ~/Documents/github/Tiago/site-romalha
   git add assets/img/
   git commit -m "assets: adicionar fotos da Romalha"
   git push
   ```

---

## 🌐 Próximo: Deploy na Hostinger

Após fazer o push:

1. Acesse: https://www.hostinger.com.br
2. Faça login
3. Vá para "Meus Domínios" → romalhapereira.com.br
4. Configure:
   - **Hospedagem:** Selecione plano
   - **Conectar GitHub:** 
     - Clique "Conectar"
     - Selecione repositório: tavaresmatias/site-romalha
     - Branch: main
     - Diretório: / (raiz)
   - Deploy automático: SIM

5. Aguarde o deploy (2-5 min)
6. Acesse: https://romalhapereira.com.br ✨

---

## 💡 Dicas

- Se der erro de permissão: regenere o token
- Se der erro de branch: certifique-se que está em `main`
- Se tiver dúvidas: consulte https://docs.github.com/pt

---

**Criado:** 2026-06-25
**Status:** Pronto para push!
