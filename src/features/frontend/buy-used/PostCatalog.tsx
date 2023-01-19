import { Container } from "@mui/material";
import * as React from "react";
import PostItem from "./PostItem";

interface IPostCatalogProps {
  posts: any;
}

const PostCatalog: React.FunctionComponent<IPostCatalogProps> = ({ posts }) => {
  return (
    <Container sx={{ display: "flex", flexWrap: "wrap" }}>
      {Array.isArray(posts) &&
        posts?.map((post, i) => <PostItem key={post?.id} {...post} />)}
    </Container>
  );
};

export default PostCatalog;
