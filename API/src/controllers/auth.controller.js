const prisma = require("../db");
const { encryptPassword } = require("../utils/passwordHash");

const signUp = async (req, res) => {
  const {
    firstName,
    secondName,
    lastName,
    secondLastName,
    documentId,
    country,
    email,
    password,
    profile_img,
  } = req.body;
  try {
    const user = await prisma.user.create({
      data: {
        firstName,
        secondName: secondName ?? undefined,
        lastName,
        secondLastName: secondLastName ?? undefined,
        documentId,
        country,
        email,
        password: await encryptPassword(password),
        profile_img: profile_img ?? undefined,
      },
      select: {
        // User sin exponer el password
        id: true,
        firstName: true,
        secondName: true,
        lastName: true,
        secondLastName: true,
        documentId: true,
        country: true,
        email: true,
        profile_img: true,
      },
    });
    res.status(201).json({ message: "User created", user });
  } catch (error) {
    if (error.code === "P2002" && error.meta?.target === "User_email_key") {
      res.status(400).json({ message: "email_already_exist" });
    } else if (
      error.code === "P2002" &&
      error.meta?.target === "User_documentID_key"
    ) {
      res.status(400).json({ message: "document_already_exist" });
    } else {
      res.status(500).json({ message: "Error" });
      console.log(error);
    }
  }
};

module.exports = { signUp };
