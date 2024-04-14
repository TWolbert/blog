interface User {
    id: number;
    name: string;
    email: string;
    password: string;
    role: string;
}

interface Blog {
    id: number;
    title: string;
    content: string;
    preview: string,
    views: number,
    image_id: number;
    writer_id: number;
    createdAt: Date;
    updatedAt: Date;
}