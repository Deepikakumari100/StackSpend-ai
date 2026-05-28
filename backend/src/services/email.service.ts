const fromEmail = process.env.EMAIL_FROM ?? 'hello@stackspend.com';

export async function sendLeadEmail(email: string, company: string, role: string) {
  const resendApiKey = process.env.RESEND_API_KEY;

  if (!resendApiKey) {
    return {
      status: 'skipped',
      message: 'Email sending is not configured.'
    };
  }

  const response = await fetch('https://api.resend.com/emails', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${resendApiKey}`
    },
    body: JSON.stringify({
      from: fromEmail,
      to: email,
      subject: 'StackSpend audit request received',
      html: `<p>Thanks for starting an AI spend audit.</p><p><strong>Company:</strong> ${company}</p><p><strong>Role:</strong> ${role}</p>`
    })
  });

  if (!response.ok) {
    const errorText = await response.text();
    let message = errorText;

    try {
      const errorBody = JSON.parse(errorText) as { message?: string };
      message = errorBody.message ?? errorText;
    } catch {
      message = errorText;
    }

    throw new Error(`Resend request failed: ${message}`);
  }

  await response.text();
  return {
    status: 'sent',
    message: 'Email sent successfully.'
  };
}

export async function sendAuditResultEmail(
  recipientEmail: string,
  recipientName: string,
  annualSavings: string,
  reportLink: string
) {
  const resendApiKey = process.env.RESEND_API_KEY;

  if (!resendApiKey) {
    return {
      status: 'skipped',
      message: 'Email sending is not configured.'
    };
  }

  const safeRecipientName = recipientName?.trim() || 'StackSpend user';
  const emailBody = `<p>Hi ${safeRecipientName},</p>
    <p>Your StackSpend audit is ready. Estimated annual savings: <strong>${annualSavings}</strong>.</p>
    <p>You can view your report here: <a href="${reportLink}">${reportLink}</a></p>
    <p>Thanks for using StackSpend.</p>`;

  const response = await fetch('https://api.resend.com/emails', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${resendApiKey}`
    },
    body: JSON.stringify({
      from: fromEmail,
      to: recipientEmail,
      subject: 'Your StackSpend audit report is ready',
      html: emailBody
    })
  });

  if (!response.ok) {
    const errorText = await response.text();
    let message = errorText;

    try {
      const errorBody = JSON.parse(errorText) as { message?: string };
      message = errorBody.message ?? errorText;
    } catch {
      message = errorText;
    }

    throw new Error(`Resend request failed: ${message}`);
  }

  await response.text();
  return {
    status: 'sent',
    message: 'Audit email sent successfully.'
  };
}
