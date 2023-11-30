import express, { NextFunction, Request, Response } from "express";
import * as http from "http";
import { StatusCodes } from "http-status-codes";
import morgan from "morgan";

import { SERVER_CONFIG } from "./config/config";

import { logger } from "./logger";

import { BaseError } from './utils/error';

import cors from "cors";

import router from "./routes";
import dotenv from 'dotenv';
import { getConnection } from "./config/getConnection";
import PostgresDataSource from "./config/data-source";

dotenv.config();

export default async function YVYServer() {
  const connection = await getConnection(PostgresDataSource);
  
  const port = process.env.PORT || SERVER_CONFIG.PORT;

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

    .use(router)

    .get("/", (_, res: Response) => {
      res.send("Hello World!");
    })

    .get("/test", (_, res: Response) => {
      res.send("deploy OK!");
    })

    .get("/health", async (_, res: Response) => {
      const isDbConnected = connection.isInitialized;
      const health = {
        timestamp: new Date(),
        status: isDbConnected ? "healthy" : "warning",
        db: isDbConnected ? "connected" : "disconnected",
      };

      res.status(StatusCodes.OK).json(health);
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
