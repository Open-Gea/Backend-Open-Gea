import express, { NextFunction, Request, Response } from "express";
import * as http from "http";
import { StatusCodes } from "http-status-codes";
import morgan from "morgan";

import { SERVER_CONFIG } from "./config/config";

import { logger } from "./logger";

import { BaseError } from './utils/error';

import cors from "cors";

import dotenv from 'dotenv';
import PostgresDataSource from "./config/data-source";
import { YvYRepository } from "./data-access";
import { YvYService } from "./services";
import { YvYRouter } from "./routes";

dotenv.config();

export default async function YVYServer() {
 
  const port = process.env.PORT || SERVER_CONFIG.PORT;
  const yvyRepo = new YvYRepository();
  await yvyRepo.initialize(PostgresDataSource);
  const yvyRoutes = new YvYRouter(
    new YvYService(
      yvyRepo
    )
  ).getRouter();
  
  const app = express()
    .use(express.json())
    .use(morgan("dev"))
    .use(cors())
    .use((_, res: Response, next: NextFunction) => {
      res
        .header("Access-Control-Allow-Origin", "*")
        .header(
          "Access-Control-Allow-Methods",
          "GET, POST, PATCH, PUT, DELETE, OPTIONS"
        )
        .header(
          "Access-Control-Allow-Headers",
          "Origin, X-Requested-With, Content-Type, Accept, Authorization, Access-Control-Allow-Credentials"
        );
      next();
    })

    .use(yvyRoutes)

    .get("/", (_, res: Response) => {
      res.send("Hello World!");
    })

    .get("/test", (_, res: Response) => {
      res.send("deploy OK!");
    })

    .use((error: BaseError, _req: Request, res: Response) => {
      res.status(error.code).send({ message: error.message });
    });

  const server: http.Server = http.createServer(app);

  server
    .listen(port)
    .on("listening", () => {
      logger().info(`Listening on port ${port}`);
    })
    .on("error", (err) => {
      logger().error(err);
    });

  return server;
}
