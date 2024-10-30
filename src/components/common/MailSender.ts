import nodemailer from 'nodemailer';

class MailSender {
    private user: string;
    private password: string;
    private transporter: nodemailer.Transporter;

    constructor(user: string, password: string) {
        this.user = user;
        this.password = password;

        this.transporter = nodemailer.createTransport({
            host: 'mail.brandtransilvania.ro',
            port: 465,
            secure: true, // use TLS
            auth: {
                user: this.user,
                pass: this.password,
            },
            tls: {
                ciphers: 'SSLv3',
            },
        });
    }

    public async sendEmail(to: string, subject: string, body: string): Promise<void> {
        const mailOptions = {
            from: '"CRM" <office@brandtransilvania.ro>',
            to: to,
            subject: subject,
            text: body,
        };

        try {
            await this.transporter.sendMail(mailOptions);
            console.log('Email sent successfully');
        } catch (error) {
            console.error('Error sending email:', error);
            throw error;
        }
    }
}

export default MailSender;
