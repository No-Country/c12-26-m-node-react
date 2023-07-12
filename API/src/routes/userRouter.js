const { Router } = require("express");
const {
  signIn,
  signUp,
  getUsers,
  profile,
} = require("../controllers/userController");
const validateToken = require("../middleware/validateToken");

const router = Router();

// router.get("/profile", validateToken, profile);

router.post("/newuser", async (req, res) => {
  try {
    const newUser = await signUp(req.body);
    res.status(200).send(newUser);
  } catch (error) {
    res.status(400).json(error.message);
  }
});

router.get("/", async (req, res) => {
  try {
    const allUsers = await getUsers();
    res.status(200).send(allUsers);
  } catch (error) {
    res.status(400).send(error.message);
  }
});

module.exports = router;
