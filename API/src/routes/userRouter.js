const { Router } = require("express");
const {
  signIn,
  signUp,
  getUsers,
  profile,
} = require("../controllers/userController");


const router = Router();


router.post("/newuser", async (req, res) => {
  try {
    const newUser = await signUp(req.body);
    res.status(200).send(newUser);
  } catch (error) {
    res.status(400).send(error.message);
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
