import React, { useState } from 'react';

// Define Product type
interface Product {
  id: number;
  name: string;
  price: number;
  barcode: string;
  stock: number;
}

const ProductManagement: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([
    { id: 1, name: "Apple Tig", price: 16.0, barcode: "1000000000000", stock: 48 },
    { id: 2, name: "Banana Tag", price: 23.5, barcode: "1000000000007", stock: 50 },
    { id: 3, name: "Battery AA (8 Pack)", price: 23.5, barcode: "1000000000001", stock: 50 },
    { id: 4, name: "Bread Loaf", price: 14.2, barcode: "1000000000002", stock: 50 },
    { id: 5, name: "Butter 250g", price: 32.0, barcode: "1000000000003", stock: 50 }
  ]);

  const [newProduct, setNewProduct] = useState<Omit<Product, 'id'>>({
    name: '',
    price: 0,
    barcode: '',
    stock: 0
  });

  const [addHover, setAddHover] = useState(false);
  const [generateHover, setGenerateHover] = useState(false);

  const handleAddProduct = () => {
    if (newProduct.name && newProduct.barcode) {
      const product: Product = {
        id: products.length + 1,
        ...newProduct,
        price: Number(newProduct.price),
        stock: Number(newProduct.stock)
      };
      setProducts([...products, product]);
      setNewProduct({ name: '', price: 0, barcode: '', stock: 0 });
    }
  };

  const generateBarcode = () => {
    const newBarcode = '1000000000' + (products.length + 1).toString().padStart(3, '0');
    setNewProduct({ ...newProduct, barcode: newBarcode });
  };

  return (
    <div style={{
      padding: '20px',
      backgroundColor: '#f8f9fa',
      minHeight: '100vh',
      fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif'
    }}>
      {/* Header */}
      <h1 style={{
        fontSize: '24px',
        fontWeight: '600',
        color: '#2c3e50',
        marginBottom: '8px'
      }}>
        Product Management
      </h1>
      <p style={{
        color: '#7f8c8d',
        fontSize: '14px',
        marginBottom: '24px'
      }}>
        Manage your inventory and product catalog
      </p>

      {/* Add Product Section */}
      <div style={{
        background: 'white',
        padding: '24px',
        borderRadius: '12px',
        boxShadow: '0 1px 3px rgba(0,0,0,0.1)',
        border: '1px solid #e1e8ed',
        marginBottom: '30px'
      }}>
        <h2 style={{
          fontSize: '20px',
          fontWeight: '600',
          color: '#2c3e50',
          marginBottom: '20px'
        }}>
          Add New Product
        </h2>
        
        {/* Product Name */}
        <div style={{ marginBottom: '20px' }}>
          <div style={{
            fontSize: '14px',
            fontWeight: '500',
            color: '#2c3e50',
            marginBottom: '8px'
          }}>
            Product Name
          </div>
          <input
            type="text"
            placeholder="Enter product name"
            value={newProduct.name}
            onChange={(e) => setNewProduct({ ...newProduct, name: e.target.value })}
            style={{
              width: '100%',
              padding: '12px',
              border: '1px solid #ddd',
              borderRadius: '6px',
              fontSize: '14px',
              outline: 'none'
            }}
          />
        </div>

        {/* Price */}
        <div style={{ marginBottom: '20px' }}>
          <div style={{
            fontSize: '14px',
            fontWeight: '500',
            color: '#2c3e50',
            marginBottom: '8px'
          }}>
            <strong>Price: M{newProduct.price.toFixed(2)}</strong>
          </div>
          <input
            type="number"
            step="0.01"
            value={newProduct.price}
            onChange={(e) => setNewProduct({ ...newProduct, price: Number(e.target.value) })}
            style={{
              width: '100%',
              padding: '12px',
              border: '1px solid #ddd',
              borderRadius: '6px',
              fontSize: '14px',
              outline: 'none'
            }}
          />
        </div>

        {/* Barcode */}
        <div style={{ marginBottom: '20px' }}>
          <div style={{
            fontSize: '14px',
            fontWeight: '500',
            color: '#2c3e50',
            marginBottom: '8px'
          }}>
            <strong>Barcode:</strong>
          </div>
          <div style={{ display: 'flex', gap: '10px' }}>
            <input
              type="text"
              placeholder="Enter or generate barcode"
              value={newProduct.barcode}
              onChange={(e) => setNewProduct({ ...newProduct, barcode: e.target.value })}
              style={{
                flex: 1,
                padding: '12px',
                border: '1px solid #ddd',
                borderRadius: '6px',
                fontSize: '14px',
                outline: 'none'
              }}
            />
            <button 
              onClick={generateBarcode}
              onMouseEnter={() => setGenerateHover(true)}
              onMouseLeave={() => setGenerateHover(false)}
              style={{
                backgroundColor: generateHover ? '#2980b9' : '#3498db',
                color: 'white',
                border: 'none',
                padding: '12px 20px',
                borderRadius: '6px',
                fontSize: '14px',
                fontWeight: '600',
                cursor: 'pointer',
                whiteSpace: 'nowrap',
                transition: 'background-color 0.2s'
              }}
            >
              Generate
            </button>
          </div>
        </div>

        {/* Stock Quantity */}
        <div style={{ marginBottom: '24px' }}>
          <div style={{
            fontSize: '14px',
            fontWeight: '500',
            color: '#2c3e50',
            marginBottom: '8px'
          }}>
            <strong>Stock Quantity:</strong>
          </div>
          <input
            type="number"
            value={newProduct.stock}
            onChange={(e) => setNewProduct({ ...newProduct, stock: Number(e.target.value) })}
            style={{
              width: '100%',
              padding: '12px',
              border: '1px solid #ddd',
              borderRadius: '6px',
              fontSize: '14px',
              outline: 'none'
            }}
          />
        </div>

        {/* Add Product Button */}
        <button 
          onClick={handleAddProduct}
          onMouseEnter={() => setAddHover(true)}
          onMouseLeave={() => setAddHover(false)}
          style={{
            backgroundColor: addHover ? '#219a52' : '#27ae60',
            color: 'white',
            border: 'none',
            padding: '14px 24px',
            borderRadius: '6px',
            fontSize: '16px',
            fontWeight: '600',
            cursor: 'pointer',
            width: '100%',
            transition: 'background-color 0.2s'
          }}
        >
          Add Product
        </button>
      </div>

      {/* Product Inventory */}
      <div style={{
        background: 'white',
        padding: '24px',
        borderRadius: '12px',
        boxShadow: '0 1px 3px rgba(0,0,0,0.1)',
        border: '1px solid #e1e8ed'
      }}>
        <div style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          marginBottom: '20px'
        }}>
          <h3 style={{
            fontSize: '18px',
            fontWeight: '600',
            color: '#2c3e50',
            margin: 0
          }}>
            Product Inventory
          </h3>
          <span style={{
            fontSize: '14px',
            color: '#7f8c8d',
            fontWeight: '500'
          }}>
            Total: {products.length} products
          </span>
        </div>
        
        <table style={{
          width: '100%',
          borderCollapse: 'collapse',
          fontSize: '14px'
        }}>
          <thead>
            <tr style={{
              backgroundColor: '#f8f9fa',
              borderBottom: '2px solid #e1e8ed'
            }}>
              <th style={{
                padding: '16px',
                textAlign: 'left',
                fontWeight: '600',
                color: '#2c3e50',
                fontSize: '12px',
                textTransform: 'uppercase'
              }}>
                PRODUCT NAME
              </th>
              <th style={{
                padding: '16px',
                textAlign: 'left',
                fontWeight: '600',
                color: '#2c3e50',
                fontSize: '12px',
                textTransform: 'uppercase'
              }}>
                PRICE
              </th>
              <th style={{
                padding: '16px',
                textAlign: 'left',
                fontWeight: '600',
                color: '#2c3e50',
                fontSize: '12px',
                textTransform: 'uppercase'
              }}>
                BARCODE
              </th>
              <th style={{
                padding: '16px',
                textAlign: 'left',
                fontWeight: '600',
                color: '#2c3e50',
                fontSize: '12px',
                textTransform: 'uppercase'
              }}>
                STOCK
              </th>
              <th style={{
                padding: '16px',
                textAlign: 'left',
                fontWeight: '600',
                color: '#2c3e50',
                fontSize: '12px',
                textTransform: 'uppercase'
              }}>
                ACTIONS
              </th>
            </tr>
          </thead>
          <tbody>
            {products.map((product, index) => (
              <tr key={product.id} style={{
                borderBottom: '1px solid #e1e8ed',
                backgroundColor: index % 2 === 0 ? 'white' : '#f8f9fa'
              }}>
                <td style={{ padding: '16px', color: '#2c3e50', fontWeight: '500' }}>
                  {product.name}
                </td>
                <td style={{ padding: '16px', color: '#27ae60', fontWeight: '600' }}>
                  M{product.price.toFixed(2)}
                </td>
                <td style={{ padding: '16px', color: '#7f8c8d', fontFamily: 'monospace' }}>
                  {product.barcode}
                </td>
                <td style={{ padding: '16px', color: '#2c3e50' }}>
                  {product.stock} units
                </td>
                <td style={{ padding: '16px' }}>
                  <button style={{
                    backgroundColor: '#3498db',
                    color: 'white',
                    border: 'none',
                    padding: '6px 12px',
                    borderRadius: '4px',
                    fontSize: '12px',
                    fontWeight: '500',
                    cursor: 'pointer',
                    marginRight: '8px'
                  }}>
                    Edit
                  </button>
                  <button style={{
                    backgroundColor: '#e74c3c',
                    color: 'white',
                    border: 'none',
                    padding: '6px 12px',
                    borderRadius: '4px',
                    fontSize: '12px',
                    fontWeight: '500',
                    cursor: 'pointer'
                  }}>
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Footer Section */}
      <div style={{
        marginTop: '40px',
        paddingTop: '20px',
        borderTop: '1px solid #e1e8ed'
      }}>
        <div style={{
          fontWeight: '600',
          color: '#2c3e50',
          marginBottom: '4px'
        }}>
          Tumelo Molumo · 1st
        </div>
        <div style={{
          color: '#7f8c8d',
          fontSize: '14px',
          marginBottom: '8px'
        }}>
          Full-Stack Developer | Automating Business Operation...
        </div>
        <div style={{
          fontWeight: '600',
          color: '#2c3e50',
          marginBottom: '4px'
        }}>
          I Built a Full-Stack POS System from Scratch!
        </div>
        <div style={{
          color: '#7f8c8d',
          fontSize: '14px'
        }}>
          I'm excited to share a project I've been working on: ... more
        </div>
      </div>
    </div>
  );
};

export default ProductManagement;