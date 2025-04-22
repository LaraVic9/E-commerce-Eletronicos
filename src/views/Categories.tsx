import { useEffect, useState } from 'react';
import { Category } from '../script';
import {
  getCategories,
  createCategory,
} from '../service/categoryService';
import {  phone_svg, laptop_svg, tv_svg, mouse_svg, headphone_svg } from '../assets/icons'

const availableImages = [
  { id: 'headphone_svg', src: headphone_svg },
  { id: 'phone_svg', src: phone_svg },
  { id: 'mouse_svg', src: mouse_svg },
  { id: 'tv_svg', src: tv_svg },
  { id: 'laptop_svg', src: laptop_svg },
];

const Categories = () => {
  
  const [name, setName] = useState('');
  const [image, setImage] = useState('');
  const [selectedSvg, setSelectedSvg] = useState('headphone_svg'); 

  const handleCreate = async () => {
    if (!name.trim()) return; 
    await createCategory({ name, image, svg: selectedSvg });
    setName('');
    setImage('');
    setSelectedSvg('headphone_svg'); 
    alert('Categoria adicionada com sucesso!');
  };

  return (
    <div>
      <h2>Adicionar Categoria</h2>
      <div>
        <input
          type="text"
          placeholder="Nome da Categoria"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
      </div>
      <div>
        <input
          type="text"
          placeholder="URL da Imagem"
          value={image}
          onChange={(e) => setImage(e.target.value)}
        />
      </div>

      <div>
        <h3>Escolha um ícone</h3>
        <div style={{ display: 'flex', gap: '10px' }}>
          {availableImages.map((img) => (
            <div
              key={img.id}
              style={{
                border: selectedSvg === img.id ? '2px solid blue' : '2px solid transparent',
                padding: '5px',
                cursor: 'pointer',
                borderRadius: '8px',
              }}
              onClick={() => setSelectedSvg(img.id)}
            >
              <img src={img.src} alt={img.id} style={{ width: '50px', height: '50px' }} />
            </div>
          ))}
        </div>
      </div>

      <button onClick={handleCreate}>Adicionar</button>
    </div>
  );
};

export default Categories;
