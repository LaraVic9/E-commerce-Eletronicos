import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getCategories, updateCategory } from '../service/categoryService';
import { Category } from '../script';
import {  phone_svg, laptop_svg, tv_svg, mouse_svg, headphone_svg } from '../assets/icons'
import './views.css'

const SvgImages = [
  { id: 'headphone_svg', src: headphone_svg },
  { id: 'phone_svg', src: phone_svg },
  { id: 'mouse_svg', src: mouse_svg },
  { id: 'tv_svg', src: tv_svg },
  { id: 'laptop_svg', src: laptop_svg },
];

const EditCategoria = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  const [category, setCategory] = useState<Omit<Category, 'id'> | null>(null);
  const [categorySVGs, setCategorySVGs] = useState<string[]>([]);

  const svgs = import.meta.glob('../assets/icons/*.svg', {
    eager: true,
    import: 'default',
  });

  const getSvgPath = (filename: string) => {
    const path = `../assets/icons/${filename}`;
    return svgs[path] as string;
  };

  useEffect(() => {
    const fetchCategory = async () => {
      const categoriesData = await getCategories();

      const selectedCategory = categoriesData.find(c => String(c.id) === id);
      if (selectedCategory) {
        const { id, ...rest } = selectedCategory;
        setCategory(rest);
      }

      const svgsInJson = [...new Set(categoriesData.map(c => c.svg))];
      setCategorySVGs(svgsInJson);
    };

    fetchCategory();
  }, [id]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setCategory(prev => prev ? { ...prev, [name]: value } : null);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!category) return;

    try {
      await updateCategory(String(id!), category);
      alert('Categoria atualizada com sucesso!');
      navigate('/categories');
    } catch (error) {
      console.error('Erro ao atualizar categoria:', error);
      alert('Erro ao atualizar. Tente novamente.');
    }
  };

  if (!category) return <p>Carregando categoria...</p>;

  return (
    <div className=" mt-4 marginTop">
      <h2>Editar Categoria</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label className="form-label">Nome da Categoria</label>
          <input
            type="text"
            name="name"
            className="form-control"
            value={category.name}
            onChange={handleChange}
          />
        </div>

        <div className="mb-3">
          <label className="form-label">Nome do Arquivo SVG</label>
          <input
            type="text"
            name="svg"
            className="form-control"
            value={category.svg}
            onChange={handleChange}
          />
        </div>

        <div className="mb-3">
          <label className="form-label">SVGs disponíveis (do JSON)</label>
          <div className="d-flex flex-wrap gap-3">
            {categorySVGs.map(fileName => {
              const isSelected = category.svg === fileName;
              const path = `../assets/icons/${fileName}`;
              const imgSrc = svgs[path] as string;

              if (!imgSrc) return null;

              return (
                <div
                  key={fileName}
                  style={{
                    padding: '10px',
                    borderRadius: '8px',
                    backgroundColor: isSelected ? '#d0f0ff' : '#f4f4f4',
                    border: isSelected ? '2px solid #2196f3' : '1px solid #ccc',
                    cursor: 'pointer',
                  }}
                  onClick={() => setCategory(prev => prev ? { ...prev, svg: fileName } : null)}
                >
                  <img
                    src={imgSrc}
                    alt={fileName}
                    style={{ width: '40px', height: '40px' }}
                  />
                  <p className="small text-center mt-1 mb-0" style={{ fontSize: '0.75rem' }}>
                    {fileName}
                  </p>
                </div>
              );
            })}
          </div>
        </div>

        <button type="submit" className="btn btn-primary">Salvar Alterações</button>
      </form>
    </div>
  );
};

export default EditCategoria;
