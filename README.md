# 🧪 Rick and Morty API Tests

Projeto de automação de testes de API utilizando a Rick and Morty API, com foco na validação de endpoints de personagens, episódios e localizações.

---

## 🚀 Tecnologias utilizadas

- Node.js
- Mocha
- Chai
- Supertest
- Mochawesome

---

## 📂 Estrutura do projeto

```bash
config/    → configuração de ambiente (dotenv)
services/  → chamadas para os endpoints da API
test/      → cenários de testes automatizados
```

## ⚙️ Configuração

Crie um arquivo .env na raiz do projeto com base no .env.example:

```env
BASE_URL=https://rickandmortyapi.com/api

```

## ▶️ Como executar o projeto
```bash
npm install
npm test

```

## 🧪 Testes implementados
- ✅ Listagem de personagens
- ✅ Filtro de personagens por nome
- ✅ Busca de personagem por ID
- ✅ Listagem de episódios
- ✅ Filtro de episódios por nome
- ✅ Busca de episódio por ID
- ✅ Listagem de localizações
- ✅ Filtro de localizações por nome
- ✅ Busca de localização por ID

## 📊 Relatório de testes

Após a execução, um relatório é gerado automaticamente com o Mochawesome:

```bash
mochawesome-report/mochawesome.html

```

## 🎯 Objetivo

Praticar e demonstrar habilidades em automação de testes de API, incluindo:

- Validação de status code
- Validação de estrutura de resposta
- Testes positivos e negativos
- Organização de código em camadas
- Uso de variáveis de ambiente

## 👨‍💻 Autor

Anderson Batista dos Santos


---