import { BaseObject } from "../utils/common";
import { Farm, urls } from "../farm/farm";
import { CategoryAutodiag } from "./category";
import { QuestionAutodiagV2 } from "./question";


export interface AnswerAutodiagV2 extends BaseObject {
  question: QuestionAutodiagV2;
  farmId: Farm;
  answer: string;
  urls: urls[] | null;
}

export interface CategoryAnswer{
    category: CategoryAutodiag;
    questionsAndAnswers: QuestionAndAnswer[];
    minCompletedPercentage: number;
    desirableCompletedPercentage: number
}

export interface QuestionAndAnswer{
    question: {id: string, question: string, required: boolean};
    answer?: {id: string, answer: string, urls: urls[] | null};
    completed: boolean;
}