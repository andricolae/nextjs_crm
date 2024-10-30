import MailSender from './MailSender';

class SendEmailTask {
    private mailSender: MailSender;
    private to: string;
    private subject: string;
    private body: string;

    constructor(user: string, password: string, to: string, subject: string, body: string) {
        this.mailSender = new MailSender(user, password);
        this.to = to;
        this.subject = subject;
        this.body = `Hello\nToRamac, type code:\n\n${body}\n\nIf you didn't request this email, you can ignore it.\n`;
    }

    public async execute(): Promise<void> {
        try {
            await this.mailSender.sendEmail(this.to, this.subject, this.body);
            console.log('Email sent successfully');
        } catch (error) {
            console.error('Error sending email:', error);
        }
    }
}

export default SendEmailTask;
    