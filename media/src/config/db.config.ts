import { DataSource } from "typeorm";
import "reflect-metadata";
// import User from "@/resources/user/user.model";

const { DB_HOST, DB_PORT, DB_NAME, DB_USERNAME, DB_PASSWORD } = process.env;

const AppDataSource = new DataSource({
  type: "postgres",
  host: DB_HOST,
  port: 5432,
  username: DB_USERNAME,
  password: DB_PASSWORD,
  database: DB_NAME,
  //   logging: true,
  synchronize: true,
  entities: [
    // User
  ],
});
export default AppDataSource;
