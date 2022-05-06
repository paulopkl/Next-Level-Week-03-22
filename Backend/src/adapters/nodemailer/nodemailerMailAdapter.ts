import { MailAdapter, SendMailData } from "../mailAdapter";
import nodemailer from "nodemailer";

const transport = nodemailer.createTransport({
    host: "smtp.mailtrap.io",
    port: 2525,
    auth: {
        user: "98527ee395a099",
        pass: "4fcc7357e51b09",
    },
});

export class NodemailerMailAdapter implements MailAdapter {
    constructor(

    ) { }

    async sendMail({ subject, body }: SendMailData) {
        await transport.sendMail({
            from: "Equipe Feedget <no-reply@email.com>",
            to: "Paulo Ricardo <pauloradea@hotmail.com>",
            subject,
            html: body,
        });
    };
}