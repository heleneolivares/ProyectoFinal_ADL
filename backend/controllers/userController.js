export const getUser = (req, res) => {
    const userId = req.params.id;
    res.status(200).json({ message: `Usuario con ID ${userId}` });
};
  
export const updateUser = (req, res) => {
    const userId = req.params.id;
    const updateData = req.body;
    res.status(200).json({ message: `Usuario ${userId} actualizado`, updateData });
};
  
export const deleteUser = (req, res) => {
    const userId = req.params.id;
    res.status(200).json({ message: `Usuario ${userId} eliminado` });
};