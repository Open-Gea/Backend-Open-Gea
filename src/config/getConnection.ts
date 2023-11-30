import { DataSource } from "typeorm";
import { logger } from "../logger";

export async function getConnection(dataSource: DataSource): Promise<DataSource> {
    const { isInitialized } = dataSource;
    if (!isInitialized) {
      return dataSource.initialize()
        .then((connection) => {
          logger().info("Connected to Postgres");
          return connection;
        })
        .catch((err) => {
          logger().error(err);
          return err;
        });
    }
    return dataSource;
  }