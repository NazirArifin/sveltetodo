<script lang="ts">
  export let filter = 'all';
</script>

<div class="flex mx-auto w-3/4 pt-3 gap-2">
  <button class:border-black={filter == 'all'} class:border={filter == 'all'} class:underline={filter == 'all'} class="bg-white p-2 hover:bg-gray-100 w-44 underline" on:click={() => filter = 'all'}>Semua</button>
  <button class:border-black={filter == 'active'} class:border={filter == 'active'} class:underline={filter == 'active'}  class="border-gray-300 border bg-white p-2 hover:bg-gray-100 w-44" on:click="{() => filter = 'active'}">Aktif</button>
  <button class:border-black={filter == 'completed'} class:border={filter == 'completed'} class:underline={filter == 'completed'}  class="border-gray-300 border bg-white p-2 hover:bg-gray-100 w-44" on:click={() => filter = 'completed'}>Selesai</button>
</div>