import { Task } from "@prisma/client";
import prisma from "./client";

export function fetchTasksById(
  id: number,
  title: string,
  description: string,
  duedate: string
): Promise<Task[]> {
  return prisma.task.findMany({
    where: {
      id,
    },
    // data: {
    //   title,
    //   description,
    //   duedate,
    // },
  });
}

export function createTaskById(
  id: number,
  title: string,
  description: string,
  duedate: string
): Promise<Task> {
  return prisma.task.create({
    data: {
      id,
      title,
      description,
      duedate,
    },
  });
}

export function updateTaskById(
  id: number,
  title: string,
  description: string,
  duedate: string
): Promise<Task> {
  return prisma.task.update({
    where: {
      id,
    },
    data: {
      title,
      description,
      duedate,
    },
  });
}

export function deleteTaskById(id: number): Promise<Task> {
  return prisma.task.delete({
    where: {
      id,
    },
  });
}
