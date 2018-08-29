import {Answer} from './answer';
import { QuestionType } from './question-type';

export interface Question {
    type?: QuestionType.Single | QuestionType.Multi;
    title?: string;
    content?: string;
    answers?: Answer[]
}
