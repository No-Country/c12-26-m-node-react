const prisma = require('../db')
const {encryptPassword, comparePassword} = require('../utils/passwordHash')
const jwt = require('jsonwebtoken')
const tokenSecret = process.env.TOKEN_SECRET
const tokenExp = process.env.TOKEN_EXP

const signUp = async (req, res) =>{
    const {firstName, secondName, lastName, secondLastName, birthDay, phone,
        documentId, country, email, password, profileImg} = req.body;
    try {
        const user= await prisma.user.create({
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
                profileImg
            },
            select: { // User sin exponer el password
                firstName: true,
                secondName: true,
                lastName: true,
                secondLastName: true,
                birthDay: true,
                phone: true,
                documentId: true,
                country: true,
                email: true,
                profileImg: true
              }
        });
        res.status(201).json({"message": "User created", user})
    } catch (error) {
        if (error.code === 'P2002' && error.meta?.target === 'User_email_key') {
            res.status(400).json({"message": "email_already_exist"})
        }else if(error.code === 'P2002' && error.meta?.target === 'User_documentID_key'){
            res.status(400).json({"message": "document_already_exist"})
        }else{
            res.status(500).json({"message": "Error"})
            console.log(error)
        }
    }
}

const signIn = async (req, res) =>{
    const {email, password} = req.body
    try {
        const user = await prisma.user.findUnique({
            where: {
                email: email
            }
        })
        if (!user) return res.status(404).json({"message": "email_not_found"})
        const passwordValid = await comparePassword(password, user.password)
        if (!passwordValid) return res.status(404).json({"message": "password_incorrect"})
        const token = jwt.sign({id: user.id}, tokenSecret, {expiresIn: '24h'})
        res.header('Authorization', token).json(user)
    } catch (error) {
        res.status(500).json({"message": "Error"})
        console.log(error)
    }
}

const profile = async (req, res) => {
    try {
        const user = await prisma.user.findUnique({
            where: {
                id: req.userId // Cargado en validateToken
            },
            select: { // User sin exponer el password
                firstName: true,
                secondName: true,
                lastName: true,
                secondLastName: true,
                birthDay: true,
                phone: true,
                documentId: true,
                country: true,
                email: true,
                profileImg: true
              }
        })
        res.json(user)
    } catch (error) {
        res.status(500).json({"message": "Error"})
        console.log(error)
    }
}

module.exports = {signUp, signIn, profile}