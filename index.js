import express from 'express'


const app = express();
const port = 3000;

app.use(express.json());


export default app.listen(port, function () {
  console.log(`Express server listening on port ${port}.`);
});
