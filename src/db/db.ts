import { initializeApp } from "firebase/app";
import { getFirestore } from 'firebase/firestore';
import logger from "../logger";

const firebaseConfig = {
  apiKey: "AIzaSyB-1bXt5kFZADVjCLJ1-Onyov8C7JtYkA8",
  authDomain: "artesao-b27ee.firebaseapp.com",
  projectId: "artesao-b27ee",
  storageBucket: "artesao-b27ee.firebasestorage.app",
  messagingSenderId: "74570059277",
  appId: "1:74570059277:web:f5c31a2a653883ebb78f44"
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

