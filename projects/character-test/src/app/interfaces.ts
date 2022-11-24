export interface Question {
    question: string,
    options: {name: string, id: number}[],
}

export interface QuestionRaw {
    question: string,
    options: string[]
}

export interface PollResult {
    id: number,
    phrase: string,
    description: string,
    imagePath: string
}