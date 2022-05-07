export interface SendMailData {
    subject: string;
    body: string;
}

export interface MailAdaper {
    sendMail: (data: SendMailData) => Promise<void>
}