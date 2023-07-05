const {signIn, signUp, profile} = require('../controllers/auth.controller')
const {Router} = require('express')
const validateToken = require('../middleware/validateToken')

const router = Router()

router.post('/signup', signUp)
router.post('/signin', signIn)
router.get('/profile', validateToken , profile)
module.exports = router