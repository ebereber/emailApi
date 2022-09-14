const { sendEmail } = require('../utils/sendEmail')

exports.sendEmail = async (req, res) => {
  const { name, email, subject, message } = req.body

  const contentHTML = `
  <h1>Contact Form Portfolio</h1>
  <ul>
    <li>Name: ${name}</li>
    <li>Email: ${email}</li>
    <li>subject: ${subject}</li>
    <p>${message}</p>
  </ul>
  `

  await sendEmail(subject, contentHTML)

  return res.status(200).json({
    type: 'Succes',
    message: 'Messagen sended'
  })
}
