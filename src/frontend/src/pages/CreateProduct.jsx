import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

function CreateProduct() {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const [product, setProduct] = useState({
    name: '',
    description: '',
    materials: [{ name: '', percentage: 0, source: '' }],
    certifications: [''],
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!user) {
      setError('You must be logged in to create a product');
      return;
    }

    try {
      setLoading(true);
      // TODO: Replace with actual API call
      const response = await fetch('/api/products', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...product,
          manufacturer: user.id,
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to create product');
      }

      navigate('/dashboard');
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleMaterialChange = (index, field, value) => {
    const newMaterials = [...product.materials];
    newMaterials[index] = {
      ...newMaterials[index],
      [field]: value,
    };
    setProduct({ ...product, materials: newMaterials });
  };

  const addMaterial = () => {
    setProduct({
      ...product,
      materials: [...product.materials, { name: '', percentage: 0, source: '' }],
    });
  };

  const removeMaterial = (index) => {
    const newMaterials = product.materials.filter((_, i) => i !== index);
    setProduct({ ...product, materials: newMaterials });
  };

  return (
    <div className="max-w-2xl mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-gray-900 mb-8">Create New Product</h1>

      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Product Name
          </label>
          <input
            type="text"
            required
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={product.name}
            onChange={(e) => setProduct({ ...product, name: e.target.value })}
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Description
          </label>
          <textarea
            required
            rows={4}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={product.description}
            onChange={(e) => setProduct({ ...product, description: e.target.value })}
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Materials
          </label>
          {product.materials.map((material, index) => (
            <div key={index} className="flex gap-4 mb-4">
              <input
                type="text"
                placeholder="Material name"
                required
                className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={material.name}
                onChange={(e) =>
                  handleMaterialChange(index, 'name', e.target.value)
                }
              />
              <input
                type="number"
                placeholder="Percentage"
                required
                min="0"
                max="100"
                className="w-24 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={material.percentage}
                onChange={(e) =>
                  handleMaterialChange(index, 'percentage', parseInt(e.target.value))
                }
              />
              <input
                type="text"
                placeholder="Source"
                required
                className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={material.source}
                onChange={(e) =>
                  handleMaterialChange(index, 'source', e.target.value)
                }
              />
              <button
                type="button"
                onClick={() => removeMaterial(index)}
                className="text-red-600 hover:text-red-800"
              >
                Remove
              </button>
            </div>
          ))}
          <button
            type="button"
            onClick={addMaterial}
            className="text-blue-600 hover:text-blue-800"
          >
            + Add Material
          </button>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Certifications
          </label>
          {product.certifications.map((cert, index) => (
            <div key={index} className="flex gap-4 mb-4">
              <input
                type="text"
                placeholder="Certification name"
                required
                className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={cert}
                onChange={(e) => {
                  const newCerts = [...product.certifications];
                  newCerts[index] = e.target.value;
                  setProduct({ ...product, certifications: newCerts });
                }}
              />
              <button
                type="button"
                onClick={() => {
                  const newCerts = product.certifications.filter((_, i) => i !== index);
                  setProduct({ ...product, certifications: newCerts });
                }}
                className="text-red-600 hover:text-red-800"
              >
                Remove
              </button>
            </div>
          ))}
          <button
            type="button"
            onClick={() => {
              setProduct({
                ...product,
                certifications: [...product.certifications, ''],
              });
            }}
            className="text-blue-600 hover:text-blue-800"
          >
            + Add Certification
          </button>
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50"
        >
          {loading ? 'Creating...' : 'Create Product'}
        </button>
      </form>
    </div>
  );
}

export default CreateProduct; 