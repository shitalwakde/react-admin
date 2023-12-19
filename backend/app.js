import express from 'express';
import mysql from 'mysql'

const app = express();
const port = 3000;

const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'construction_db',
});

db.connect((err) => {
  if (err) {
    console.error('Error connecting to MySQL:', err);
    return;
  }
  console.log('Connected to MySQL');
});

app.use(express.json());

app.post('/saveFormData', (req, res) => {
  const formData = req.body;

  db.query('INSERT INTO company_details SET ?', formData, (err, result) => {
    if (err) {
      console.error('Error saving form data:', err);
      res.status(500).send('Internal Server Error');
      return;
    }

    res.status(200).send('Form data saved successfully');
  });
});

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
