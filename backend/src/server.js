const path = require('path');
require('dotenv').config({
  path: path.resolve(__dirname, '../.env'),
  override: true
});

const app = require('./app');

const PORT = process.env.PORT || 3000;

//Test
console.log('Loaded app from:', require.resolve('./app'));


app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
