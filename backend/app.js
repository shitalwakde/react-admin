import express from 'express';
import db from "./config/database.js";
import companyRoutes from "./routes/company.js";
import cors from "cors";
import bodyParser from "body-parser";


const app = express();
const port = 4000;

// Synchronize models with the database
// db.sync({ force: true }) // Use { alter: true } to create tables if they don't exist
//   .then(() => {
//     console.log('Tables synchronized successfully');
//   })
//   .catch((err) => {
//     console.error('Error synchronizing tables:', err);
//   });


// Test the database connection
db.authenticate()
  .then(() => {
    console.log('Connected to MySQL');
  })
  .catch((err) => {
    console.error('Error connecting to MySQL:', err);
  });

app.use(cors());
app.use(express.json());
app.use(bodyParser.json());
app.use('/uploads', express.static('uploads'));
app.use('/companies', companyRoutes);

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
