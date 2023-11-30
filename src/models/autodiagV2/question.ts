import { BaseObject } from "../utils/common";
import { CategoryAutodiag } from "./category";

export interface QuestionAutodiagV2 extends BaseObject {
  question: string;
  category?: CategoryAutodiag;
  required: boolean;
  rule: string;
}