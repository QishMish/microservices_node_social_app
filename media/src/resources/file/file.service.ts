import ProfileImage from "@/entity/ProfileImage";
import HttpException from "@/utils/exceptions/http.exception";
import Media from "@/entity/Media";
// import MediaType from "@/entity/MediaType";
import { MediaTypes } from "@/entity/Media";
import PostMedia from "@/entity/PostMedia";

export type IUploadManyArgs = {
  mediaURL: String;
  mediaType: MediaTypes;
};
class FileService {
  public upload = async (
    userId: number,
    mediaURL: string,
    mediaType: MediaTypes
  ) => {
    await Media.insert({
      media_url: mediaURL,
      user_id: userId,
      type: mediaType,
    });
  };
  public uploadMany = async (
    userId: number,
    uploadManyArgs: IUploadManyArgs[]
  ) => {
    await Promise.all(
      uploadManyArgs.map(async (item) => {
        await Media.insert({
          media_url: item.mediaURL.toString(),
          user_id: userId,
          type: item.mediaType,
        });
      })
    );
  };
  public uploadProfileImage = async (userId: number, imageURL: string) => {
    await ProfileImage.insert({
      image_url: imageURL,
      user_id: userId,
    });
  };
  public uploadPostMedia = async (userId: number, postId:string, mediaURL: string, mediaType:MediaTypes) => {
    await PostMedia.insert({
      media_url: mediaURL,
      user_id: userId,
      post_id: postId,
      type:mediaType
    });
  };
}

export default FileService;
