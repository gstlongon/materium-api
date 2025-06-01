const Product = require('../models/Product');
const Quotation = require('../models/Quotation');

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
  } catch (error) {
    console.error('Error creating product:', error);
    res.status(400).json({ message: 'Erro ao criar produto' });
  }
};

exports.getProducts = async (req, res) => {
  try {
    const products = await Product.find().populate('createdBy', 'name');

    const productsWithQuotations = await Promise.all(
      products.map(async (product) => {
        const quotations = await Quotation.find({ productId: product._id });
        return {
          ...product.toObject(),
          quotations
        };
      })
    );

    res.json(productsWithQuotations);
  } catch (error) {
    console.error('Error fetching products with quotations:', error);
    res.status(500).json({ message: 'Erro ao buscar produtos' });
  }
};

exports.getProductById = async (req, res) => {
  const { id } = req.params;

  try {
    const product = await Product.findById(id).populate('createdBy', 'name');

    if (!product) {
      return res.status(404).json({ message: 'Produto não encontrado' });
    }

    const quotations = await Quotation.find({ productId: product._id });

    res.json({
      ...product.toObject(),
      quotations
    });
  } catch (error) {
    console.error('Error fetching product:', error);
    res.status(500).json({ message: 'Erro ao buscar produto' });
  }
};

exports.updateProduct = async (req, res) => {
  const { id } = req.params;
  const { name, price, description, imageUrl } = req.body;

  try {
    const product = await Product.findByIdAndUpdate(
      id,
      { name, price, description, imageUrl },
      { new: true }
    );

    if (!product) {
      return res.status(404).json({ message: 'Produto não encontrado' });
    }

    res.json(product);
  } catch (error) {
    console.error('Error updating product:', error);
    res.status(500).json({ message: 'Erro ao atualizar produto' });
  }
};

// DELETE
exports.deleteProduct = async (req, res) => {
  const { id } = req.params;

  try {
    const product = await Product.findByIdAndDelete(id);

    if (!product) {
      return res.status(404).json({ message: 'Produto não encontrado' });
    }

    res.json({ message: 'Produto removido com sucesso' });
  } catch (error) {
    console.error('Error deleting product:', error);
    res.status(500).json({ message: 'Erro ao deletar produto' });
  }
};
