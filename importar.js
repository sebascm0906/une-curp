const admin = require("firebase-admin");
const fs = require("fs");

// Inicializar Firebase con la clave de servicio
const serviceAccount = require("./serviceAccountKey.json");

admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
});

const db = admin.firestore();

// Leer el archivo JSON
const rawData = fs.readFileSync("empleados_firestore.json");
const jsonData = JSON.parse(rawData);

// Función para importar datos a Firestore
async function importarDatos() {
    try {
        const batch = db.batch();
        for (const curp in jsonData) {
            const docRef = db.collection("usuarios").doc(curp);
            batch.set(docRef, jsonData[curp]);
        }
        await batch.commit();
        console.log("Importación completada exitosamente.");
    } catch (error) {
        console.error("Error al importar:", error);
    }
}

// Ejecutar la importación
importarDatos();
