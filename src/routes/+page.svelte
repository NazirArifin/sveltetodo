<script lang="ts">
  
  let todos: {
    id: number;
    text: string;
    completed: boolean;
  }[] = [
    { id: 1, text: 'Buat starter app dengan Svelte', completed: true },
    { id: 2, text: 'Buat component pertama kali', completed: true },
    { id: 3, text: 'Selesaikan semua tutorial', completed: false },
  ];
  $: totalTodos = todos.length;
  $: completedTodos = todos.filter(todo => todo.completed).length;

  function hapusTodo(id: number) {
    todos = todos.filter(todo => todo.id !== id);
  }

  let text = '';
  function tambahTodo() {
    if (text.trim() === '') return;

    todos = [
      ...todos,
      {
        id: todos.length + 1,
        text,
        completed: false
      }
    ];

    text = '';
  }

  let sedangMengedit = false;
  let todoId = 0;
  function editTodo(id: number) {
    sedangMengedit = true;
    todoId = id;
    text = todos.find(todo => todo.id === id)!.text;
  }
  function simpanTodo() {
    const todo = todos.find(todo => todo.id === todoId);
    const index = todos.findIndex(todo => todo.id === todoId);
    if (todo) {
      todo.text = text;
    }
    const tempTodos = [...todos];
    tempTodos[index] = todo!;
    todos = tempTodos;

    sedangMengedit = false;
    text = '';
  }

</script>

<main class="container p-7 bg-gray-100 shadow-lg mx-auto my-5">

  <h1 class="text-center text-2xl text-gray-600">Apa yang harus dikerjakan?</h1>
  <input type="text" bind:value={text} class="border-black border-2 mt-7 w-full py-5">
  
  {#if !sedangMengedit}
  <button class="w-full bg-slate-800 text-gray-400 mt-2 py-3 hover:bg-slate-950" on:click={() => tambahTodo()}>Tambah</button>
  {:else}
  <button class="w-full bg-blue-800 text-gray-400 mt-2 py-3 hover:bg-slate-950" on:click={() => simpanTodo()}>Simpan</button>
  {/if}

  <!-- tombol filter -->
  <div class="flex mx-auto w-3/4 pt-3 gap-2">
    <button class="border-black border bg-white p-2 hover:bg-gray-100 w-44 underline">Semua</button>
    <button class="border-gray-300 border bg-white p-2 hover:bg-gray-100 w-44">Aktif</button>
    <button class="border-gray-300 border bg-white p-2 hover:bg-gray-100 w-44">Selesai</button>
  </div>

  <div class="w-3/4 mx-auto pt-5">
    <h2 class="font-semibold text-3xl">{completedTodos} dari {totalTodos} hal diselesaikan</h2>
  </div>

  <!-- item todo  -->
  <ul>
    {#each todos as todo, index(todo.id)}
    <li class="w-3/4 mx-auto pt-5">
      <button class="flex items-center" on:click={() => todo.completed = !todo.completed}>
        <input type="checkbox" class="hidden peer" checked={todo.completed}>
        <span class="w-10 h-10 border-2 cursor-pointer bg-white border-gray-600 *:peer-checked:text-gray-600">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="text-white">
            <path d="M20 6 9 17l-5-5"/>
          </svg>
        </span>
        <span class="ml-2 text-base font-semibold text-gray-600">{todo.text}</span>
      </button>

      <div class="flex gap-2 mt-3">
        <button on:click={() => editTodo(todo.id)} class="border-black border grow bg-white p-2 hover:bg-gray-100">Edit</button>
        <button on:click={() => hapusTodo(todo.id)} class="border-black border grow bg-red-900 text-white p-2 hover:bg-red-800">Hapus</button>
      </div>
    </li>

    {:else}
    <p class="text-center text-red-600 font-semibold text-3xl mt-5">Tidak ada data</p>

    {/each}
  </ul>

  <!-- tombol aksi  -->
  <div class="w-3/4 mx-auto">
    <hr class="border-black my-7">

    <label class="flex items-center gap-2">
      <button class="grow bg-black text-white p-2 hover:bg-gray-900">Pilih Semua</button>
      <button class="grow bg-black text-white p-2 hover:bg-gray-900">Hapus Terpilih</button>
    </label>
  </div>

</main>