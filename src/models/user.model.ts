import UserSchema from "./user.schema";

const create = async ({ username, password, email }: { username: string, password: string, email: string }) => {
    try {
        return await UserSchema.create({ username, password, email });
    }
    catch (error: any) {
        return { error };

    }
}

const getByName = async ({ username }: { username: string }) => {
    try {
        return await UserSchema.findOne({ username });
    }
    catch (error: any) {
        return { error }
    }
}

const getAll = async () => {
    try {
        return await UserSchema.find();
    }
    catch (error: any) {
        return null
    }
}

const UserModel = { create, getByName, getAll }

export default UserModel;