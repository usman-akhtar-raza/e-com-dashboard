import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import mongoose from "mongoose";
import dotenv from "dotenv";
import morgan from "morgan";
import helmet from "helmet";
import clientRoutes from "./routes/client.js";
import generalRoutes from "./routes/general.js";
import managmentRoutes from "./routes/managment.js";
import salesRoutes from "./routes/sales.js";


// data imports 
import User from "./models/user.js"
import {dataUser} from "./data/index.js"
dotenv.config();

const app = express();
app.use(express.json());
app.use(helmet());
app.use(helmet.crossOriginResourcePolicy({ policy: "cross-origin" }));
app.use(morgan("common"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());

// routes
app.use("/client", clientRoutes);
app.use("/general", generalRoutes);
app.use("/managment", managmentRoutes);
app.use("/sales", salesRoutes);

// mongoose setup
const PORT = process.env.PORT || 9000;
mongoose
  .connect(process.env.MONGO_URL)
  .then(() => {
    app.listen(PORT, () => console.log(`Server port : ${PORT}`));
    

// only add data single time
// User.insertMany(dataUser);

  })
  .catch((Error) => console.log(`${Error} did not connect`));