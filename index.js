const express = require('express');
const NhiTools = require('./tools/index');
const app = express()
const port = 3000


app.use(express.json());

app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.get('/nhi', async (req, res) => {
  const nhi = new NhiTools();
  res.send({ nhi: nhi.generateNhi()})
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
