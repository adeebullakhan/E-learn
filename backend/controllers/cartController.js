const Cart = require('../models/Cart');

const getCartWithDetails = async (req, res) => {
  try {
    const cart = await Cart.findOne({ userId: req.params.userId })
      .populate('userId', 'name email') // only return name, email
      .populate('items.bookId', 'title price');

    if (!cart) return res.status(404).json({ message: 'Cart not found' });

    res.json(cart);
  } catch (error) {
    console.error('Error fetching cart:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

module.exports = { getCartWithDetails };
