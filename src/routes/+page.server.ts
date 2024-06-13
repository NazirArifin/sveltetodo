import { createTodo, deleteTodo, getAllTodos, updateTodo } from "$lib/sever/db/todo";
import { fail, redirect } from "@sveltejs/kit";
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
  },

  deleteTodo: async ({ request }) => {
    const data = await request.formData();
    const id = Number(data.get('id'));

    if (isNaN(id)) {
      return fail(400, {
        message: "ID is required",
        error: true
      });
    }

    // Delete todo
    await deleteTodo(id);
    redirect(303, '/');

    return { success: true }
  },

  editTodo: async ({ request }) => {
    const data = await request.formData();
    const id = Number(data.get('id'));
    const text = data.get('text') as string;
    const completed = data.get('completed') as string === '1';

    if (isNaN(id)) {
      return fail(400, {
        message: "ID is required",
        error: true
      });
    }

    if (text.length === 0) {
      return fail(400, {
        message: "Text is required",
        error: true
      });
    }

    // Edit todo
    await updateTodo(id, { id, text, completed });
    redirect(303, '/');

    return { success: true }
  }
}