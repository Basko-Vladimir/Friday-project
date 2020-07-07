export type CardItemType = {
    answer: string
    cardsPack_id: string
    created: string
    grade: number
    question: string
    rating: number
    shots: number
    type: string
    updated: string
    user_id: string
    __v: number
    _id: string
}

export type CardsType = {
    cards: Array<CardItemType>
    cardsTotalCount: number
    maxGrade: number
    minGrade: number
    page: number
    pageCount: number
    token: string
    tokenDeathTime: number
}
export type NewCardType = {
    newCard: CardItemType
    success: boolean
    token: string
    tokenDeathTime: number
}

export type UpdatedCardType = {
    updatedCard: CardItemType
    success: boolean
    token: string
    tokenDeathTime: number
}

export type DeletedCardType = {
    deletedCard: CardItemType
    success: boolean
    token: string
    tokenDeathTime: number
}

