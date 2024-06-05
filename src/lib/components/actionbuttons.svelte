<script lang="ts">
  import { createEventDispatcher } from "svelte";

  const dispatch = createEventDispatcher();

</script>


<div class="w-3/4 mx-auto">
  <hr class="border-black my-7">

  <label class="flex items-center gap-2">
    <button class="grow bg-black text-white p-2 hover:bg-gray-900" on:click={() => dispatch('checkAll')}>Selesaikan Semua</button>
    <button class="grow bg-black text-white p-2 hover:bg-gray-900" on:click={() => dispatch('deleteCompleted')}>Hapus Diselesaikan</button>
  </label>
</div>