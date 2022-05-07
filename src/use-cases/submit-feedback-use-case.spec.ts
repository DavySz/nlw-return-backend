import { SubmitFeedbackUseCase } from "./submit-feedback-use-case"

const createFeedbackSpy  = jest.fn();
const sendMailSpy = jest.fn();

const submitFeedback = new SubmitFeedbackUseCase(
    {create: createFeedbackSpy},
    {sendMail: sendMailSpy}
)

describe('Submit feedback', ()=>{
    it('Should be able to submit a feedback', async ()=>{
        await expect(submitFeedback.execute({
            type: 'any_type',
            comment: 'any_comment',
            screenshot: 'data:image/png;base64_any_image.jpg'
        })).resolves.not.toThrow()
        expect(createFeedbackSpy).toHaveBeenCalled()
        expect(sendMailSpy).toHaveBeenCalled()
    })
    it('Should not be able submit a feedback without type', async ()=>{
        await expect(submitFeedback.execute({
            type: '',
            comment: 'any_comment',
            screenshot: 'data:image/png;base64_any_image.jpg'
        })).rejects.toThrow()
    })
    it('Should not be able submit a feedback without comment', async ()=>{
        await expect(submitFeedback.execute({
            type: 'any_type',
            comment: '',
            screenshot: 'data:image/png;base64_any_image.jpg'
        })).rejects.toThrow()
    })
    it('Should not be able submit a feedback with an invalid screenshot', async ()=>{
        await expect(submitFeedback.execute({
            type: 'any_type',
            comment: 'any_comment',
            screenshot: 'any_invalid_image.jpg'
        })).rejects.toThrow()
    })
})