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
    await new Promise((resolve, reject) => {
      // verify connection configuration
      transport.verify(function (error, success) {
        if (error) {
          console.log(error)
          reject(error)
        } else {
          console.log('Server is ready to take our messages')
          resolve(success)
        }
      })
    })
    const mailOptions = {
      from: 'Portfolio',
      to: process.env.USER_EMAIL,
      subject,
      html: content
    }

    await new Promise((resolve, reject) => {
      // send mail
      transport.sendMail(mailOptions, (err, info) => {
        if (err) {
          console.error(err)
          reject(err)
        } else {
          console.log(info)
          resolve(info)
        }
      })
    })
  } catch (error) {
    console.log(error)
  }
}
