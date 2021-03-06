import moment from "moment";
import numeral from "numeral";
import React from "react";
import { MdThumbDown, MdThumbUp } from "react-icons/md";
import "./_videoMetaData.scss";
import ShowMoreText from "react-show-more-text";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  checkSubscriptionStatus,
  getChannelDetails,
} from "../../redux/actions/channelAction";
import { useHistory } from "react-router-dom";

const VideoMetaData = ({ video: { snippet, statistics }, videoId }) => {
  // const {
  //   id,
  //   snippet: { channelId, channelTitle, title, publishedAt, description },
  //   statistics: { viewCount, likeCount, dislikeCount },
  // } = video;
  // const { viewCount, likeCount, dislikeCount } = video.statistics;
  const { channelId, channelTitle, description, title, publishedAt } = snippet;
  const { viewCount, likeCount, dislikeCount } = statistics;

  const { snippet: channelSnippet, statistics: channelStatistics } =
    useSelector((state) => state.channelDetails.channel);

  const subscriptionStatus = useSelector(
    (state) => state.channelDetails.subscriptionStatus
  );

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(checkSubscriptionStatus(channelId));
    dispatch(getChannelDetails(channelId));
  }, [dispatch, channelId]);

  const history = useHistory();
  const handleChannelClick = () => {
    history.push(`/channel/${channelId}`);
  };
  return (
    <div className="py-2 videoMetaData">
      <div className="videoMetaData__top">
        <h5>{title}</h5>
        <div className="py-1 d-flex justify-content-between align-items-center ">
          <span>
            {numeral(viewCount).format("0.a")}Views •{" "}
            {moment(publishedAt).fromNow()}
          </span>
        </div>
        <div className="like">
          <span className="mr-3">
            <MdThumbUp size={26} />
            {numeral(likeCount).format("0.a")}{" "}
          </span>
          <span className="mr-3">
            <MdThumbDown size={26} /> {numeral(dislikeCount).format("0.a")}
          </span>
        </div>
      </div>
      <div className="py-3 my-2 videoMetaData__channel d-flex justify-content-between align-items-center">
        <div onClick={handleChannelClick} className="d-flex">
          <img
            src={channelSnippet?.thumbnails?.default?.url}
            alt="avatar"
            className="mr-3 rounded-circle"
          />
          <div className="d-flex flex-column">
            <span>{channelTitle}</span>
            <span>
              {numeral(channelStatistics?.subscriberCount).format("0.a")}{" "}
              Subscribers
            </span>
          </div>
        </div>
        <button
          className={`p-2 m-2 border-0 btn ${subscriptionStatus && "btn-gray"}`}
        >
          {subscriptionStatus ? "Subscribed" : "Subscribe"}
        </button>
      </div>
      <div className="videoMetaData__description">
        <ShowMoreText
          lines={3}
          more="SHOW MORE"
          less="SHOW LESS"
          anchorClass="showMoreText"
          expanded={false}
        >
          {description}
        </ShowMoreText>
      </div>
    </div>
  );
};

export default VideoMetaData;
