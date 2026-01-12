import { Schema, model, models, Types } from "mongoose";

export interface ITagQuestion {
  tag: Types.ObjectId;
  questions: Types.ObjectId;
}

const TagQuestionSchema = new Schema(
  {
    tag: { type: Schema.Types.ObjectId, required: true, ref: "Tag" },
    questions: { type: Schema.Types.ObjectId, required: true, ref: "Question" },
  },
  { timestamps: true }
);

const TagQuestion = models?.TagQuestion || model<ITagQuestion>("TagQuestion", TagQuestionSchema);

export default TagQuestion;
