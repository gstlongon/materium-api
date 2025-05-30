const Product = require('../models/Product');

exports.createProduct = async (req, res) => {
  const { name, price, description, imageUrl } = req.body;

  try {
    const product = await Product.create({
      name,
      price,
      description,
      imageUrl,
      createdBy: req.user._id
    });
    res.status(201).json(product);
  } catch {
    res.status(400).json({ message: 'Erro ao criar produto' });
  }
};

exports.getProducts = async (req, res) => {
  const products = await Product.find().populate('createdBy', 'name');
  res.json(products);
};
