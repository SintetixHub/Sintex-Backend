import Joi from "joi";

const loginSchema = Joi.object({
    username: Joi.string().alphanum().min(3).max(30).required(),
    password: Joi.string().pattern(new RegExp("^(?=.*[a-z])(?=.*[A-Z])(?=.*d).{8,30}$")).required(),
});

const signupSchema = Joi.object({
    username: Joi.string().alphanum().min(3).max(30).required(),
    password: Joi.string().pattern(new RegExp("^(?=.*[a-z])(?=.*[A-Z])(?=.*d).{8,30}$")).required(),
    email: Joi.string().email({ minDomainSegments: 2, tlds: { allow: ["com", "net"] } }).required()
});

const createPost = Joi.object({
    content: Joi.string().required(),
    title: Joi.string().required()
})

const createProject = Joi.object({
    title: Joi.string().required(),
    description: Joi.string().required(),
    hasDoc: Joi.boolean(),
    hasTasksManager: Joi.boolean(),
    membersCount: Joi.number().required(),
    repository: Joi.string(),
})

const useSchema = {
    login: loginSchema,
    signup: signupSchema,
    post: createPost,
    project: createProject
}

export const joiValidation = async (schemaName: "login" | "signup" | "post" | "project", data: any) => {
    try {
        const value = await useSchema[schemaName].validateAsync(data);
        return value
    }
    catch (error: any) {
        return { error: error.name, message: error.message }
    }
}