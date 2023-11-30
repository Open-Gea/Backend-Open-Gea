import { BaseObject, ExtensibleObject } from "../utils/common";

export interface QuestionsAutodiag extends BaseObject {
  question: string;
  category: string;
  required: boolean
}