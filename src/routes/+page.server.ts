import { createTodo, getAllTodos } from "$lib/sever/db/todo";
import { error, fail, redirect } from "@sveltejs/kit";
import type { PageServerLoad } from "./$types";

export const load: PageServerLoad = async () => {
  return {
    todos: await getAllTodos()
  }
}

export const actions = {
  addTodo: async ({ request }) => {
    const data = await request.formData();
    const text = data.get('text') as string;

    if (text.length === 0) {
      return fail(400, {
        message: "Text is required",
        error: true
      });
    }
    
    await createTodo({
      id: 0, text, completed: false
    });
    redirect(303, '/');

    return { success: true }
  }
}