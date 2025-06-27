import { initializeApp } from "firebase/app";
import { getFirestore } from 'firebase/firestore';
import logger from "../logger";

<<<<<<< HEAD:src/db/db.ts
=======
import dotenv from "dotenv";
dotenv.config();


// Your web app's Firebase configuration
>>>>>>> main:backend/src/db/db.ts
const firebaseConfig = {
  apiKey: process.env.FIREBASE_API_KEY,
  authDomain: process.env.FIREBASE_AUTH_DOMAIN,
  projectId: process.env.FIREBASE_PROJECT_ID,
  storageBucket: process.env.FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.FIREBASE_APP_ID,
};

let app;
let db;

try {
  app = initializeApp(firebaseConfig);
  db = getFirestore(app);
  logger.info("Conexão com o Firebase estabelecida com sucesso.");
} catch (error) {
  logger.error(`Falha ao conectar ao Firebase: ${error.message}`, { stack: error.stack });
  process.exit(1);
}

export default db;

