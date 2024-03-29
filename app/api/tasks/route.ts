import {NextRequest, NextResponse} from "next/server";
import {z} from "zod";
import prisma from "@/app/database/client";
import {
    fetchTasksById,
    createTaskById,
    updateTaskById,
    deleteTaskById,
} from "@/app/database/task";

const taskSchema = z.object({
    title: z.string().min(1).max(255),
    description: z.string().min(1),
    duedate: z.string().min(1).max(255)
})

//get function using prisma
export async function GET(request: NextRequest) {
    const { id, title, description, duedate } = await request.json();
    const tasks = await fetchTasksById(id, title, description, duedate);
        
    return NextResponse.json(tasks, {status: 201});
}


export async function POST(request: NextRequest) {
    const { id, title, description, duedate } = await request.json();
    const task = await createTaskById(id, title, description, duedate)

    return NextResponse.json(task);
}
    // const validation = taskSchema.safeParse(body);
    // if (!validation.success)
        // return NextResponse.json(validation.error.errors, { status: 400 });

    // const newTask = await prisma.task.create({
    //     data: {title: body.title, description: body.description, duedate: body.duedate}
    // });

    // return NextResponse.json(newTask, {status: 201});

export async function PUT(request: NextRequest) {
    const { id, title, description, duedate } = await request.json();
    const task = await updateTaskById(id, title, description, duedate);

    return NextResponse.json(task);
}   

export async function DELETE(request: NextRequest) {
    const { id } = await request.json();
    const task = await deleteTaskById(id);
    
    return NextResponse.json(task);
}