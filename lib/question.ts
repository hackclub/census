export interface Question {
    question: string
    unskippable?: boolean
}

export interface UIQuestion extends Question {
    number: number
}
