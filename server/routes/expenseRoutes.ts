import express from "express";
import protect from "../middleware/authMiddleware";
import {
  createExpense,
  getExpenses,
  updateExpense,
  deleteExpense,
} from "../controllers/expensecontrollers";
const router = express.Router();

router.use(protect);

router.get("/", getExpenses);
router.post("/",createExpense);
router.put("/:id",updateExpense);
router.delete("/:id",deleteExpense);

export default router;