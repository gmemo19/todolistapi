const express = require('express');
const cors = require('cors');
const apiRouter = require('./src/api/todolistapi');
const { startDbConnection } = require('./src/database/database');



const app = express();
app.use(express.json());
app.use(cors());
const PORT = process.env.PORT || 8000;

app.use('/api', apiRouter);
startDbConnection();
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});



