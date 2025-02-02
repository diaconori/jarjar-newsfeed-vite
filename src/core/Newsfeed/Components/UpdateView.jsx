import React, { useState } from "react";
import PropTypes from "prop-types";
import CommentView from "./CommentView";
import ProfileImageView from "./ProfileImageView";
import ImageButtonView from "./ImageButtonView"; 
import rudeSound from "../../../ressources/audio/rude.mp3";
import likeIcon from "../../../ressources/images/thumbs_up_icon.svg";
import dislikeIcon from "../../../ressources/images/thumbs_down_icon.svg";
import deleteIcon from "../../../ressources/images/delete_icon.svg";
import commentIcon from "../../../ressources/images/comment_icon.svg";

export default function UpdateView({ update, onAddComment, onDeleteUpdate, onReact }) {
  const [commentText, setCommentText] = useState("");

  const playSound = (soundFile) => {
    const audio = new Audio(soundFile);
    audio.play();
  };

  return (
    <li className="border p-4 rounded mb-2 shadow-lg bg-white">
      <div className="flex items-center space-x-3">
        {update.imageSrc && <ProfileImageView src={update.imageSrc} alt={update.by} />}
        <p className="text-lg font-semibold text-gray-800">{update.text}</p>
      </div>

      <div className="flex space-x-2 mt-2">
        <ImageButtonView
          label="Like"
          icon={likeIcon}
          bgColor="bg-green-500"
          onClick={() => onReact(update.id, "like")}
          count={update.reactions.like}
        />
        <ImageButtonView
          label="Dislike"
          icon={dislikeIcon}
          bgColor="bg-red-500"
          onClick={() => {
            onReact(update.id, "dislike");
            playSound(rudeSound);
          }}
          count={update.reactions.dislike}
        />
        <ImageButtonView
          label="Delete"
          icon={deleteIcon}
          bgColor="bg-gray-500"
          onClick={() => onDeleteUpdate(update.id)}
        />
      </div>

      <div className="mt-3">
        <input
          type="text"
          value={commentText}
          onChange={(e) => setCommentText(e.target.value)}
          placeholder="Write a comment..."
          className="border p-2 w-full rounded"
        />
        <ImageButtonView
          label="Comment"
          icon={commentIcon}
          bgColor="bg-blue-500"
          onClick={() => {
            if (commentText.trim() !== "") {
              onAddComment(update.id, commentText);
              setCommentText("");
            }
          }}
        />
      </div>

      {update.comments.length > 0 && (
        <ul className="mt-3 space-y-2">
          {update.comments.map((comment) => (
            <CommentView
              key={comment.id}
              comment={comment}
              onReact={(reaction) => {
                if (reaction === "angry") {
                  playSound(rudeSound);
                }
                onReact(update.id, reaction, comment.id);
              }}
            />
          ))}
        </ul>
      )}
    </li>
  );
}

UpdateView.propTypes = {
  update: PropTypes.object.isRequired,
  onAddComment: PropTypes.func.isRequired,
  onDeleteUpdate: PropTypes.func.isRequired,
  onReact: PropTypes.func.isRequired,
};
