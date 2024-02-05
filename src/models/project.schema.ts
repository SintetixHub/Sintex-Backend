import { Schema, model, models } from "mongoose";

const ProjectSchema = new Schema({
    title: { type: String, required: true, unique: true },
    authorName: { type: String, required: true },
    description: { type: String, required: true },
    hasDoc: { type: Boolean, default: false },
    hasTasksManager: { type: Boolean, default: false },
    repository: { type: String },
    membersCount: { type: Number, required: true },
    membersList: { type: [String] },
    membersPending: { type: [String] },
    hasStarted: { type: Boolean, default: false }
});

export default models.Project || model("Project", ProjectSchema);