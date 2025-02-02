import React from "react";
import PropTypes from "prop-types";
import MoodButtonView from "./MoodButtonView";
import angryIcon from "../../../ressources/images/angry_icon.svg";
import wowIcon from "../../../ressources/images/happy_icon.svg";

export default function CommentView({ comment, onReact }) {
  return (
    <li className="border p-2 rounded mt-2 bg-gray-100">
      <p>{comment.text}</p>
      <div className="flex space-x-2 mt-1">
        <MoodButtonView
          label="Wow"
          icon={wowIcon}
          bgColor="bg-purple-500"
          onClick={() => onReact("wow")}
          count={comment.reactions.wow}
        />
        <MoodButtonView
          label="Angry"
          icon={angryIcon}
          bgColor="bg-yellow-500"
          onClick={() => onReact("angry")}
          count={comment.reactions.angry}
        />
      </div>
    </li>
  );
}

CommentView.propTypes = {
  comment: PropTypes.object.isRequired,
  onReact: PropTypes.func.isRequired,
};
