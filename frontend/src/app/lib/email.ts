import emailjs from "@emailjs/browser";

export async function sendAuditEmail(data: {
  user_name: string;
  user_email: string;
  savings: number;
  report_link: string;
}) {
  try {
    const response = await emailjs.send(
      import.meta.env.VITE_EMAILJS_SERVICE_ID,
      import.meta.env.VITE_EMAILJS_TEMPLATE_ID,
      {
        user_name: data.user_name,
        user_email: data.user_email,
        savings: `$${data.savings}`,
        report_link: data.report_link,
      },
      import.meta.env.VITE_EMAILJS_PUBLIC_KEY
    );

    console.log("Email sent:", response);

    return response;
  } catch (error) {
    console.error("EmailJS Error:", error);
    throw error;
  }
}