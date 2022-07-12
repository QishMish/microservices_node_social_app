// import MediaType from "./MediaType";
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  BaseEntity,
} from "typeorm";

export enum MediaTypes {
  IMAGE = "IMAGE",
  VIDEO = "VIDEO",
}

@Entity()
class Media extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    nullable: false,
  })
  media_url: string;

  //   @ManyToOne(() => MediaType, (mediaType) => mediaType.media)
  //   @ManyToOne(() => MediaType)
  //   type: MediaType;
  @Column()
  user_id: number;

  @Column({
    type: "enum",
    enum: MediaTypes,
  })
  type: MediaTypes;
}

export default Media;
