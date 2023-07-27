const prisma = require("../db");
const jwt = require("jsonwebtoken");
const { comparePassword } = require("../utils/passwordHash");
const { TOKEN_SECRET, TOKEN_EXP } = process.env;

async function validateLoginGoogle(body) {
  const { email, loginGoogle } = body;
  console.log("Validating Login");

  if (!email) {
    return {
      containErrors: true,
      message: "Usuario no Encontrado, Por favor registrese.",
    };
  }

  if (!loginGoogle) {
    return {
      containErrors: true,
      message: "Invalid Email, please register.",
    };
  }

  return {
    containErrors: false,
    message: "You have been successfully validated.",
  };
}

module.exports = { validateLoginGoogle };
