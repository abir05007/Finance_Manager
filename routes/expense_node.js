const express = require('express');
const { Expense } = require('../models');
const { authenticateToken } = require('./middleware');

const router = express.Router();

router.post('/add', authenticateToken, async (req, res) => {
  try {
    const { name, amount, category, description, date, type } = req.body;
    const expense = await Expense.create({
      name,
      amount,
      category,
      description,
      date,
      type,
      user_id: req.user.id
    });
    res.json(expense);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.get('/list', authenticateToken, async (req, res) => {
  try {
    const expenses = await Expense.findAll({ where: { user_id: req.user.id } });
    res.json(expenses);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
