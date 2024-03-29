import {NextRequest, NextResponse} from "next/server";
import {z} from "zod";
// import prisma from "@/prisma/client";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const taskSchema = z.object({
    title: z.string().min(1).max(255),
    description: z.string().min(1),
    duedate: z.string().min(1).max(255)
})
export async function POST(request: NextRequest) {
    const body = await request.json();
    const validation = taskSchema.safeParse(body);
    if (!validation.success)
        return NextResponse.json(validation.error.errors, { status: 400 });

    const newTask = await prisma.task.create({
        data: {title: body.titlle, description: body.description, duedate: body.duedate}
    });
    return NextResponse.json(newTask, {status: 201});
}