<script>
  import Header from "$lib/components/Header.svelte";
  import FileZone from "$lib/components/FileZone.svelte";
  import Destination from "$lib/components/Destination.svelte";
  import { fade } from "svelte/transition";

  // 1. Declaración de variables de estado (Esto evita el ReferenceError)
  let file = null;
  let destination = "drive";
  let loading = false;
  let feedback = { message: "", type: "" };

  // 2. Configuración de la API
  // Asegúrate de que esta URL sea la de tu servicio en Render
  const BASE_URL = import.meta.env.VITE_API_URL;

  async function handleUpload() {
    // Validar que haya un archivo seleccionado
    if (!file) {
      feedback = {
        message: "Por favor, selecciona un archivo primero.",
        type: "error",
      };
      return;
    }

    loading = true;
    feedback = { message: "", type: "" };

    // Construcción de la ruta dinámica según la elección del usuario
    const finalUrl = `${BASE_URL}/${destination}`;

    const formData = new FormData();
    formData.append("file", file);

    try {
      const response = await fetch(finalUrl, {
        method: "POST",
        body: formData,
      });

      const data = await response.json();

      if (response.ok) {
        feedback = {
          message: `¡Éxito! Archivo enviado a ${destination.toUpperCase()}.`,
          type: "success",
        };
        file = null; // Limpiar el input después de subir
      } else {
        throw new Error(data.detail || "Error en el servidor");
      }
    } catch (err) {
      feedback = {
        message: `Hubo un problema: ${err.message}`,
        type: "error",
      };
    } finally {
      loading = false;
    }
  }
</script>

<div class="min-h-screen bg-slate-100 flex items-center justify-center p-6">
  <div
    class="bg-white w-full max-w-md rounded-[2.5rem] shadow-2xl p-10 space-y-8 border border-white"
  >
    <Header />

    <div class="space-y-6">
      <FileZone bind:file />

      <Destination bind:selected={destination} />

      <button
        on:click={handleUpload}
        disabled={loading}
        class="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-4 rounded-2xl shadow-lg shadow-blue-200 transition-all flex items-center justify-center gap-3 active:scale-95 disabled:bg-gray-400 disabled:shadow-none"
      >
        {#if loading}
          <span
            class="animate-spin h-5 w-5 border-2 border-white border-t-transparent rounded-full"
          ></span>
          <span>Procesando...</span>
        {:else}
          <span
            >🚀 Subir a {destination === "drive" ? "Drive" : "Telegram"}</span
          >
        {/if}
      </button>

      {#if feedback.message}
        <div
          in:fade
          class="p-4 rounded-xl text-center text-sm font-bold shadow-sm
                    {feedback.type === 'success'
            ? 'bg-green-50 text-green-600 border border-green-100'
            : 'bg-red-50 text-red-600 border border-red-100'}"
        >
          {feedback.message}
        </div>
      {/if}
    </div>

    <p
      class="text-center text-xs text-gray-400 font-medium uppercase tracking-widest"
    >
      Backup System v1.0
    </p>
  </div>
</div>

<style>
  /* Estilos globales rápidos por si Tailwind no carga algo */
  :global(body) {
    margin: 0;
    font-family: "Inter", sans-serif;
  }
</style>
