import { fetchResources } from "/assets/js/apiService.js";
import { showGlobalLoader, hideGlobalLoader } from "/assets/js/spinner.js";

async function cargarImagenes() {
  try {
    const data = await fetchResources();

    if (!data || data.length === 0) {
      console.error("La respuesta de la API está vacía o no es válida.");
      return;
    }

    const resourceMap = Object.fromEntries(data.map(item => [item.name, item.value]));

    const imageMappings = [
      { id: "imgUrl_SC_Welcome", key: "imgUrl_SC_Welcome" },
      { id: "imgUrl_SC_Users", key: "imgUrl_SC_Users" },
      { id: "imgUrl_SC_Categories", key: "imgUrl_SC_Categories" }
    ];

    let imagesLoaded = 0;
    
    for (const { id, key } of imageMappings) {
        const resourceUrl = resourceMap[key];
        if (resourceUrl) {
          const imgElement = document.getElementById(id);
          if (imgElement) {
            imgElement.src = resourceUrl;

            

            imgElement.onload = () => {
              imagesLoaded++;
              if (imagesLoaded === imageMappings.length) {
                console.log("Todas las imágenes cargadas. Inicializando Swiper...");
                if (typeof window.inicializarSwiper === 'function') {
                  window.inicializarSwiper();
                }
              }
            };
          }
        }
      }
    // Si no se cargan imágenes, inicializa Swiper de inmediato
    if (imagesLoaded === 0) {
      console.log("No se cargaron imágenes. Inicializando Swiper...");
      if (typeof window.inicializarSwiper === 'function') {
        window.inicializarSwiper();
      }
    }  
  } catch (error) {
    console.error("Error al cargar los datos de las imágenes:", error);
  }
}

document.addEventListener("DOMContentLoaded", async () => {
  // Esperamos un poco para dar tiempo a que Swiper termine
  setTimeout(cargarImagenes, 500); 
});
