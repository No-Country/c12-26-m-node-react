const prisma = require("../db");
const qr = require("qrcode");
const { validateUser } = require("../middleware/validateUser");
const { encryptPassword } = require("../utils/passwordHash");

const signUp = async (body) => {
  const validateUsers = await validateUser(body);

  const {
    firstName,
    secondName,
    lastName,
    secondLastName,
    birthDay,
    phone,
    documentId,
    country,
    email,
    password,
    profileImg,
  } = body;

  if (validateUsers.containErrors) {
    throw new Error(JSON.stringify(validateUsers));
  }

  const qrData = `${firstName} ${lastName}, ${email}`;
  const qrCode = await qr.toDataURL(qrData);

  const user = await prisma.user.create({
    data: {
      firstName,
      secondName,
      lastName,
      secondLastName,
      birthDay: new Date(birthDay),
      phone,
      documentId,
      country,
      email,
      password: await encryptPassword(password),
      profileImg,
      qrCodeUrl: qrCode,
    },
    select: {
      // User sin exponer el password
      firstName: true,
      secondName: true,
      lastName: true,
      secondLastName: true,
      birthDay: true,
      phone: true,
      documentId: true,
      country: true,
      email: true,
      profileImg: true,
      qrCodeUrl: true,
    },
  });

  return { ...user, ...validateUsers };
};

const getUsers = async function () {
  const allUsers = await prisma.user.findMany({});
  return allUsers;
};

// Codigo creado por Christian //
const profile = async (req, res) => {
  try {
    const user = await prisma.user.findUnique({
      where: {
        id: req.userId, // Cargado en validateToken
      },
      select: {
        // User sin exponer el password
        firstName: true,
        secondName: true,
        lastName: true,
        secondLastName: true,
        birthDay: true,
        phone: true,
        documentId: true,
        country: true,
        email: true,
        profileImg: true,
      },
    });
    res.json(user);
  } catch (error) {
    res.status(500).json({ message: "Error" });
    console.log(error);
  }
};

module.exports = { signUp, getUsers, profile };
