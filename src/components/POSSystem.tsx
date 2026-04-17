import React, { useState } from "react";
import 'bootstrap/dist/css/bootstrap.min.css';


// Define proper types for products and cart items
interface Product {
  id: number;
  name: string;
  price: number;
}

interface CartItem extends Product {
  quantity: number;
}

const POSSystem: React.FC = () => {
  // Explicitly type cart as CartItem[]
  const [cart, setCart] = useState<CartItem[]>([]);

  const products: Product[] = [
    { id: 1, name: "Item A", price: 10 },
    { id: 2, name: "Item B", price: 20 },
    { id: 3, name: "Item C", price: 30 },
  ];

  // Explicitly type function parameter
  const addToCart = (product: Product) => {
    const existingItem = cart.find(item => item.id === product.id);
    if (existingItem) {
      setCart(
        cart.map(item =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        )
      );
    } else {
      setCart([...cart, { ...product, quantity: 1 }]);
    }
  };

  const removeFromCart = (productId: number) => {
    setCart(cart.filter(item => item.id !== productId));
  };

  const getTotal = () => {
    return cart.reduce((total, item) => total + item.price * item.quantity, 0);
  };

  return (
    <div>
      <h2>Products</h2>
      {products.map(product => (
        <div key={product.id}>
          {product.name} - M{product.price.toFixed(2)}
          <button onClick={() => addToCart(product)}>Add to Cart</button>
        </div>
      ))}

      <h2>Cart</h2>
      {cart.map(item => (
        <div key={item.id}>
          {item.name} - M{item.price.toFixed(2)} x {item.quantity}
          <button onClick={() => removeFromCart(item.id)}>Remove</button>
        </div>
      ))}

      <h3>Total: M{getTotal().toFixed(2)}</h3>
    </div>
  );
};

export default POSSystem;
