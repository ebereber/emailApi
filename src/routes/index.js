const { Router } = require('express')
const router = Router()

// Controller
const { sendEmail } = require('../controllers')

router.post('/send-email', sendEmail)

module.exports = router
