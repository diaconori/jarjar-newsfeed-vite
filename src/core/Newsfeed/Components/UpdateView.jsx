import React, { useState } from "react";
import PropTypes from "prop-types";
import CommentView from "./CommentView";
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
      <p className="text-lg font-semibold text-gray-800">{update.text}</p>

      <div className="flex space-x-2 mt-2">
        <button className="flex items-center space-x-1 bg-green-500 text-white px-3 py-1 rounded" onClick={() => onReact(update.id, "like")}>
          <img src={likeIcon} alt="Like" className="w-5 h-5" />
          <span>{update.reactions.like}</span>
        </button>
        <button
          className="flex items-center space-x-1 bg-red-500 text-white px-3 py-1 rounded"
          onClick={() => {
            onReact(update.id, "dislike");
            playSound(rudeSound);
          }}
        >
          <img src={dislikeIcon} alt="Dislike" className="w-5 h-5" />
          <span>{update.reactions.dislike}</span>
        </button>
        <button
          className="flex items-center space-x-1 bg-gray-500 text-white px-3 py-1 rounded"
          onClick={() => onDeleteUpdate(update.id)} // ✅ Calls delete function
        >
          <img src={deleteIcon} alt="Delete" className="w-5 h-5" />
          <span>Delete</span>
        </button>
      </div>

      <div className="mt-3">
        <input
          type="text"
          value={commentText}
          onChange={(e) => setCommentText(e.target.value)}
          placeholder="Write a comment..."
          className="border p-2 w-full rounded"
        />
        <button
          className="flex items-center space-x-1 bg-blue-500 text-white px-4 py-2 mt-1 rounded"
          onClick={() => {
            if (commentText.trim() !== "") {
              onAddComment(update.id, commentText);
              setCommentText("");
            }
          }}
        >
          <img src={commentIcon} alt="Comment" className="w-5 h-5" />
          <span>Comment</span>
        </button>
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
