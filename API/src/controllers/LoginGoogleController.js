const jwt = require("jsonwebtoken");
const prisma = require("../db");
const { comparePassword } = require("../utils/passwordHash");
const { TOKEN_SECRET, TOKEN_EXP } = process.env;
const { validateLoginGoogle } = require("../middleware/validateGoogleLogin");

const signInGoogle = async (body) => {
  let isValidate = await validateLoginGoogle(body);
  const { email, loginGoogle } = body;

  if (isValidate.containErrors) {
    throw new Error(JSON.stringify(isValidate));
  }

  const user = await prisma.user.findUnique({
    where: {
      email: email,
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

  if (user && loginGoogle) {
    const token = jwt.sign({ id: user.id }, TOKEN_SECRET, { expiresIn: "2w" });
    return {
      token,
      user,
      ...isValidate,
      containErrors: false,
      message: "You have successfully logged in, welcome.",
    };
  }
};
module.exports = { signInGoogle };
