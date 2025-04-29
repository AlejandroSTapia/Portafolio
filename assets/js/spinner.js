export function showGlobalLoader() {
    const loader = document.getElementById('global-loader');
    if (loader) loader.style.display = 'flex';
  }
  
 export function hideGlobalLoader() {
    const loader = document.getElementById('global-loader');
    if (loader) loader.style.display = 'none';
  }
  