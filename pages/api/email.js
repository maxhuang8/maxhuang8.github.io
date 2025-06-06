import { Resend } from 'resend'
const resend = new Resend(process.env.RESEND_API_KEY)
import EmailTemplate from '../../components/EmailTemplate'

export default async function sendEmail(req, res) {
  try {
    const data = req.body

    await resend.sendEmail({
      from: 'maxhuang8.github.io <maxibillionmaximillion@gmail.com>',
      to: process.env.RESEND_DESTINATION_EMAIL,
      replyTo: data.email,
      subject: `${data.name} - via maxhuang8.github.io`,
      react: <EmailTemplate {...data} />,
    })

    res.status(200).json({ message: 'Email sent' })
  } catch (e) {
    res.status(500).json({ message: e.message })
  }
}
