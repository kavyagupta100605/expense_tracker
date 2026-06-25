const express = require("express");
const protect = require("../middleware/authMiddleware");
const router = express.Router();
const {
  createExpense,
  getExpenses,
  updateExpense,
  deleteExpense,
} = require("../controllers/expensecontrollers");

router.use(protect);

router.get("/", getExpenses);
router.post("/",createExpense);
router.put("/:id",updateExpense);
router.delete("/:id",deleteExpense);

module.exports = router;