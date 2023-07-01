const nodemailer = require('nodemailer');
const func=require("../middlewares/AsyncErrorHandler")

// Create a transporter using SMTP

const mailsender=func(async(options)=>{
    const transporter = nodemailer.createTransport({ 
        host: "smtp.gmail.com",
  port: 587,
  secure: false,
        service: 'gmail',
        // Set to true if using SSL/TLS
        auth: { 
          user:process.env.SMPT_MAIL,
          pass:process.env.SMPT_PASSWORD,
        },
      });
       
      // Create an email message 
    //   console.log(options.email)
      const mailOptions = {
        from: process.env.SMPT_MAIL,
        to: options.email,
        subject:options.subject,
        text: options.message,
        // html: '<h1>Hello</h1><p>This is a test email</p>',
      };
      
      // Send the email
      try {
        const info = await transporter.sendMail(mailOptions);
        console.log('Email sent:', info.response);
      } catch (error) {
        console.error('Error sending email:', error);
   }
    //   try {
    //     await transporter.sendMail(mailOptions, (error, info) => {
    //         if (error) {
    //           console.error('Error sending email:', error);
    //         } else {
    //           console.log('Email sent:', info.response);
    //         }
    //       });
    //   } catch (error) {
    //     res.status(404).json({
    //         success:false,
    //         error:error.message
    //     })
    //   }
     
})
module.exports=mailsender;

