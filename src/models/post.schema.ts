import { Schema, model, models } from "mongoose";

const PostSchema = new Schema({
    authorId: { type: Schema.Types.ObjectId, ref: "user", required: true },
    authorUsername: { type: String },
    authorAvatar: { type: String },
    title: { type: String, required: true },
    content: { type: String, required: true },
    rockets: { type: [Schema.Types.ObjectId], ref: "user", default: [] },
}, {
    timestamps: true,
    versionKey: false
});

export default models.Post || model("Post", PostSchema);