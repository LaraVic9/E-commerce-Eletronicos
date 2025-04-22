export interface Product {
    id: number;
    name: string;
    // gambiarra pra usar json server sem precisar configurar o node.js, nao e o ideal mas serviu
    categoryId: number | string;
    image: string;
    price: number;
  }

export interface Category {
    id: number | string;
    name: string;
    image: string;
    svg:string;
  }
  
