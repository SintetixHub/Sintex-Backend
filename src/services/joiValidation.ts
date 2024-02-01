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

const useSchema = {
    login: loginSchema,
    signup: signupSchema
}

export const joiValidation = async (schemaName: "login" | "signup", data: any) => {
    try {
        const value = await useSchema[schemaName].validateAsync(data);
        return value
    }
    catch (error: any) {
        return { error: error.name, message: error.message }
    }
}