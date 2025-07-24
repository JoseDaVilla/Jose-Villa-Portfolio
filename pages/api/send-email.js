import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

export default async function handler(req, res) {
    if (req.method !== 'POST') return res.status(405).end();
    const { name, email, message } = req.body;

    try {
        await resend.emails.send({
            from: 'your@email.com', // must be a verified sender address
            to: 'your@email.com',   // your receiving email address
            subject: `Portfolio Contact: ${name}`,
            html: `<p><strong>Name:</strong> ${name}</p>
                   <p><strong>Email:</strong> ${email}</p>
                   <p><strong>Message:</strong><br/>${message}</p>`
        });
        res.status(200).json({ ok: true });
    } catch (err) {
        res.status(500).json({ error: 'Failed to send email' });
    }
}
