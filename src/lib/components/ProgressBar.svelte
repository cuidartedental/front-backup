<script>
  export let progress = 0; // Valor de 0 a 100
  export let fileName = "";
</script>

<div class="w-full space-y-2">
  <div
    class="flex justify-between text-xs font-bold text-gray-500 uppercase tracking-wider"
  >
    <span class="truncate max-w-[200px]"
      >{fileName || "Subiendo archivo..."}</span
    >
    <span>{Math.round(progress)}%</span>
  </div>

  <div
    class="w-full bg-gray-100 rounded-full h-3 overflow-hidden border border-gray-200 shadow-inner"
  >
    <div
      class="bg-blue-600 h-full transition-all duration-300 ease-out shadow-[0_0_10px_rgba(37,99,235,0.5)]"
      style="width: {progress}%"
    ></div>
  </div>
</div>
