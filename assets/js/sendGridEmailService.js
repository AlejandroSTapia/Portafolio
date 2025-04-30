import config from '../js/config.js';

export const apiUrlBase = window.location.hostname === '127.0.0.1' ? config.apiUrlBaseDev : config.apiUrlBase;
console.log('apiUrlBase:', apiUrlBase); 

export async function sendContactEmail({ name, email, message }) {
  try {
      const response = await fetch(`${apiUrlBase}api/SendGrid/SendEmail`, {
          method: 'POST',
          headers: {
              'Content-Type': 'application/json'
          },
          body: JSON.stringify({ name, email, message })
      });

      if (!response.ok) {
          throw new Error(`Error: ${response.status} ${response.statusText}`);
      }

      return await response.text(); // o .json() si tu API devuelve un JSON
  } catch (error) {
      console.error('Error sending email:', error);
      throw error;
  }
}