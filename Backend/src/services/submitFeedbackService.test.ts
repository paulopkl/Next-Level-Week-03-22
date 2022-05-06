import { SubmitFeedbackService } from "./submitFeedbackService";

const createFeedbackSpy = jest.fn();
const sendEmailSpy = jest.fn();

const submitFeedback = new SubmitFeedbackService(
    { create: createFeedbackSpy },
    { sendMail: sendEmailSpy }
);

describe('Submit Feedback', () => { 
    it("should be able to submit a feedback", async () => {
        await expect(
            submitFeedback.execute({
                type: "BUG",
                comment: "Example comment",
                screenshot: "data:image/png;base64,D2SD2112A32DAdasadDSA2332D"
            })
        ).resolves.not.toThrow();

        expect(createFeedbackSpy).toBeCalledTimes(1);
        expect(sendEmailSpy).toBeCalledTimes(1);
    });
    
    it("should not be able to submit a feedback without type", async () => {
        await expect(
            submitFeedback.execute({
                type: "",
                comment: "Example comment",
                screenshot: "data:image/png;base64,D2SD2112A32DAdasadDSA2332D"
            })
        ).rejects.toThrow();
    });
    
    it("should not be able to submit a feedback without comment", async () => {
        await expect(
            submitFeedback.execute({
                type: "BUG",
                comment: "",
                screenshot: "data:image/png;base64,D2SD2112A32DAdasadDSA2332D"
            })
        ).rejects.toThrow();
    });

    it("should not be able to submit a feedback with an invalid screeshot", async () => {
        await expect(
            submitFeedback.execute({
                type: "BUG",
                comment: "Example comment",
                screenshot: "D2SD2112A32DAdasadDSA2332D"
            })
        ).rejects.toThrow();
    });
});