import React from "react";
import "./channelScreen.scss";
import { useEffect } from "react";
import { Col, Container, Row } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { getVideosByChannel } from "../../redux/actions/videoAction";

import Video from "../../components/video/Video";
import Skeleton, { SkeletonTheme } from "react-loading-skeleton";
import {
  checkSubscriptionStatus,
  getChannelDetails,
} from "../../redux/actions/channelAction";
import numeral from "numeral";

const ChannelScreen = () => {
  const { channelId } = useParams();
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getVideosByChannel(channelId));
    dispatch(getChannelDetails(channelId));
    dispatch(checkSubscriptionStatus(channelId));
  }, [dispatch, channelId]);

  const { videos, loading } = useSelector((state) => state.channelVideos);

  const { snippet, statistics } = useSelector(
    (state) => state.channelDetails.channel
  );
  const subscriptionStatus = useSelector(
    (state) => state.channelDetails.subscriptionStatus
  );
  return (
    <>
      <div className="py-2 px-5 d-flex justify-content-between align-content-center channelHeader">
        <div className="d-flex align-items-center">
          <img src={snippet?.thumbnails?.default?.url} alt="" />

          <div className="ml-3 channelHeader__details">
            <h3>{snippet?.title}</h3>
            <span>
              {numeral(statistics?.subscriberCount).format("0.a")}
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
      <Container>
        <Row className="mt-2">
          {!loading
            ? videos.map((video) => (
                <Col md={3} lg={3}>
                  <Video channelScreen video={video}></Video>
                </Col>
              ))
            : [
                ...Array(15).map(() => (
                  <Col md={3} lg={3}>
                    <SkeletonTheme color="#343a40" highlightColor="#3c4147">
                      <Skeleton
                        width="100%"
                        height="160px"
                        count={20}
                      ></Skeleton>
                    </SkeletonTheme>
                  </Col>
                )),
              ]}
        </Row>
      </Container>
    </>
  );
};

export default ChannelScreen;
