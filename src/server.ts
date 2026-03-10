import dotenv from "dotenv"
import  express  from "express";
import { connectDb } from "./config/db";
import authRoutes from "./routes/auth.routes"
import userRoutes from "./routes/user.routes"
import healthRoutes from "./routes/health.routes"
import cors from "cors"


dotenv.config();

connectDb();

const PORT =Number(process.env.PORT || 5000);

const app = express();

const allowedOrigins = [
  'http://localhost:5173',
  'https://transcendent-frangollo-4b6ddc.netlify.app'
];

app.use(
  cors({
    origin:allowedOrigins,
    methods:['POST','GET','PUT','DELETE'],
    credentials:true,
  })
);
app.use(express.json());

app.use("/api/health", healthRoutes);
app.use("/api/auth",authRoutes);
app.use("/api/users",userRoutes);


app.listen(PORT,()=>{
    console.log(`port is runnig${PORT}`);
});
