const User = require("../models/User");
const Product = require("../models/Product");

exports.getMe = async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select("-password"); 

    if (!user) return res.status(404).json({ message: "Usuário não encontrado" });

    const products = await Product.find({ createdBy: user._id });

    res.json({
      user,
      products,
    });
  } catch (err) {
    res.status(500).json({ message: "Erro ao carregar usuário", error: err });
  }
};
