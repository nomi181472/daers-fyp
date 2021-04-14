import express, { Response, Request } from "express";
import { body } from "express-validator";
import axios from "axios";
const router = express.Router();
router.post("/api-gateway/sign-up/user", (req: Request, res: Response) => {
  const url: string = "http://localhost:3010" + req.url;
  let statusCode: number = 200;
  let data;
  axios
    .post(url, req.body)
    .then(function (response) {
      data = response.data;
      res.send(response.data);
    })
    .catch(function (error) {
      console.log(error);
    });

  res.status(500);
});
export { router as signUpRouter };
