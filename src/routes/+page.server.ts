import { createTodo, getAllTodos } from "$lib/sever/db/todo";
import type { PageServerLoad } from "./$types";

export const load: PageServerLoad = async () => {
  return {
    todos: await getAllTodos()
  }
}

export const actions = {
  addTodo: async ({ request }) => {
    const { text } = Object.fromEntries(await request.formData()) as { text: string };
    // Add the new todo to the database
    await createTodo({
      id: 0, text, completed: false
    });

    return {
      status: 200,
    }
  }
}