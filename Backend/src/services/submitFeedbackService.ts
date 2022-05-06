import { MailAdapter } from './../adapters/mailAdapter';
import { FeedbacksRepository } from './../repositories/feedbacksRepository';
interface SubmitFeedbackServiceRequest {
    type: string;
    comment: string;
    screenshot?: string;
}

export class SubmitFeedbackService {
    constructor(
        private feedbacksRepository: FeedbacksRepository,
        private mailAdapter: MailAdapter
    ) {}

    async execute({ type, comment, screenshot }: SubmitFeedbackServiceRequest): Promise<void> {
        if (!type) throw new Error("Type is required.");

        if (screenshot && !screenshot.startsWith("data:image/png;base64")) {
            throw new Error("Invalid screenshot format.");
        }

        if (!comment) throw new Error("Comment is required.");

        await this.feedbacksRepository.create({
            type, 
            comment, 
            screenshot
        });

        await this.mailAdapter.sendMail({
            subject: "New Feedback",
            body: [
                `<div style="font-family: sans-serif; font-size: 16px; color: #111">`,
                    `<p>Tipo do feedback: ${type}</p>`,
                    `<p>Comentário: ${comment}</p>`,
                `</div>`,
            ].join("\n")
        });
    }
}