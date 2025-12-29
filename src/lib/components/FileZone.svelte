<script>
  export let file;
</script>

<div
  class="group relative border-2 border-dashed border-gray-300 rounded-2xl p-8 transition-all hover:border-blue-500 hover:bg-blue-50/50"
>
  <input
    type="file"
    on:change={(e) => (file = e.target.files[0])}
    class="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
  />
  <div class="flex flex-col items-center">
    <div class="text-blue-500 mb-2 group-hover:scale-110 transition-transform">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="32"
        height="32"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        stroke-width="2"
        stroke-linecap="round"
        stroke-linejoin="round"
        ><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" /><polyline
          points="17 8 12 3 7 8"
        /><line x1="12" x2="12" y1="3" y2="15" /></svg
      >
    </div>
    <p class="text-sm font-semibold text-gray-700">
      {file ? file.name : "Seleccionar archivo"}
    </p>
    <p class="text-xs text-gray-400 mt-1"></p>
  </div>
</div>
