#  E-commerce de Eletrônicos com React + TypeScript

Este projeto é uma aplicação de e-commerce para venda de produtos eletrônicos, desenvolvida com **React**, **TypeScript** e **JSON Server** para simulação de uma API REST. Possui funcionalidades como listagem de produtos, filtro por nome, categorias e faixa de preço.

---

##  Tecnologias

- [React](https://reactjs.org/)
- [TypeScript](https://www.typescriptlang.org/)
- [Vite](https://vitejs.dev/)
- [JSON Server](https://github.com/typicode/json-server)
- Bootstrap 5

---

##  Como instalar e rodar o projeto

### 1. Clone o repositório

```bash
git clone https://github.com/LaraVic9/E-commerce-Eletronicos.git
cd EletronicsStore
```

### 2. Instale as dependências

```bash
npm install
```

### 3. Rode o Projeto

```bash
npx json-server --watch db.json --port 3001
npm run dev
```


### --- AVISO ----

Por enquanto apenas as seguintes rotas estao com layout em andamento
inicial ('\')
produtos ('\produtos')

As seguintes rotas tem a funcionalidades, mas nao tem layout pronto:

adicionar produto ('/produtos/novo')
editar produto ('/produtos/editar/:id')
adicionar categoria ('/categorias/novo')
editar categoria ('/categorias/editar/:id')
