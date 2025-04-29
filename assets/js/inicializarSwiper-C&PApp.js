import { fetchResources } from "/assets/js/apiService.js";

async function cargarImagenes() {
  try {
    const data = await fetchResources();

    if (!data || data.length === 0) {
      console.error("La respuesta de la API está vacía o no es válida.");
      return;
    }

    // Buscar el objeto con imágenes en el JSON
    const jsonData = data.find(item => item.name === "c&pApp_Images");
    if (!jsonData) {
      console.error("No se encontraron imágenes en la API.");
      return;
    }

    const imageData = JSON.parse(jsonData.value); // Convertir JSON string a objeto

    let imagesLoaded = 0;
    const existingMappings = imageData.filter(({ imgName }) => document.getElementById(imgName));

    imageData.forEach(({ imgName, imgUrl }) => {
      const imgElement = document.getElementById(imgName);
      const spinnerElement = document.getElementById("spinner_" + imgName); // Spinner asociado a cada imagen

      if (imgElement) {
        imgElement.src = imgUrl;

        imgElement.onload = () => {
          imagesLoaded++;

          if (spinnerElement) spinnerElement.style.display = "none"; // Ocultar spinner
          imgElement.style.display = "block"; // Mostrar imagen

          // Si todas las imágenes se han cargado, inicializar Swiper
          if (imagesLoaded === existingMappings.length) {
            console.log("Todas las imágenes cargadas. Inicializando Swiper...");
            if (typeof window.inicializarSwiper === 'function') {
              window.inicializarSwiper();
            }
          }
        };
      }
    });

    // Si no hay imágenes visibles, inicializar Swiper de inmediato
    if (existingMappings.length === 0) {
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
  // Retraso para dar tiempo al cargado de Swiper y los elementos
  setTimeout(cargarImagenes, 500);
});
