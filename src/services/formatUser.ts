import { User } from "../types";

export const formatUser = (user: User) => {
    return {
        id: user._id,
        username: user.username,
        email: user.email,
        urlAvatar: user.urlAvatar,
        createdAt: user.createdAt,
        updatedAt: user.updatedAt,
        achievements: user.achievements,
        projectsHistory: user.projectsHistory,
        postsHistory: user.postsHistory
    }
}