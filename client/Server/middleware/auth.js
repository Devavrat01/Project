import jwt from "jsonwebtoken";

const auth = (req, res, next) => {
  try {
    // Check if the Authorization header is present and contains a token
    const authHeader = req.headers.authorization;

    if (!authHeader) {
      return res.status(403).json({ message: "Authorization token is required" });
    }

    // Extract the token from the Authorization header
    const token = authHeader.split(" ")[1];

    if (!token) {
      return res.status(403).json({ message: "Authorization token is missing" });
    }

    // Verify the token using the secret key
    const decodedData = jwt.verify(token, process.env.JWT_SECRET);

    // Attach the user ID (or other data) to the request object for further processing
    req.userid = decodedData?.id;

    // Continue to the next middleware or route handler
    next();
  } catch (error) {
    // If the token is invalid or expired, return a 400 (Bad Request) error
    res.status(400).json({ message: "Invalid or expired token" });
  }
};

export default auth;
