import {Answer} from './answer';

export interface Question {
    type?: 'single' | 'multi';
    title?: string;
    content?: string;
    answers?: Answer[]
  }
