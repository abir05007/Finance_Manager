const express = require('express');
const { Expense, Debt, TuitionRecord, Profile, User } = require('../models');
const { authenticateToken } = require('./middleware');

const router = express.Router();

router.get('/data', authenticateToken, async (req, res) => {
  try {
    const userId = req.user.id;
    const expenses = await Expense.findAll({ where: { user_id: userId } });
    const profile = await Profile.findOne({ where: { user_id: userId } });
    const debts = await Debt.findAll({ where: { user_id: userId } });
    const user = await User.findByPk(userId);

    res.json({
      expenses,
      profile,
      debts,
      username: user ? user.username : null
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
