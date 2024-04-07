import cookieParser from "cookie-parser";
import Routes from "./routes/index";
import express from "express";
import cors from "cors";
import knex from "knex";

import "dotenv/config";

const app = express();

knex({
  client: "pg",
  connection: {
    host: process.env.DB_HOST,
    port: Number(process.env.DB_PORT) || 5432,
    database: process.env.DB_NAME,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
  },
});

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
