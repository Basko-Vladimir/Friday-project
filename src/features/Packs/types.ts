
export type PackItemType = {
    cardsCount: number
    deckCover: string
    grade: number
    name: string
    path: string
    private: boolean
    user_id: string
    user_name: string
    _id: string
}

export type PacksType = {
    cardPacks: Array<PackItemType>
    cardPacksTotalCount: number
    page: number
    pageCount: number
    token: string
}