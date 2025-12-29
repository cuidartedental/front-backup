<script>
  import { fade, slide } from "svelte/transition";
  import Header from "$lib/components/Header.svelte";
  import FileZone from "$lib/components/FileZone.svelte";
  import Destination from "$lib/components/Destination.svelte";
  import ProgressBar from "$lib/components/ProgressBar.svelte";

  // 1. Estados de la aplicación
  let file = null;
  let destination = "drive";
  let uploading = false;
  let progress = 0;
  let feedback = { message: "", type: "" };

  // 2. URL de la API (Vite la toma de tu .env o de Netlify)
  const BASE_URL = import.meta.env.VITE_API_URL;

  function handleUpload() {
    if (!file) {
      feedback = {
        message: "Selecciona un archivo antes de continuar",
        type: "error",
      };
      return;
    }

    // Reiniciar estados
    uploading = true;
    progress = 0;
    feedback = { message: "", type: "" };

    const formData = new FormData();
    formData.append("file", file);

    // Usamos XMLHttpRequest para rastrear el progreso de subida
    const xhr = new XMLHttpRequest();
    const finalUrl = `${BASE_URL}/${destination}`;

    // Evento de Progreso
    xhr.upload.addEventListener("progress", (event) => {
      if (event.lengthComputable) {
        progress = (event.loaded / event.total) * 100;
      }
    });

    // Evento de Finalización
    xhr.addEventListener("load", () => {
      if (xhr.status >= 200 && xhr.status < 300) {
        feedback = {
          message: `✅ Archivo enviado a ${destination.toUpperCase()} correctamente.`,
          type: "success",
        };
        file = null; // Limpiar archivo seleccionado
      } else {
        let errorMsg = "Error en el servidor";
        try {
          const resp = JSON.parse(xhr.responseText);
          errorMsg = resp.detail || errorMsg;
        } catch (e) {}
        feedback = {
          message: `❌ ${errorMsg} (Status: ${xhr.status})`,
          type: "error",
        };
      }
      uploading = false;
    });

    // Evento de Error (CORS o Red)
    xhr.addEventListener("error", () => {
      feedback = {
        message:
          "❌ Error de conexión o bloqueo de seguridad (CORS). Verifica el Backend.",
        type: "error",
      };
      uploading = false;
    });

    xhr.open("POST", finalUrl);
    xhr.send(formData);
  }
</script>

<div
  class="min-h-screen bg-slate-100 flex items-center justify-center p-4 md:p-6"
>
  <div
    class="bg-white w-full max-w-md rounded-[2.5rem] shadow-2xl p-8 md:p-10 space-y-8 border border-white"
  >
    <Header />

    <div class="space-y-6">
      <FileZone bind:file />

      <Destination bind:selected={destination} />

      {#if uploading}
        <div
          transition:slide
          class="bg-blue-50 p-4 rounded-2xl border border-blue-100"
        >
          <ProgressBar {progress} fileName={file?.name} />
        </div>
      {/if}

      <button
        on:click={handleUpload}
        disabled={uploading || !file}
        class="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-4 rounded-2xl shadow-lg shadow-blue-200 transition-all flex items-center justify-center gap-3 active:scale-95 disabled:bg-gray-300 disabled:shadow-none"
      >
        {#if uploading}
          <span
            class="animate-spin h-5 w-5 border-2 border-white border-t-transparent rounded-full"
          ></span>
          <span>Subiendo... {Math.round(progress)}%</span>
        {:else}
          <span
            >🚀 Iniciar Backup en {destination === "drive"
              ? "Drive"
              : "Telegram"}</span
          >
        {/if}
      </button>

      {#if feedback.message}
        <div
          in:fade
          class="p-4 rounded-xl text-center text-sm font-bold shadow-sm border
                    {feedback.type === 'success'
            ? 'bg-green-50 text-green-600 border-green-100'
            : 'bg-red-50 text-red-600 border-red-100'}"
        >
          {feedback.message}
        </div>
      {/if}
    </div>

    <p
      class="text-center text-[10px] text-gray-400 font-medium uppercase tracking-[0.2em]"
    >
      Sistema de Respaldo Dental
    </p>
  </div>
</div>

<style>
  :global(body) {
    margin: 0;
    font-family: "Inter", sans-serif;
    background-color: #f1f5f9;
  }
</style>
