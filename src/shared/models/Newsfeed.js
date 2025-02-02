import jarjarImage from "../../ressources/images/jarjar.jpg";
import r2Image from "../../ressources/images/r2d2.jpg";
import c3poImage from "../../ressources/images/3po.jpg";
import b1droidImage from "../../ressources/images/b1droid.jpg";

import moment from "moment";
import { v4 as uuid } from "uuid";

export class NewsFeed {
  constructor(text, by = "Jar Jar", imageSrc = jarjarImage, comments = []) {
    this.id = uuid();
    this.text = text;
    this.by = by; 
    this.imageSrc = imageSrc; 
    this.created = moment(Date.now()).subtract(Math.floor(Math.random() * 5), "days").valueOf();
    this.comments = comments;
    this.reactions = { like: 0, dislike: 0 };
  }

  addComment(commentText) {
    const comment = {
      id: uuid(),
      text: commentText,
      by: "Jar Jar",
      imageSrc: jarjarImage, 
      reactions: { angry: 0, wow: 0 },
    };
    this.comments.push(comment);
  }

  addReaction(reactionType) {
    if (this.reactions[reactionType] !== undefined) {
      this.reactions[reactionType]++;
    }
  }

  addReactionToComment(commentId, reactionType) {
    const comment = this.comments.find((comment) => comment.id === commentId);
    if (comment && comment.reactions[reactionType] !== undefined) {
      comment.reactions[reactionType]++;
    }
  }

  static getSampleUpdates() {
    return [
      new NewsFeed("Mesa called Jar Jar Binks, mesa your humble servant!", "Jar Jar", jarjarImage),
      new NewsFeed("Bleep boop, beep beep.", "R2-D2", r2Image),
      new NewsFeed("Yousa should follow me now, okay? My warning yous: Gungans no like outsiders.", "Jar Jar", jarjarImage),
      new NewsFeed("The BOOOM! Getin very scared and grabin that Jedi, the pah ... mesa here", "Jar Jar", jarjarImage),
      new NewsFeed("Its-A Clear Desa Separatists Made A Pact Wesa Desa Federation Du Trade.", "Jar Jar", jarjarImage, [
        { id: uuid(), text: "Sir, it's very possible this asteroid is not stable", by: "C3P0", imageSrc: c3poImage, reactions: { angry: 0, wow: 0 } },
        { id: uuid(), text: "Roger, roger.", by: "B1 battle droid", imageSrc: b1droidImage, reactions: { angry: 0, wow: 0 } },
        { id: uuid(), text: "Beep, Beep.", by: "R2D2", imageSrc: r2Image, reactions: { angry: 0, wow: 0 } },
      ]),
    ];
  }
}
