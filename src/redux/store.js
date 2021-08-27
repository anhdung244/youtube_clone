import { createStore, applyMiddleware, combineReducers } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import thunk from "redux-thunk";
import { authReducer } from "./reducers/authReducer";
import { channelDetailsReducer } from "./reducers/channelReducer";
import { commentsListReducer } from "./reducers/commentsReducer";
import {
  selectedVideoReducer,
  videoReducer,
  relatedVideosReducer,
  searchedVideosReducer,
  subscriptionsChannelReducer,
  channelVideosReducer,
  likedVideosReducer,
} from "./reducers/videoReducer";
const rootReducer = combineReducers({
  auth: authReducer,
  homeVideo: videoReducer,
  selectedVideo: selectedVideoReducer,
  channelDetails: channelDetailsReducer,
  commentList: commentsListReducer,
  relatedVideos: relatedVideosReducer,
  searchedVideos: searchedVideosReducer,
  subscriptionsChannel: subscriptionsChannelReducer,
  channelVideos: channelVideosReducer,
  likedVideos: likedVideosReducer,
});

const store = createStore(
  rootReducer,
  {},
  composeWithDevTools(applyMiddleware(thunk))
);

export default store;
