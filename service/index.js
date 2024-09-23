import express from 'express'
import dotenv from 'dotenv';
import cors from 'cors';
import init from './app/app.js';

dotenv.config();

const app = express();
const port = process.env.PORT;
init(app);

app.get("/", (req, res) => res.send("Express on Vercel"));

app.listen(port, (req, res, next) => {
  app.use(cors());
  console.log(`server running at port ${port}`);
});

export default app