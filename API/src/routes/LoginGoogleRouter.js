const { Router } = require("express");
const { signInGoogle } = require("../controllers/LoginGoogleController");

const router = Router();

router.post("/google", async (req, res) => {
  try {
    const login = await signInGoogle(req.body);

    res.status(200).send(login);
  } catch (error) {
    res.status(400).send(JSON.parse(error.message));
  }
});

module.exports = router;
