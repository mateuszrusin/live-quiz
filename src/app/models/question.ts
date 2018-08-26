import {Answer} from './answer';

export interface Question {
    title?: string;
    content?: string;
    answers?: Answer[]
  }
