const prisma = require("../db");

async function validateUser(body) {
  const { firstName, lastName, documentId, country, email, phone, password } =
    body;
  console.log("Validating user");

  const existingUser = await prisma.user.findFirst({
    where: {
      OR: [{ email: email }, { documentId: documentId }],
    },
  });

  if (existingUser) {
    if (existingUser.email === email) {
      return {
        containErrors: true,
        message: "E-mail already exists. Please enter a valid e-mail address.",
      };
    } else {
      return {
        containErrors: true,
        message: "Document already exists. Please enter a valid DocumentId",
      };
    }
  }

  if (!firstName) {
    return {
      containErrors: true,
      message: "This field is required, please enter First Name.",
    };
  }

  if (!lastName) {
    return {
      containErrors: true,
      message: "This field is required, please enter Last Name.",
    };
  }

  if (!email) {
    return {
      containErrors: true,
      message: "This field is required, please enter an e-mail address.",
    };
  }

  if (!country) {
    return {
      containErrors: true,
      message: "This field is required, please enter Country.",
    };
  }

  if (!password) {
    return {
      containErrors: true,
      message: "This field is required, please enter a password.",
    };
  }

  if (!phone) {
    return {
      containErrors: true,
      message: "This field is required, please enter a phone number.",
    };
  }

  return {
    containErrors: false,
    message: "You have successfully registered, thanks.",
  };
}

module.exports = { validateUser };
