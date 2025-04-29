import config from '../js/config.js';

// 127.0.0.1 es de live server
export const apiUrlBase = window.location.hostname === '127.0.0.1' ? config.apiUrlBaseDev : config.apiUrlBase;

console.log('apiUrlBase:', apiUrlBase); // Verificar la URL base

export async function fetchResources() {
    console.log('fetchPortfolio called'); // Verificar que se llama a la función
    try {
        const response = await fetch(`${apiUrlBase}api/Resource/GetResources`);
        console.log('fetch response:', response); // Verificar la respuesta del fetch
        if (!response.ok) {
            throw new Error(`Error: ${response.status} ${response.statusText}`);
        }
        const data = await response.json();
        console.log('fetch data:', data); // Verificar los datos recibidos
        return data;
    } catch (error) {
        console.error("Error fetching portfolio:", error);
        throw error;
    }
}
