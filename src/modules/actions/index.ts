import { postModule } from "modules/postModule";
import { categoryModule } from "modules/categoryModule";

export const {
  getSuccessPost,
  getSuccessSearchPosts,
  getSuccessLatestPosts,
  getSuccessDayAgoPosts,
  getSuccessCute5Posts,
  getSuccessFav5Posts,
  getSuccessGood5Posts,
  getSuccessCool5Posts,
  postSuccessReactions,
  destorySuccessReactions,
} = postModule.actions;

export const {
  getSuccessCategory,
  getSuccessRootCategory,
} = categoryModule.actions;
