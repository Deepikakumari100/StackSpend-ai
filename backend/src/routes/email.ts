import { Router } from 'express';
import emailjs from '@emailjs/nodejs';

const router = Router();

router.post('/send', async (req, res) => {
  try {
    const { user_name, user_email, savings, report_link } = req.body;

    await emailjs.send(
      process.env.EMAILJS_SERVICE_ID!,
      process.env.EMAILJS_TEMPLATE_ID!,
      {
        user_name,
        user_email,
        savings: `$${savings.toLocaleString()}/year`,
        report_link,
      },
      {
        publicKey: process.env.EMAILJS_PUBLIC_KEY!,
        privateKey: process.env.EMAILJS_PRIVATE_KEY!,
      }
    );

    res.json({ success: true });

  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false,
      message: 'Email failed',
    });
  }
});

export default router;