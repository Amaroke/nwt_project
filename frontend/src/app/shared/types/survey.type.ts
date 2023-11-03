export type Survey = {
    id?: string;
    title: string;
    description: string;
    questions: Array<string>;
    owner?: string;
    date?: Date;
};