import { API, config } from "../api";
class PostService {
  static createPost(post: FormData) {
    return API.post(config.api.post.create, post);
  }

  static fetchAllPosts(query: string = "") {
    return API.get(config.api.post.getAll + query)
      .then((response) => {
        if (response?.data?.data) {
          const data = response?.data?.data;
          const updatedArr = [];
          for (const post of data) {
            if (post?.interiorImages?.length > 0)
              post.interiorImages = post?.interiorImages?.map(
                (img: string) => `${config.serverBaseURL}/${img}`
              );
            if (post?.exteriorImages?.length > 0)
              post.exteriorImages = post?.exteriorImages?.map(
                (img: string) => `${config.serverBaseURL}/${img}`
              );

            updatedArr.push(post);
          }
          console.log(updatedArr);

          return { data: updatedArr };
        }
      })
      .catch((err) => {
        console.error(err);
      });
  }

  static getFilterDetails() {
    return API.get(config.api.post.getFilterDetails);
  }
}

export default PostService;
