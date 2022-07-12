import { DataSource } from "typeorm";
import "reflect-metadata";
import Media from "@/entity/Media";
// import MediaType from "@/entity/MediaType";
import constants from "./constants";
import PostMedia from "@/entity/PostMedia";
import ProfileImage from "@/entity/ProfileImage";

const { DB_HOST, DB_PORT, DB_NAME, DB_USERNAME, DB_PASSWORD } = constants;

const AppDataSource = new DataSource({
  type: "postgres",
  host: DB_HOST,
  port: 5432,
  username: DB_USERNAME,
  password: DB_PASSWORD,
  database: DB_NAME,
  // logging: true,
  synchronize: true,
  entities: [
    Media,
    PostMedia,
    ProfileImage
    // MediaType
  ],
});
export default AppDataSource;
