import cookieParser from "cookie-parser";
import Routes from "./routes/route";
import express from "express";
import cors from "cors";

import "dotenv/config";

const app = express();

const corsOptions = {
  origin: "http://localhost:3000",
  credentials: true,
};

app.use(cors(corsOptions));
app.use(cookieParser());
app.use(express.json());

const PORT = process.env.PORT || 4000;

app.use("/", Routes);

app.listen(PORT, () =>
  console.log(`Server started on http://localhost:${PORT}`)
);

// Check these and knex docs!

// https://gitlab.skillbox.ru/razmik_achikyan/node/-/tree/master/07_timers_pg
// https://github.dev/razachikyan/next-learning-be
