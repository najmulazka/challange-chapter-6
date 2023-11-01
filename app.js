require('dotenv').config();
const express = require('express');
const app = express();
const morgan = require('morgan');
const { PORT } = process.env;
const router = require('./routes/arts.routes');

app.use(express.json());
app.use(morgan('dev'));
app.get('/', (req, res) => {
  return res.json({
    status: true,
    messages: 'WELCOME TO ARTS',
    err: null,
    data: null,
  });
});
app.use('/api/v1', router);

app.listen(PORT, () => console.log(`Listening on port ${PORT}`));
