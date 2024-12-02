import React from "react";
import { useField } from "../hooks/useField";
import {
  Button,
  Container,
  TextareaAutosize,
  TextField,
  Typography,
} from "@mui/material";
import { useDispatch } from "react-redux";
import { commentingBlog } from "../reducers/blogReducer";

const Comments = ({ blog }) => {
  const comment = useField("text");
  const dispatch = useDispatch();
  const handleComment = (id) => {
    dispatch(commentingBlog(id, { comment: comment.value }));
    comment.reset();
  };

  return (
    <>
      <Typography variant="h5">Comments</Typography>
      <div>
        <TextareaAutosize
          {...{ ...comment, reset: undefined }}
          style={{ marginRight: "0.3rem", width: "15rem", height: "3rem" }}
          label="comment"
        />
        <div>
          <Button
            variant="contained"
            onClick={() => handleComment(blog.id)}
            style={{ width: "6rem" }}
          >
            comment
          </Button>
        </div>
      </div>
      <div style={{ padding: "0.1rem" }}>
        <ul>
          {blog.comments.map((comment) => (
            <li key={comment}>
              <Typography variant="body1">{comment}</Typography>
            </li>
          ))}
        </ul>
      </div>
    </>
  );
};

export default Comments;
