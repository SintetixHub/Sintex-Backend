import PostSchema from "./post.schema";

const create = async ({ author, content }: { author: string, content: string }) => {
    try {
        return await PostSchema.create({ author, content });
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