import dotenv from "dotenv"
import  express  from "express";
import { connectDb } from "./config/db";
import authRoutes from "./routes/auth.routes"
import userRoutes from "./routes/user.routes"
import healthRoutes from "./routes/health.routes"
import cors from "cors"

dotenv.config();
connectDb();

const PORT =Number( process.env.PORT || 5000);

const app = express();
app.use(
  cors({
    origin:["https://transcendent-frangollo-4b6ddc.netlify.app"],
    credentials:true,
  })
);
app.use(express.json());
app.use(express.urlencoded({ extended: true }))


app.use("/api/health", healthRoutes);
app.use("/api/auth",authRoutes);
app.use("/api/users",userRoutes);


app.listen(process.env.PORT,()=>{
    console.log(`port is runnig${process.env.PORT}`);
});


