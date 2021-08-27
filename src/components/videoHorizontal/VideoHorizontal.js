import React, { useEffect } from "react";
import moment from "moment";
import numeral from "numeral";
import { LazyLoadImage } from "react-lazy-load-image-component";
import { Col, Row } from "react-bootstrap";
import { AiFillEye } from "react-icons/ai";
import "./_videoHorizontal.scss";

import request from "../../api";
import { useState } from "react";
import { useHistory } from "react-router-dom";

const VideoHorizontal = ({ video, searchScreen, subScreen, likedScreen }) => {
  const [views, setViews] = useState(null);
  const [duration, setDuration] = useState(null);
  const [channelIcon, setChannelIcon] = useState(null);
  const {
    id,
    snippet: {
      channelId,
      channelTitle,
      description,
      title,
      publishedAt,
      thumbnails: { medium },
      resourceId,
    },
    contentDetails,
  } = video;

  const _videoId = id?.videoId || contentDetails?.videoId || id;

  const isVideo = !(id.kind === "youtube#channel" || subScreen);

  useEffect(() => {
    const get_video_details = async () => {
      const {
        data: { items },
      } = await request("/videos", {
        params: {
          part: "contentDetails,statistics",
          id: _videoId,
        },
      });
      setDuration(items[0].contentDetails.duration);
      setViews(items[0].statistics.viewCount);
      console.log(items);
    };

    if (isVideo) {
      get_video_details();
    }
  }, [_videoId, isVideo]);

  useEffect(() => {
    const get_channel_icon = async () => {
      const {
        data: { items },
      } = await request("/channels", {
        params: {
          part: "snippet",
          id: channelId,
        },
      });
      setChannelIcon(items[0].snippet.thumbnails.default);
    };
    get_channel_icon();
  }, [channelId]);

  //=================
  const seconds = moment.duration(duration).asSeconds();
  const _duration = moment.utc(seconds * 1000).format("mm:ss");
  const history = useHistory();

  const _channelId = resourceId?.channelId || channelId;

  const handleClick = () => {
    isVideo
      ? history.push(`/watch/${id.videoId}`)
      : history.push(`/channel/${_channelId}`);
  };
  const thumbnail =
    (!isVideo || !likedScreen) && "videoHorizontal__thumbnail-channel";

  return (
    <Row
      onClick={handleClick}
      className="videoHorizontal m-1 py-2 align-items-center"
    >
      <Col
        xs={6}
        md={searchScreen || subScreen || likedScreen ? 4 : 6}
        className="videoHorizontal__left"
      >
        <LazyLoadImage
          src={medium.url}
          effect="blur"
          className={`videoHorizontal__thumbnail ${thumbnail} `}
          wrapperClassName="videoHorizontal__thumbnail-wrapper"
        ></LazyLoadImage>

        {isVideo && (
          <span className="videoHorizontal__duration">{_duration}</span>
        )}
      </Col>

      <Col
        xs={6}
        md={searchScreen || subScreen || likedScreen ? 8 : 6}
        className="p-0 videoHorizontal__right "
      >
        <p className="mb-1 videoHorizontal__title">{title}</p>
        {isVideo && (
          <div className="videoHorizontal__details">
            <AiFillEye /> {numeral(views).format("0.a")} Views •
            {moment(publishedAt).fromNow()}
          </div>
        )}
        {(searchScreen || subScreen) && (
          <p className="mt-1 videoHorizontal__desc">{description}</p>
        )}
        <div className="my-1 videoHorizontal__channel d-flex align-items-center">
          {/* //TODO show in search screen */}
          {isVideo && <LazyLoadImage src={channelIcon?.url} effect="blur" />}
          <p className="mb-0">{channelTitle}</p>
        </div>
        {subScreen && (
          <p className="mt-2">{video.contentDetails.totalItemCount} Videos</p>
        )}{" "}
      </Col>
    </Row>
  );
};

export default VideoHorizontal;
