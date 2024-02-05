import PostSchema from "./post.schema";

const create = async ({ authorUsername, authorId, authorAvatar, title, content }: { authorUsername: string, authorId: string, authorAvatar?: string, title: string, content: string }) => {
    try {
        return await PostSchema.create({ authorUsername, authorId, title, authorAvatar, content });
    }
    catch (error: any) {
        return { error };
    }
}

const getAll = async () => {
    try {
        return await PostSchema.find();
    }
    catch (error: any) {
        return null
    }
}

const PostModel = { create, getAll };

export default PostModel;