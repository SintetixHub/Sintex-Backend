import { Schema, model, models } from "mongoose";

const PostSchema = new Schema({
    author: { type: Schema.Types.ObjectId, ref: "user", required: true },
    content: { type: String, required: true },
    rockets: { type: [Schema.Types.ObjectId], ref: "user", default: [] },
});

export default models.Post || model("Post", PostSchema);