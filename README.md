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


##  Aviso de Desenvolvimento

Atualmente, apenas as seguintes rotas possuem **layout em andamento**:

- `/` – Página inicial  
- `/produtos` – Listagem de produtos

As rotas abaixo **já têm funcionalidades implementadas**, mas ainda **não possuem layout finalizado**:

- `/produtos/novo` – Adicionar produto  
- `/produtos/editar/:id` – Editar produto  
- `/categorias/novo` – Adicionar categoria  
- `/categorias/editar/:id` – Editar categoria

> Este aviso será atualizado conforme os layouts forem sendo finalizados.
