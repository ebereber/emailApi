const { createTransport } = require('nodemailer')
const { google } = require('googleapis')
const dotenv = require('dotenv')
dotenv.config()

exports.sendEmail = async (subject, content) => {
  const OAuth2Client = new google.auth.OAuth2(
    process.env.CLIENT_ID,
    process.env.CLIENT_SECRET,
    process.env.REDIRECT_URI
  )

  OAuth2Client.setCredentials({ refresh_token: process.env.REFRESH_TOKEN })

  try {
    const accesToken = await OAuth2Client.getAccessToken()

    const transport = createTransport({
      service: 'gmail',
      auth: {
        type: 'OAuth2',
        user: process.env.USER_EMAIL,
        clientId: process.env.CLIENT_ID,
        clientSecret: process.env.CLIENT_SECRET,
        refreshToken: process.env.REFRESH_TOKEN,
        accessToken: accesToken
      }
    })

    const mailOptions = {
      from: 'Portfolio',
      to: process.env.USER_EMAIL,
      subject,
      html: content

    }
    return await transport.sendMail(mailOptions)
  } catch (error) {
    console.log(error)
  }
}
