const Router = require("express");

const userRouter = require("./userRouter");
const loginRouter = require("./loginRouter");

const router = Router();

router.use("/users", userRouter);
router.use("/login", loginRouter);

module.exports = router;
