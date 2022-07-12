// import MediaType from "./MediaType";
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  BaseEntity,
} from "typeorm";
import { MediaTypes } from "./Media";

@Entity()
class PostMedia extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    nullable: false,
  })
  media_url: string;
  @Column({
    type: "enum",
    enum: MediaTypes,
  })
  type: MediaTypes;

  @Column()
  user_id: number;

  @Column()
  post_id: string;
}

export default PostMedia;
