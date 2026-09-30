// ./index.js

const args = process.argv.slice(2);
const [metodo, endpoint, ...restArgs] = args;

const API_URL = "https://fakestoreapi.com";

async function gestionarProductos() {
    // Verificamos que el usuario haya enviado los argumentos mínimos
    if (!metodo || !endpoint) {
        console.log("Faltan parámetros. Recuerda usar la sintaxis: npm run start <METODO> <endpoint>");
        return;
    }

    try {
        let response;
        let data;

        // Consultar Todos los Productos o un Producto Específico
        if (metodo === 'GET') {
            response = await fetch(`${API_URL}/${endpoint}`);
            data = await response.json();
            console.log("📦 Datos obtenidos:\n", data);
        }

        // Crear un Producto Nuevo
        else if (metodo === 'POST' && endpoint === 'products') {
            // Desestructuramos el resto de los argumentos
            const [title, price, category] = restArgs;

            response = await fetch(`${API_URL}/products`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    title: title,
                    price: parseFloat(price), // Convertimos el string del precio a número
                                     description: 'Descripción de prueba para el producto',
                                     image: 'https://fakestoreapi.com/img/placeholder.jpg',
                                     category: category
                })
            });
            data = await response.json();
            console.log("✅ Producto creado exitosamente:\n", data);
        }

        // Eliminar un Producto
        else if (metodo === 'DELETE') {
            response = await fetch(`${API_URL}/${endpoint}`, {
                method: 'DELETE'
            });
            data = await response.json();
            console.log("🗑️ Producto eliminado:\n", data);
        }

        else {
            console.log("⚠️ Comando no reconocido. Verifica el método y el endpoint.");
        }

    } catch (error) {
        console.error("❌ Ocurrió un error al conectar con la API:", error.message);
    }
}

gestionarProductos();
