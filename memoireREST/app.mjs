import express from "express";
import dotenv from "dotenv";
import { notFound } from "./src/middlewares/notFound.mjs";
import { handleError } from "./src/middlewares/handleErrors.mjs";
import experiencesRoute from "./src/resources/experiences/experiences.routes.mjs";
import cors from 'cors';
dotenv.config();

const app = express();
const port = process.env.PORT || 3000;

const corsOptions = {
  origin: "http://localhost:5173", 
  optionsSuccessStatus: 200,
};

app.use(cors(corsOptions));
app.use(express.json());

app.use("/experience", experiencesRoute);

app.use(notFound);
app.use(handleError);

app.listen(port, () => {
  console.log(`server running on port ${port}`);
});