import express from "express";
import cors from "cors";
import helmet from "helmet";
import cookieParser from "cookie-parser";

import mainRouter from "../routes";

const app = express();

app.use(express.json());
app.use(cors());
app.use(helmet());
app.use(cookieParser());

app.get("/", async (req, res) => {
    res.status(200).send('<h2>Sintex Api -> <a href="/api/doc" taget="_blank">Documentation</a> </h2>')
})

app.use("/api", mainRouter);

app.use((req, res) => {
    res.redirect("/");
});

export default app;