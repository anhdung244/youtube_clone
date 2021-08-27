import request from "../../api";

export const getPopularVideos = () => async (dispatch, getState) => {
  try {
    dispatch({
      type: "HOME_VIDEOS_REQUEST",
    });

    const { data } = await request("/videos", {
      params: {
        part: "snippet,contentDetails,statistics",
        chart: "mostPopular",
        regionCode: "VN",
        maxResults: 20,
        pageToken: getState().homeVideo.nextPageToken,
      },
    });
    console.log(data);

    dispatch({
      type: "HOME_VIDEOS_SUCCESS",
      payload: {
        videos: data.items,
        nextPageToken: data.nextPageToken,
        category: "All",
      },
    });
  } catch (error) {
    console.log(error.message);
    dispatch({
      type: "HOME_VIDEOS_FAIL",
      payload: error.message,
    });
  }
};

export const getVideoByCategory = (keyword) => async (dispatch, getState) => {
  try {
    dispatch({
      type: "HOME_VIDEOS_REQUEST",
    });
    const { data } = await request("/search", {
      params: {
        part: "snippet",
        maxResults: 20,
        pageToken: getState().homeVideo.nextPageToken,
        q: keyword,
        type: "video",
      },
    });
    console.log(data);

    dispatch({
      type: "HOME_VIDEOS_SUCCESS",
      payload: {
        videos: data.items,
        nextPageToken: data.nextPageToken,
        category: keyword,
      },
    });
  } catch (error) {
    console.log(error.message);
    dispatch({
      type: "HOME_VIDEOS_FAIL",
      payload: error.message,
    });
  }
};
export const getVideoById = (id) => async (dispatch) => {
  try {
    dispatch({
      type: "SELECTED_VIDEO_REQUEST",
    });

    const { data } = await request("/videos", {
      params: {
        part: "snippet,statistics,contentDetails",
        id: id,
      },
    });
    dispatch({
      type: "SELECTED_VIDEO_SUCCESS",
      payload: data.items[0],
    });
  } catch (error) {
    console.log(error.message);
    dispatch({
      type: "SELECTED_VIDEO_FAIL",
      payload: error.message,
    });
  }
};

export const getRelatedVideos = (id) => async (dispatch) => {
  try {
    dispatch({
      type: "RELATED_VIDEO_REQUEST",
    });
    const { data } = await request("/search", {
      params: {
        part: "snippet",
        relatedToVideoId: id,
        type: "video",
        maxResults: 20,
      },
    });
    dispatch({
      type: "RELATED_VIDEO_SUCCESS",
      payload: data.items,
    });
  } catch (error) {
    console.log(error.message);
    dispatch({
      type: "RELATED_VIDEO_FAIL",
      payload: error.message,
    });
  }
};

export const getVideosBySearch = (keyword) => async (dispatch) => {
  try {
    dispatch({
      type: "SEARCHED_VIDEO_REQUEST",
    });
    const { data } = await request("/search", {
      params: {
        part: "snippet",

        maxResults: 20,
        q: keyword,
        type: "video,channel",
      },
    });

    dispatch({
      type: "SEARCHED_VIDEO_SUCCESS",
      payload: data.items,
    });
  } catch (error) {
    console.log(error.message);
    dispatch({
      type: "SEARCHED_VIDEO_FAIL",
      payload: error.message,
    });
  }
};
export const getSubscribedChannels = () => async (dispatch, getState) => {
  try {
    dispatch({
      type: "SUBSCRIPTIONS_CHANNEL_REQUEST",
    });
    const { data } = await request("/subscriptions", {
      params: {
        part: "snippet,contentDetails",

        mine: true,
      },
      headers: {
        Authorization: `Bearer ${getState().auth.accessToken}`,
      },
    });
    dispatch({
      type: "SUBSCRIPTIONS_CHANNEL_SUCCESS",
      payload: data.items,
    });
  } catch (error) {
    console.log(error.response.data);
    dispatch({
      type: "SUBSCRIPTIONS_CHANNEL_FAIL",
      payload: error.response.data,
    });
  }
};

export const getVideosByChannel = (id) => async (dispatch, getState) => {
  try {
    dispatch({
      type: "CHANNEL_VIDEO_REQUEST",
    });
    const {
      data: { items },
    } = await request("/channels", {
      params: {
        part: "contentDetails",
        id: id,
      },
    });

    const uploadPlaylistId = items[0].contentDetails.relatedPlaylists.uploads;

    const { data } = await request("/playlistItems", {
      params: {
        part: "snippet,contentDetails",
        playlistId: uploadPlaylistId,
        maxResults: 30,
      },
    });
    console.log(items);
    dispatch({
      type: "CHANNEL_VIDEO_SUCCESS",
      payload: data.items,
    });
  } catch (error) {
    dispatch({
      type: "CHANNEL_VIDEO_FAIL",
      payload: error.response,
    });
  }
};

export const getLikedVideos = () => async (dispatch, getState) => {
  try {
    dispatch({
      type: "LIKED_VIDEOS_REQUEST",
    });
    const { data } = await request("/videos", {
      params: {
        part: "snippet,contentDetails",
        myRating: "like",
        maxResults: 30,
        pageToken: getState().homeVideo.nextPageToken,
      },
      headers: {
        Authorization: `Bearer ${getState().auth.accessToken}`,
      },
    });

    dispatch({
      type: "LIKED_VIDEOS_SUCCESS",
      payload: data.items,
    });
  } catch (error) {
    console.log(error.message);
    dispatch({
      type: "LIKED_VIDEOS_FAIL",
      payload: error.message,
    });
  }
};
