import { useEffect, useState } from 'react';
import { Category } from '../script';
import {
  getCategories,
  createCategory,
} from '../service/categoryService';

const Categories = () => {
  const [categories, setCategories] = useState<Category[]>([]);
  const [name, setName] = useState('');
  const [image, setImage] = useState('');


  const fetchCategories = async () => {
    const data = await getCategories();
    setCategories(data);
  };

  const handleCreate = async () => {
    if (!name.trim()) return;
    await createCategory({ name, image });
    setName('');
    setImage('');
    fetchCategories();
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  return (
    <div >
      <h2>Categorias</h2>

      <div>
        <input
          type="text"
          placeholder="Nova categoria"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <button onClick={handleCreate}>Adicionar</button>
      </div>
      <ul>
        {categories.map((cat) => (
          <li key={cat.id}>{cat.name}</li>
        ))}
      </ul>

    </div>
  );
};

export default Categories;
