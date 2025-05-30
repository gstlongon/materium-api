const User = require('../models/User');
const jwt = require('jsonwebtoken');

const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: '7d' });
};

exports.login = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user || !(await user.comparePassword(password))) {
      return res.status(401).json({ message: 'Credenciais inválidas' });
    }

    res.json({
      user: { id: user._id, name: user.name, role: user.role },
      token: generateToken(user._id),
    });
  } catch (err) {
        res.status(400).json({ 
        error: 'Erro ao login', 
        message: err.message 
    });
  }
};
