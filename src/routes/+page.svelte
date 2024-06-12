<script lang="ts">
  import Actionbuttons from "$lib/components/actionbuttons.svelte";
  import { alert, todos } from "../stores";
  import Alert from "$lib/components/alert.svelte";
  import Filterbuttons from "$lib/components/filterbuttons.svelte";
  import Todoitem from "$lib/components/todoitem.svelte";
  import type { Todo } from "$lib/types/todo";
  import type { PageData } from "./$types";
  import { enhance } from "$app/forms";

  export let data: PageData;

  $todos = data.todos;
  $: totalTodos = $todos.length;
  $: completedTodos = $todos.filter(todo => todo.completed).length;

  function hapusTodo(id: number) {
    $todos = $todos.filter(todo => todo.id !== id);
    $alert = 'Todo has been deleted';
  }

  let text = '';
  let sedangMengedit = false;
  let todoId = 0;
  function editTodo(id: number) {
    sedangMengedit = true;
    todoId = id;
    text = $todos.find(todo => todo.id === id)!.text;
  }

  function changeCompleted(id: number) {
    const todo = $todos.find(todo => todo.id === id);
    const index = $todos.findIndex(todo => todo.id === id);
    if (todo) {
      todo.completed = !todo.completed;
    }
    const tempTodos = [...$todos];
    tempTodos[index] = todo!;
    $todos = tempTodos;
  }

  let filter = 'all';
  function filterTodos(filter: string, todos: Todo[]): Todo[] {
    if (filter === 'active') return todos.filter(todo => !todo.completed);
    if (filter === 'completed') return todos.filter(todo => todo.completed);
    return todos;
  }

  function checkAll() {
    $todos = $todos.map(todo => ({ ...todo, completed: true }));
  }

  function deleteAll() {
    $todos = $todos.filter(todo => !todo.completed);
  }

</script>

<main class="container p-7 bg-gray-100 shadow-lg mx-auto my-5">
  <Alert />
  
  <h1 class="text-center text-2xl text-gray-600">Apa yang harus dikerjakan?</h1>
  
  <form method="post" action="?/addTodo" use:enhance>
    <input type="text" name="text" bind:value={text} class="border-black border-2 mt-7 w-full py-5">
    
    {#if !sedangMengedit}
    <button class="w-full bg-slate-800 text-gray-400 mt-2 py-3 hover:bg-slate-950" type="submit">Tambah</button>
    {:else}
    <div class="flex gap-2">
      <button class="w-full bg-blue-800 text-gray-400 mt-2 py-3 hover:bg-slate-950" type="submit">Simpan</button>
      <button class="w-full bg-red-800 text-gray-400 mt-2 py-3 hover:bg-slate-950" on:click={() => {
        sedangMengedit = false;
        text = '';
      }}>Batal</button>
    </div>
    {/if}
  </form>

  <!-- tombol filter -->
  <Filterbuttons bind:filter />

  <div class="w-3/4 mx-auto pt-5">
    <h2 class="font-semibold text-3xl">{completedTodos} dari {totalTodos} hal diselesaikan</h2>
  </div>

  <!-- item todo  -->
  <ul>
    {#each filterTodos(filter, $todos) as todo, index(todo.id)}
    
    <Todoitem {todo} on:delete={(e) => hapusTodo(e.detail)} on:edit={(e) => editTodo(e.detail)} on:completed={(e) => changeCompleted(e.detail)} />

    {:else}
    <p class="text-center text-red-600 font-semibold text-3xl mt-5">Tidak ada data</p>

    {/each}
  </ul>

  <!-- tombol aksi  -->
  <Actionbuttons on:checkAll={() => checkAll()} on:deleteCompleted={() => deleteAll()} />

</main>