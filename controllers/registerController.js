const User = require('../models/User');
const jwt = require('jsonwebtoken');

const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: '7d' });
};

exports.register = async (req, res) => {
  const { name, email, password, role } = req.body;

  try {
    const user = await User.create({ name, email, password, role });
    res.status(201).json({
      user: { id: user._id, name: user.name, role: user.role },
      token: generateToken(user._id)
    });
  } catch (err) {
        res.status(400).json({ 
        error: 'Erro ao registrar', 
        message: err.message 
    });
  }
};
