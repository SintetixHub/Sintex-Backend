import ProjectSchema from "./project.schema";

const create = async ({
    title,
    authorName,
    description,
    hasDoc,
    hasTasksManager,
    repository,
    membersCount,
}: {
    title: string;
    authorName: string;
    description: string;
    hasDoc?: boolean;
    hasTasksManager?: boolean;
    repository?: string;
    membersCount: number;
}) => {
    try {
        return await ProjectSchema.create({
            title,
            authorName,
            description,
            hasDoc,
            hasTasksManager,
            repository,
            membersCount,
            membersList: [authorName]
        });
    } catch (error: any) {
        return { error };
    }
};

const getAll = async () => {
    try {
        return await ProjectSchema.find();
    } catch (error: any) {
        return null;
    }
};

const getByTitle = async ({ title }: { title: string }) => {
    try {
        return await ProjectSchema.findOne({ title });
    } catch (error: any) {
        return { error };
    }
};

const ProjectModel = { create, getAll, getByTitle };
export default ProjectModel;