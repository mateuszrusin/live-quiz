import {Question} from './question';

export interface Quiz {
    id?: string;
    title?: string;
    created?: number;
    modified?: number;
    questions?: Question[];
  }
