export type Question = {
    id?: string;
    title: string;
    content: string;
    answers: Array<string>;
    type: number;
    owner?: string;
    date?: Date;
};