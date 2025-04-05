export const getFavorites = (req, res) => {
    res.status(200).json({ message: 'Favoritos del usuario', favorites: [] });
};
  
export const addFavorite = (req, res) => {
    const favorite = req.body;
    res.status(201).json({ message: 'Producto agregado a favoritos', favorite });
};
  
export const removeFavorite = (req, res) => {
    const productId = req.params.product_id;
    res.status(200).json({ message: `Producto ${productId} eliminado de favoritos` });
};