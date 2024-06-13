import type { Todo } from "$lib/types/todo";
import { getPool } from "./config"

const createTodo = async (todo: Todo) => {
  const pool = getPool();
  try {
    await pool.query("INSERT INTO todos VALUES (NULL, ?, ?)", [todo.text, todo.completed]);
  } catch (error) {
    console.error(error);
    throw error;
  }
};

const getAllTodos = async () => {
  const pool = getPool();
  try {
    const result = await pool.query("SELECT * FROM todos");
    return result.map((row: any) => {
      return {
        id: row.id,
        text: row.text,
        completed: row.completed === 1
      };
    });
  } catch (error) {
    console.error(error);
    throw error;
  }
};

const updateTodo = async (id: number, todo: Todo) => {
  const pool = getPool();
  try {
    await pool.query("UPDATE todos SET text = ?, completed = ? WHERE id = ?", [todo.text, todo.completed  ?  1 : 0, id]);
  } catch (error) {
    console.error(error);
    throw error;
  }
};

const deleteTodo = async (id: number) => {
  const pool = getPool();
  try {
    await pool.query("DELETE FROM todos WHERE id = ?", [id]);
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export { createTodo, getAllTodos, updateTodo, deleteTodo };