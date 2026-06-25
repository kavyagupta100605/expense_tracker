const express = require("express");
const router = express.Router();
const {
  createUser,
  getUsers,
  updateUser,
  deleteUser,
} = require("../controllers/userControllers");


router.get("/", getUsers);
router.post("/",createUser);
router.put("/:id",updateUser);
router.delete("/:id",deleteUser);

module.exports = router;