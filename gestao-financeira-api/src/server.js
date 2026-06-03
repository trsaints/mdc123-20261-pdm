// src/server.js
import "dotenv/config";
import express from "express";
import cors from "cors";
import categoriesRouter from "./routes/categories.js";
import transactionsRouter from "./routes/transactions.js";
import summaryRouter from "./routes/summary.js";
import { errorHandler } from "./middlewares/errorHandler.js";

const app = express();

const corsOptions = {
  origin: process.env.FRONTEND_URL,
  optionsSuccessStatus: 200 // Some legacy browsers choke on 204
};

app.use(cors(corsOptions));
app.use(express.json());

app.get("/", (req, res) => res.json({ ok: true, name: "gestao-financeira-api" }));

app.use("/categories", categoriesRouter);
app.use("/transactions", transactionsRouter);
app.use("/summary", summaryRouter);

app.use(errorHandler);

const port = process.env.PORT ?? 3000;
app.listen(port, () => {
	console.log(`API rodando em http://localhost:${port}`);
});