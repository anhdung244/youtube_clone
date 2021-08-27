const initialState = {
  videos: [],
  loading: false,
  nextPageToken: null,
  activeCategory: "All",
};

export const videoReducer = (prevState = initialState, action) => {
  switch (action.type) {
    case "HOME_VIDEOS_REQUEST":
      return {
        ...prevState,
        loading: true,
      };
    case "HOME_VIDEOS_SUCCESS":
      return {
        ...prevState,
        loading: false,
        videos:
          prevState.activeCategory === action.payload.category
            ? [...prevState.videos, ...action.payload.videos]
            : action.payload.videos,
        nextPageToken: action.payload.nextPageToken,
        activeCategory: action.payload.category,
      };
    case "HOME_VIDEOS_FAIL":
      return {
        ...prevState,
        loading: false,
        error: action.payload,
      };

    default:
      return prevState;
  }
};

export const selectedVideoReducer = (
  state = {
    loading: true,
    video: null,
  },
  action
) => {
  const { payload, type } = action;

  switch (type) {
    case "SELECTED_VIDEO_REQUEST":
      return {
        ...state,
        loading: true,
      };
    case "SELECTED_VIDEO_SUCCESS":
      return {
        ...state,
        video: payload,
        loading: false,
      };
    case "SELECTED_VIDEO_FAIL":
      return {
        ...state,
        video: null,
        loading: false,
        error: payload,
      };

    default:
      return state;
  }
};

export const relatedVideosReducer = (
  prevState = {
    loading: true,
    videos: [],
  },
  action
) => {
  switch (action.type) {
    case "RELATED_VIDEO_REQUEST":
      return {
        ...prevState,
        loading: true,
      };
    case "RELATED_VIDEO_SUCCESS":
      return {
        ...prevState,
        loading: false,
        videos: action.payload,
      };
    case "RELATED_VIDEO_FAIL":
      return {
        ...prevState,
        loading: false,
        error: action.payload,
      };

    default:
      return prevState;
  }
};

export const searchedVideosReducer = (
  prevState = {
    loading: true,
    videos: [],
  },
  action
) => {
  switch (action.type) {
    case "SEARCHED_VIDEO_REQUEST":
      return {
        ...prevState,
        loading: true,
      };
    case "SEARCHED_VIDEO_SUCCESS":
      return {
        ...prevState,
        loading: false,
        videos: action.payload,
      };
    case "SEARCHED_VIDEO_FAIL":
      return {
        ...prevState,
        loading: false,
        error: action.payload,
      };

    default:
      return prevState;
  }
};

export const subscriptionsChannelReducer = (
  state = { loading: true, videos: [] },
  action
) => {
  switch (action.type) {
    case "SUBSCRIPTIONS_CHANNEL_REQUEST":
      return {
        ...state,
        loading: true,
      };
    case "SUBSCRIPTIONS_CHANNEL_SUCCESS":
      return {
        ...state,
        loading: false,
        videos: action.payload,
      };
    case "SUBSCRIPTIONS_CHANNEL_FAIL":
      return {
        ...state,
        loading: false,
        error: action.payload,
      };

    default:
      return state;
  }
};

export const channelVideosReducer = (
  state = { loading: true, videos: [] },
  action
) => {
  switch (action.type) {
    case "CHANNEL_VIDEO_REQUEST":
      return {
        ...state,
        loading: true,
      };
    case "CHANNEL_VIDEO_SUCCESS":
      return {
        ...state,
        loading: false,
        videos: action.payload,
      };
    case "CHANNEL_VIDEO_FAIL":
      return {
        ...state,
        loading: false,
        error: action.payload,
      };

    default:
      return state;
  }
};

export const likedVideosReducer = (
  prevState = {
    loading: true,
    videos: [],
  },
  action
) => {
  switch (action.type) {
    case "LIKED_VIDEOS_REQUEST":
      return {
        ...prevState,
        loading: true,
      };
    case "LIKED_VIDEOS_SUCCESS":
      return {
        ...prevState,
        loading: false,
        videos: action.payload,
      };
    case "LIKED_VIDEOS_FAIL":
      return {
        ...prevState,
        loading: false,
        error: action.payload,
      };

    default:
      return prevState;
  }
};
