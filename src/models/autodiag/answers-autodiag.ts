import { BaseObject, ExtensibleObject } from "../utils/common";
import { Farm } from "../farm/farm";
import { User } from "../user/user";
import { QuestionsAutodiag } from "./questions-autodiag";

export interface AnswersAutodiag extends BaseObject{
  question: QuestionsAutodiag;
  answer: string;
  user: User;
  farm: Farm;
  urls: urls | null;
}

export interface urls {
  filename: string,
  fileBuffer: string
}
