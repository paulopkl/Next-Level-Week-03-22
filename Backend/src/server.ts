import express from "express";
import routes from "./routes";
import cors from "cors";

const app = express();

app.use(cors({ origin: process.env.CORS_ORIGIN_URL }));
app.use(express.json());
app.use(routes);

const port = process.env.PORT || 3333;
app.listen(port, () => {
    console.log("App is running on port:", port);
});
