import { CircleNotch } from "phosphor-react";

export function Loading() {
    return (
        <div className="flex items-center justify-center overflow-hidden w-6 h-6">
            <CircleNotch weight="bold" className="w-4 h-4 animate-spin" />
        </div>
    )
}