import { Router } from "express";

const router = Router();

router.get("/test", (_, res) => {
  res.json({
    success: true,
    message: "API is running "
  });
});

export default router;