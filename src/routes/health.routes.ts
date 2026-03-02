import { Router} from "express";

const router = Router();

router.get("/", (req, res) => {
  res.status(200).json({
    status: "success",
    message: "API is healthy",
    timestamp: new Date().toISOString(),
  });
});
console.log("Port is",router)
export default router;


