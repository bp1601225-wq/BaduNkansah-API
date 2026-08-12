import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

const authMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction
) => {

  // 1. Get Authorization header
  const authorization = req.headers.authorization;

  // 2. Check if header exists
  if (!authorization) {
    return res.status(401).json({
      message: "Authorization header is missing"
    });
  }

  // 3. Extract token
  const token = authorization.split(" ")[1];

  // 4. Check if token exists
  if (!token) {
    return res.status(401).json({
      message: "Where is your damn token"
    });
  }

  // 5. Verify token
  try {

    const decoded = jwt.verify(
      token,
      process.env.JWT_SECRET!
    );

    // 6. Attach decoded user information to request
    (req as any).user = decoded;

    // 7. Continue to the next middleware/controller
    next();

  } catch (error) {

    return res.status(401).json({
      message: "Invalid or expired token"
    });

  }
};

export default authMiddleware;