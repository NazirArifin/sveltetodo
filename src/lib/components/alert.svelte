<script lang="ts">
  import { alert } from '../../stores';
  import { fly } from 'svelte/transition';

  let showing = false;
  $: {
    if ($alert) {
      showing = true;
      setTimeout(() => {
        showing = false;
        alert.set('');
      }, 3000);
    }
  }
</script>

{#if showing}
<button transition:fly="{{delay: 250, duration: 300, x: 0, y: -100, opacity: 0.5}}" type="button" class="fixed top-4 right-4 flex items-center rounded bg-[#565656] text-white font-semibold px-4 py-2 opacity-90 gap-2">
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-shield-alert"><path d="M20 13c0 5-3.5 7.5-7.66 8.95a1 1 0 0 1-.67-.01C7.5 20.5 4 18 4 13V6a1 1 0 0 1 1-1c2 0 4.5-1.2 6.24-2.72a1.17 1.17 0 0 1 1.52 0C14.51 3.81 17 5 19 5a1 1 0 0 1 1 1z"/><path d="M12 8v4"/><path d="M12 16h.01"/></svg> <p>{$alert}</p>
</button>
{/if}