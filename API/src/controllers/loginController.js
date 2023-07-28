const jwt = require("jsonwebtoken");
const prisma = require("../db");
const { comparePassword } = require("../utils/passwordHash");
const { TOKEN_SECRET, TOKEN_EXP } = process.env;
const { validateLogin } = require("../middleware/validateLogin");
const { getWalletIdByUserId, userWalletBalance } = require("./walletController");

const signIn = async (body) => {
  let isValidate = await validateLogin(body);
  const { email, password } = body;
  if (isValidate.containErrors) {
    throw new Error(JSON.stringify(isValidate));
  }

  const user = await prisma.user.findUnique({
    where: {
      email: email.toLowerCase(),
    },
  });

  if (!user) {
    throw new Error(
      JSON.stringify({
        containErrors: true,
        message: "User not found. Please register.",
      })
    );
  }

  const passwordValid = await comparePassword(password, user.password);
  if (!passwordValid) {
    return {
      containErrors: true,
      message: "Incorrect password, please try again.",
    };
  }

  const token = jwt.sign({ id: user.id }, TOKEN_SECRET, { expiresIn: "2w" });
  const userWalletId = await getWalletIdByUserId(user.id)
  const userWalletAmount = await userWalletBalance(userWalletId)
  return {
    token,
    user,
    balance: userWalletAmount,
    ...isValidate,
    containErrors: false,
    message: "You have successfully logged in, welcome.",
  };
};
module.exports = { signIn };
