require('dotenv').config();
const express = require('express');
const app = express();
const morgan = require('morgan');
const { PORT } = process.env;
const router = require('./routes/arts.routes');

app.use(express.json());
app.use(morgan('dev'));
app.use('/api/v1', router);
app.use('/', (req, res) => {
    return res.status(200).json({
      status: true,
      message: 'WELCOME TO RAILWAY APP FROM NAJMUL AZKA',
      err: null,
      data: null,
    });
  });
  
app.listen(PORT, () => console.log(`Listening on port ${PORT}`));
