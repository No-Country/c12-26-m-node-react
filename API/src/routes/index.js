const Router = require("express");

const userRouter = require("./userRouter");
const loginRouter = require("./loginRouter");
const stripePaymentRouter = require("./stripePaymentRouter");
const transactionsRouter = require("./transactionsRouter")
const LoginGoogleRouter = require("./LoginGoogleRouter");
const router = Router();

router.use("/users", userRouter);
router.use("/login", loginRouter);
router.use("/google", LoginGoogleRouter);
router.use("/payment", stripePaymentRouter);
router.use("/transactions", transactionsRouter)
module.exports = router;
