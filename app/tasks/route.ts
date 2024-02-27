import { NextRequest, NextResponse } from "next/server";
import {z} from 'zod';
import prisma from "@/prisma/client";

const createTaskSchema = z.object({
    title: z.string().min(1).max(255),
    decription: z.string().min(1),
    duedate: z.string().min(1).max(255)
});

export async function Post(request: NextRequest){
    const body = await request.json();
    const validation = createTaskSchema.safeParse(body);
    if (!validation.success)
        return NextResponse.json(validation.error.errors, {status: 400})

    const newTask = await prisma.task.create({
        data: {title: body.title, description: body.description, duedate: body.duedate}
    })
return NextResponse.json(newTask, {status: 201})
}

// export default Post;