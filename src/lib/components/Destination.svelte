<script>
  // Usamos 'export let' para que el componente padre (App.svelte)
  // pueda leer y modificar esta variable
  export let selected = "drive";

  const options = [
    { id: "drive", label: "Google Drive", icon: "☁️" },
    { id: "telegram", label: "Telegram Bot", icon: "✈️" },
  ];
</script>

<div class="space-y-3">
  <label class="block text-sm font-bold text-gray-700 ml-1">
    Elegir destino de copia:
  </label>

  <div class="grid grid-cols-2 gap-4">
    {#each options as option}
      <button
        type="button"
        on:click={() => (selected = option.id)}
        class="flex flex-col items-center justify-center p-4 rounded-2xl border-2 transition-all duration-200
                {selected === option.id
          ? 'border-blue-500 bg-blue-50 text-blue-700 shadow-md ring-2 ring-blue-500/20'
          : 'border-gray-100 bg-white text-gray-400 hover:border-gray-200 hover:bg-gray-50'}"
      >
        <span class="text-2xl mb-1">{option.icon}</span>
        <span class="text-xs font-bold uppercase tracking-wider"
          >{option.label}</span
        >

        {#if selected === option.id}
          <div
            class="absolute -top-2 -right-2 bg-blue-500 text-white rounded-full p-1 shadow-sm"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="12"
              height="12"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="3"
              stroke-linecap="round"
              stroke-linejoin="round"><polyline points="20 6 9 17 4 12" /></svg
            >
          </div>
        {/if}
      </button>
    {/each}
  </div>
</div>

<style>
  button {
    position: relative;
  }
</style>
