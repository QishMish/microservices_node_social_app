// import MediaType from "./MediaType";
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  BaseEntity,
} from "typeorm";

@Entity()
class ProfileImage extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    nullable: false,
  })
  image_url: string;

  @Column()
  user_id: number;
}

export default ProfileImage;
