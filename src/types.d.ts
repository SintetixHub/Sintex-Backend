export type ServerResponse = {
    success: boolean;
    message: string;
    data?: any
}

export type Achievements = {
    projectsDone: number;
    postsCreated: number;
    postsLiked: number;
    leadership: number;
    colaborator: number;
    dedication: number;
    creativity: number;
    growth: number;
    compromise: number;
}

export type User = {
    _id: string;
    username: string;
    email: string;
    password: string;
    title: string;
    description: string;
    urlAvatar: string;
    createdAt: string;
    updatedAt: string;
    achievements: Achievements;
    projectsHistory: { name: string, projectId: string }[];
    postsHistory: { title: string, projectId: string }[];
}

export type Post = {
    _id: string;
    author: string;
    content: string;
    rockets: string[];
    createdAt: string;
    updatedAt: string;
}