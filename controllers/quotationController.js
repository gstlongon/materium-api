const Product = require('../models/Product');
const Quotation = require('../models/Quotation');
const User = require('../models/User');

exports.joinQuotation = async (req, res) => {
  const { productId, fraction } = req.body;
  const userId = req.user.id; 

  try {
    const product = await Product.findById(productId);
    if (!product) {
      return res.status(404).json({ error: 'Product not found' });
    }

    let quotation = await Quotation.findOne({ productId, completed: false });

    if (!quotation) {
      quotation = new Quotation({
        productId,
        participants: [{ userId, fraction }]
      });
    } else {
      const alreadyJoined = quotation.participants.find(p => p.userId === userId);
      if (alreadyJoined) {
        return res.status(400).json({ error: 'User already joined this quotation' });
      }

      const currentTotal = quotation.participants.reduce((sum, p) => sum + p.fraction, 0);
      const newTotal = currentTotal + fraction;

      if (newTotal > 1) {
        return res.status(400).json({ error: 'Total share exceeds 100%' });
      }

      quotation.participants.push({ userId, fraction });

      if (newTotal === 1) {
        quotation.completed = true;
      }
    }

    await quotation.save();
    return res.status(200).json({ message: 'Share added successfully', quotation });

  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to add share' });
  }
};
