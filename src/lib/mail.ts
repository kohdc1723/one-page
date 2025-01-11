import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export const sendVerificationEmail = async (email: string, token: string) => {
  const confirmLink = `${process.env.NEXT_PUBLIC_BASE_API_URL}/email-verification?token=${token}`;

  await resend.emails.send({
    from: "onboarding@resend.dev",
    to: email,
    subject: "Confirm your email",
    html: emailVerificationHtml(confirmLink)
  });
}

export const sendResetPasswordEmail = async (email: string, token: string) => {
  const resetLink = `${process.env.NEXT_PUBLIC_BASE_API_URL}/new-password?token=${token}`;

  await resend.emails.send({
    from: "onboarding@resend.dev",
    to: email,
    subject: "Reset your password",
    html: resetPasswordHtml(resetLink)
  });
}

const emailVerificationHtml = (link: string) => `
  <p>
    Click <a href="${link}">here</a> to confirm your email.
  </p>
`;

const resetPasswordHtml = (link: string) => `
  <p>
    Click <a href="${link}">here</a> to reset your password.
  </p>
`;