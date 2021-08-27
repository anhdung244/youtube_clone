import React, { useState } from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  addComment,
  getCommentsOfVideoId,
} from "../../redux/actions/commentsAction";
import Comment from "./Comment/Comment";
import "./_comments.scss";

const Comments = ({ videoId, totalComments }) => {
  const dispatch = useDispatch();

  const [text, setText] = useState("");

  const handleComment = (event) => {
    event.preventDefault();
    if (text.length === 0) return;
    dispatch(addComment(videoId, text));

    setText("");
  };

  useEffect(() => {
    dispatch(getCommentsOfVideoId(videoId));
  }, [dispatch, videoId]);

  const comments = useSelector((state) => state.commentList.comments);
  const _comments = comments?.map(
    (comment) => comment.snippet.topLevelComment.snippet
  );
  return (
    <div className="comment">
      {/* <div className="comment__total">
        
      </div> */}
      <p className="comment__total">{totalComments} Comments</p>
      <div className="my-2 comments__form d-flex w-100">
        <img
          src="https://www.pngkey.com/png/full/114-1149878_setting-user-avatar-in-specific-size-without-breaking.png"
          alt="avatar"
          className="rounded-circle mr-3"
        />
        <form action="" onSubmit={handleComment} className="d-flex flex-grow-1">
          <input
            type="text"
            className="flex-grow-1"
            placeholder="Write a comment"
            onChange={(e) => setText(e.target.value)}
          />
          <button className="border-0 p-2">Comment</button>
        </form>
      </div>
      <div className="comment__list">
        {_comments?.map((comment, i) => (
          <Comment comment={comment} key={i}></Comment>
        ))}
      </div>
    </div>
  );
};

export default Comments;
