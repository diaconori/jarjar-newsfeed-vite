import React, { useState } from "react";
import { NewsFeed } from "../../shared/models/Newsfeed";
import TitleView from "./components/TitleView";
import ListView from "./components/ListView";
import jarjarImage from "../../ressources/images/jarjar.jpg"; 

export default function NewsFeedView() {
  const [updates, setUpdates] = useState(NewsFeed.getSampleUpdates()); 

  const handleAddUpdate = (text) => {
    if (text.trim() === "") return;
    const newUpdate = new NewsFeed(text, "Jar Jar", jarjarImage);
    setUpdates([newUpdate, ...updates]); 
  };

  const handleDeleteUpdate = (updateId) => {
    setUpdates(updates.filter(update => update.id !== updateId));
  };

  const handleAddComment = (updateId, text) => {
    if (text.trim() === "") return;

    setUpdates(updates.map(update => {
      if (update.id === updateId) {
        update.addComment(text);
      }
      return update;
    }));
  };

  const handleReact = (updateId, reactionType, commentId = null) => {
    setUpdates(updates.map(update => {
      if (update.id === updateId) {
        if (commentId) {
          update.addReactionToComment(commentId, reactionType);
        } else {
          update.addReaction(reactionType);
        }
      }
      return update;
    }));
  };

  return (
    <div className="container">
      <TitleView title="Jar Jar Newsfeed" />
      <ListView 
        updates={updates} 
        onDeleteUpdate={handleDeleteUpdate} 
        onAddUpdate={handleAddUpdate} 
        onAddComment={handleAddComment} 
        onReact={handleReact} 
      />
    </div>
  );
}
