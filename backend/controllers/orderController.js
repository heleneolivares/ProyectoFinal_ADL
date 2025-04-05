export const getOrders = (req, res) => {
    res.status(200).json({ message: 'Órdenes del usuario', orders: [] });
};
  
export const getOrder = (req, res) => {
    const orderId = req.params.id;
    res.status(200).json({ message: `Orden con ID ${orderId}`, order: {} });
};
  
export const createOrder = (req, res) => {
    const newOrder = req.body;
    res.status(201).json({ message: 'Orden creada', order: newOrder });
};
  
export const updateOrder = (req, res) => {
    const orderId = req.params.id;
    const updateData = req.body;
    res.status(200).json({ message: `Orden ${orderId} actualizada`, updateData });
};