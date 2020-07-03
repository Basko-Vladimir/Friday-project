
export type ForgotSuccessType = {
    html: string
    info: {
        accepted: Array<string>
        envelope: {
            from: string
            to: Array<string>
        }
        envelopeTime: number
        messageId: string
        messageSize: number
        messageTime: number
        rejected: Array<any>
        response: string
    }
    status: string
    success: boolean
};

