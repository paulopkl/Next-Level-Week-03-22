import { CloseButton } from "../../CloseButton";
import SuccessSVG from "../../../assets/emoji.svg";

interface FeedbackSuccessStepProps {
    onFeedbackRestartRequested: () => void;
}

export function FeedbackSuccessStep({
    onFeedbackRestartRequested,
}: FeedbackSuccessStepProps) {
    return (
        <>
            <header>
                <CloseButton />
            </header>

            <div className="flex flex-col items-center  py-10 w-[304px]">
                <img src={SuccessSVG} alt="Emoji de sucesso" />

                <span className="text-xl mt-2">Agradecemos o feedback!</span>

                <button
                    type="button"
                    className={`
                        py-2 px-6 mt-6 bg-zinc-800 rounded-md border-transparent text-sm leading-6 hover:bg-zinc-700 transition-colors
                        focus:border-brand-500 focus:ring-brand-500 focus:ring-1 resize-none focus:outline-none
                    `}
                    onClick={onFeedbackRestartRequested}
                >
                    Quero enviar outro
                </button>
            </div>
        </>
    );
}
