import { Card } from "@mui/material";
import * as React from "react";

interface IPostItemProps {
  interiorImages: string[];
  exteriorImages: string[];
  model: string;
}

const PostItem: React.FunctionComponent<IPostItemProps> = ({
  interiorImages,
  exteriorImages,
  model,
}) => {
  return (
    <Card
      sx={{
        width: 300,
        padding: 1,
        margin:2,
        borderRadius: 5,
        boxShadow: "0 2px 3px 1px #0008",
        "&:hover": {
          boxShadow: "0 2px 3px 2px #000a",
        },
      }}
    >
      <img
        style={{ width: "100%", height: 100 }}
        src={exteriorImages.length > 0 ? exteriorImages[0] : interiorImages[0]}
      />
      <h3>{model}</h3>
    </Card>
  );
};

export default PostItem;
