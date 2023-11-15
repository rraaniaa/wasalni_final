import express from 'express';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
import participationRoutes from './routes/participationRoutes';
import fs from 'fs';


function connectToEureka() {
  
  fs.readFile('eureka-config.json', 'utf8', (err, data) => {
    if (err) {
      console.error('Erreur de lecture du fichier de configuration :', err);
     
      return;
    }

    try {
      const config = JSON.parse(data);
      const Eureka = require('eureka-js-client').Eureka;
      const eureka = new Eureka(config.eureka);

      eureka.start((error: any) => {
        if (error) {
          console.log("Erreur lors de l'enregistrement auprès d'Eureka : " + error);
        } else {
          console.log("Microservice enregistré auprès d'Eureka");
        }
      });
    } catch (parseError) {
      console.error('Erreur d\'analyse du fichier JSON :', parseError);
      process.exit(1);
    }
  });
}

const app = express();
const PORT = process.env.PORT || 3002;

app.use(bodyParser.json());


mongoose.connect('mongodb://127.0.0.1:27017/participations')
  .then(() => {
    console.log('Connected to the MongoDB database');
  })
  .catch(err => {
    console.error('Database connection error:', err);
    process.exit(1);
  });

connectToEureka();

app.use('/', participationRoutes);

app.listen(PORT, () => {
  console.log(`Server is listening on port ${PORT}`);
});
