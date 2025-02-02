import React, { useState } from "react";
import PropTypes from "prop-types";
import UpdateView from "./UpdateView";

export default function ListView({ updates, onAddUpdate, onAddComment, onDeleteUpdate, onReact }) {
  const [newUpdateText, setNewUpdateText] = useState("");

  return (
    <div className="p-4">
      <div className="mb-4">
        <input
          type="text"
          value={newUpdateText}
          onChange={(e) => setNewUpdateText(e.target.value)}
          placeholder="Write a new update..."
          className="border p-2 w-full rounded"
        />
        <button
          className="bg-blue-500 text-white px-4 py-2 mt-2 rounded"
          onClick={() => {
            if (newUpdateText.trim() !== "") {
              onAddUpdate(newUpdateText);
              setNewUpdateText("");
            }
          }}
        >
          Post
        </button>
      </div>

      <ul className="space-y-4">
        {updates.length === 0 ? (
          <p className="text-gray-500">No updates yet. Be the first to post!</p>
        ) : (
          updates.map((update) => (
            <UpdateView
              key={update.id}
              update={update}
              onAddComment={onAddComment}
              onDeleteUpdate={onDeleteUpdate}
              onReact={onReact}
            />
          ))
        )}
      </ul>
    </div>
  );
}

ListView.propTypes = {
  updates: PropTypes.array.isRequired,
  onAddUpdate: PropTypes.func.isRequired,
  onAddComment: PropTypes.func.isRequired,
  onDeleteUpdate: PropTypes.func.isRequired,
  onReact: PropTypes.func.isRequired,
};
