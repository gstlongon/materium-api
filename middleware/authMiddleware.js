const jwt = require('jsonwebtoken');
const User = require('../models/User');

const auth = async (req, res, next) => {
  const token = req.headers.authorization?.split(' ')[1];

  if (!token) return res.status(401).json({ message: 'Token não fornecido' });

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = await User.findById(decoded.id);
    if (!req.user) throw new Error();
    next();
  } catch {
    res.status(401).json({ message: 'Token inválido' });
  }
};

const isFornecedor = (req, res, next) => {
  if (req.user.role !== 'fornecedor') {
    return res.status(403).json({ message: 'Apenas fornecedores podem fazer isso' });
  }
  next();
};

module.exports = { auth, isFornecedor };
