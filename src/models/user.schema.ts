import { Schema, model, models, CallbackWithoutResultAndOptionalError, Document } from "mongoose";
import { hash, compare } from "bcrypt";
import { Achievements, User } from "../types";

const AchievementsSchema = new Schema({
    projectsDone: { type: Number },
    postsCreated: { type: Number },
    postsLiked: { type: Number },
    leadership: { type: Number },
    colaborator: { type: Number },
    dedication: { type: Number },
    creativity: { type: Number },
    growth: { type: Number },
    compromise: { type: Number },
}, {
    _id: false
}
);

const ProjectsHistorySchema = new Schema({
    name: { type: String, required: true },
    projectId: { type: [Schema.Types.ObjectId], ref: "project" }
})

const PostsHistorySchema = new Schema({
    title: { type: String, required: true },
    postId: { type: [Schema.Types.ObjectId], ref: "post" }
})

interface UserSchemaMethod extends Document {
    _id: string;
    username: string;
    email: string;
    password: string;
    urlAvatar: string;
    title: string;
    description: string;
    createdAt: string;
    updatedAt: string;
    achievements: Achievements;
    projectsHistory: { name: string, projectId: string }[];
    postsHistory: { title: string, projectId: string }[];
    isValidPassword: (pass: string) => boolean
}

const UserSchema = new Schema<UserSchemaMethod>({
    username: { type: String, required: true, unique: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    urlAvatar: { type: String },
    title: { type: String },
    description: { type: String },
    achievements: { type: AchievementsSchema, default: { projectsDone: 0, postsCreated: 0, postsLiked: 0, leadership: 0, colaborator: 0, dedication: 0, creativity: 0, growth: 0, compromise: 0 } },
    projectsHistory: { type: [ProjectsHistorySchema], default: [] },
    postsHistory: { type: [PostsHistorySchema], default: [] }
}, {
    timestamps: true
});

UserSchema.pre("save", async function (next: CallbackWithoutResultAndOptionalError) {
    this.password = await hash(this.password, 10);
    next();
});

UserSchema.methods.isValidPassword = async function (password: string) {
    const comp = await compare(password, this.password);
    return comp;
}

export default models.User || model('User', UserSchema);

