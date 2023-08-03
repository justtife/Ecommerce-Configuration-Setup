import { Request } from "express";
import { Error } from "../utils";
const notFound = (req: Request) => {
  throw new Error.NotFound(`Route ${req.originalUrl} does not exist`);
};
export default notFound;
