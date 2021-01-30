import questions2 from "../data/questions.json"

export interface Question {
    question: string
    unskippable?: boolean
}

export interface UIQuestion extends Question {
    number: number
}

export const questions: Question[] = questions2
export const uiQuestions: UIQuestion[] = questions.map((x, i) => ({
    ...x,
    number: i + 1,
}))
