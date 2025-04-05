export const getCart = (req, res) => {
    res.status(200).json({ message: 'Carrito del usuario', cart: [] });
};
  
export const addToCart = (req, res) => {
    const item = req.body;
    res.status(201).json({ message: 'Producto agregado al carrito', item });
};
  
export const updateCartItem = (req, res) => {
    const itemId = req.params.id;
    const updateData = req.body;
    res.status(200).json({ message: `Producto del carrito ${itemId} actualizado`, updateData });
};
  
export const removeCartItem = (req, res) => {
    const itemId = req.params.id;
    res.status(200).json({ message: `Producto del carrito ${itemId} eliminado` });
};
  