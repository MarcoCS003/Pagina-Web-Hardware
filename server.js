import fetch from 'node-fetch';

const apiURL = 'http://localhost/dolibar/dolibarr-20.0.1/dolibarr-20.0.1/htdocs/api/index.php/products';
const apiToken = 'FLvZ0Lzk97vKC2K0Gp42lO3b98EmvcQg';

fetch(apiURL, {
  method: 'GET',
  headers: {
    'DOLAPIKEY': apiToken,
    'Content-Type': 'application/json'
  }
})
.then(response => response.json())
.then(data => {
  console.log(JSON.stringify(data, null, 2)); // Imprime los datos de productos en formato JSON
})
.catch(error => console.error('Error:', error));