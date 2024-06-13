<script lang="ts">
  import type { Todo } from "$lib/types/todo";
  import { createEventDispatcher } from "svelte";
  
  export let todo: Todo;
  const dispatch = createEventDispatcher();

</script>

<li class="w-3/4 mx-auto pt-5">
  <button class="flex items-center" on:click={() => dispatch('completed', todo.id)}>
    <input type="checkbox" class="hidden peer" checked={todo.completed}>
    <span class="w-10 h-10 border-2 cursor-pointer bg-white border-gray-600 *:peer-checked:text-gray-600">
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="text-white">
        <path d="M20 6 9 17l-5-5"/>
      </svg>
    </span>
    <span class="ml-2 text-base font-semibold text-gray-600">{todo.text}</span>
  </button>

  <div class="flex gap-2 mt-3">
    <button on:click={() => dispatch('edit', todo.id)} class="border-black border grow bg-white p-2 hover:bg-gray-100">Edit</button>

    <form method="post" action="?/deleteTodo">
      <input type="hidden" name="id" value="{todo.id}">
      <button class="border-black border grow bg-red-900 text-white p-2 hover:bg-red-800">Hapus</button>
    </form>
  </div>
</li>