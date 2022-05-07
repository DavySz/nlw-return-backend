import { MailAdaper } from "../adapters/mail-adapter";
import { FeedbacksRepository } from "../repositories/feedbacks-repository";

interface SubmitFeedbackUseCaseRequest {
    type: string;
    comment: string;
    screenshot?: string;
}

export class SubmitFeedbackUseCase {
    constructor(
        private readonly feedbackRepository: FeedbacksRepository,
        private readonly mailAdapter: MailAdaper
    ){}

    async execute(request: SubmitFeedbackUseCaseRequest){
        const {type,comment,screenshot} = request
        await this.feedbackRepository.create({
            type,
            comment,
            screenshot
        })
        await this.mailAdapter.sendMail({
            subject: 'Novo feedback',
            body: [
                `<div style="font-family: sans-serif; font-size: 16px; color: #111;">`,
                `<p>Tipo do feedback: ${type}</p>`,
                `<p>Tipo do comentário: ${comment}</p>`,
                `</div>`
            ].join('\n')
        })
    }
}