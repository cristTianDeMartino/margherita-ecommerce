'use client';
import { createContext, useContext, useState, useEffect } from 'react';
import { useSession } from 'next-auth/react';

const CartContext = createContext();

export function CartProvider({ children }) {
  const [cartItems, setCartItems] = useState([]);
  const [isCartOpen, setIsCartOpen] = useState(false);

  const { data: session, status } = useSession();
  const [isInitialized, setIsInitialized] = useState(false);

  // Clave única según si el usuario está conectado o es invitado
  const cartKey = session?.user?.id 
    ? `margherita_cart_${session.user.id}` 
    : 'margherita_cart_guest';

  // Cargar el carrito correcto al montar o al cambiar de usuario
  useEffect(() => {
    if (status === 'loading') return;

    setIsInitialized(false);
    try {
      const saved = localStorage.getItem(cartKey);
      setCartItems(saved ? JSON.parse(saved) : []);
    } catch (e) {
      console.error("Error loading cart from storage", e);
      setCartItems([]);
    } finally {
      setIsInitialized(true);
    }
  }, [cartKey, status]);

  // Guardar en localStorage pero SOLAMENTE si ya inicializamos el carrito correcto
  useEffect(() => {
    if (!isInitialized) return;
    localStorage.setItem(cartKey, JSON.stringify(cartItems));
  }, [cartItems, cartKey, isInitialized]);

  const addToCart = (product) => {
    setCartItems(prev => {
      const existing = prev.find(item => item.id === product.id);
      if (existing) {
        return prev.map(item => 
          item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
        );
      }
      return [...prev, { ...product, quantity: 1 }];
    });
    setIsCartOpen(true); // Abrir el carrito automáticamente al añadir
  };

  const removeFromCart = (id) => {
    setCartItems(prev => prev.filter(item => item.id !== id));
  };

  const updateQuantity = (id, newQuantity) => {
    if (newQuantity < 1) {
      removeFromCart(id);
      return;
    }
    setCartItems(prev => 
      prev.map(item => item.id === id ? { ...item, quantity: newQuantity } : item)
    );
  };

  const clearCart = () => setCartItems([]);
  
  const openCart = () => setIsCartOpen(true);
  const closeCart = () => setIsCartOpen(false);

  const cartTotal = cartItems.reduce((total, item) => {
    // Parse price strings like "$120.00" to numbers
    const priceStr = item.price.replace(/[^0-9.]/g, '');
    const price = parseFloat(priceStr) || 0;
    return total + (price * item.quantity);
  }, 0);

  const cartCount = cartItems.reduce((count, item) => count + item.quantity, 0);

  return (
    <CartContext.Provider value={{
      cartItems,
      addToCart,
      removeFromCart,
      updateQuantity,
      clearCart,
      isCartOpen,
      openCart,
      closeCart,
      cartTotal,
      cartCount
    }}>
      {children}
    </CartContext.Provider>
  );
}

export const useCart = () => useContext(CartContext);
