import {Answer} from './answer';
import { QuestionType } from './question-type';

export interface Question {
    id?: string;
    type?: QuestionType.Single | QuestionType.Multi;
    title?: string;
    content?: string;
    created: number;
    answers?: Answer[]
}
