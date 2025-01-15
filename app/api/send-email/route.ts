import nodemailer from 'nodemailer';
import getConfig from 'next/config';
import { NextRequest, NextResponse } from 'next/server';

const { serverRuntimeConfig, publicRuntimeConfig } = getConfig();




export async function POST(req: NextRequest) {
  try {
    // Parse the request body
    const { email, subject, text } = await req.json();

    // Create a transporter using your email service credentials
    const transporter = nodemailer.createTransport({
        service: 'zoho',
        host: 'smtpro.zoho.in',
        port: 465,
        secure: true,
        auth: {
          user: publicRuntimeConfig.NEXT_PUBLIC_ZOHO_KEY,
          pass: serverRuntimeConfig.ZOHO_PASSWORD_KEY,
        },
        tls: {
          rejectUnauthorized: false,
        },
      });

    // Send the email
    const current = new Date()
    const cDate =
        current.getFullYear() +
        '-' +
        (current.getMonth() + 1) +
        '-' +
        current.getDate()
    const cTime =
        current.getHours() + ':' + current.getMinutes() + ':' + current.getSeconds()
    const dateTime = cDate + ' ' + cTime

    const mailOption = {
        from: 'Mtalii <hello@gomtalii.com>',
        to: 'hello@gomtalii.com',
        subject: `🌟Travel Request 🌟 <${dateTime}>`,
        html: `<p>Customer, ${email} has sent  message with Title ${subject} and request ${text}</p>`,
    }

    try {
        await transporter.sendMail(mailOption)
        console.log('Hire tayture mail sent succesfully')
    } catch (error) {
        console.log('Error sending mail', error)
    }

    return NextResponse.json({
        message: 'Email sent successfully!',          
      });

  } catch (error) {
    console.log(error)
    return NextResponse.json(
        { message: "Internal Server Error" },
        { status: 500 }
      );
  }
}
