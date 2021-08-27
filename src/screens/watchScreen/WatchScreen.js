import React, { useEffect } from "react";
import { Col, Row } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import Comments from "../../components/comments/Comments";
import VideoHorizontal from "../../components/videoHorizontal/VideoHorizontal";
import VideoMetaData from "../../components/videoMetaData/VideoMetaData";
import {
  getRelatedVideos,
  getVideoById,
} from "../../redux/actions/videoAction";
import "./watchScreen.scss";

const WatchScreen = () => {
  const { id } = useParams();

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getVideoById(id));

    dispatch(getRelatedVideos(id));
  }, [dispatch, id]);
  const { videos, loading: relatedVideosLoading } = useSelector(
    (state) => state.relatedVideos
  );

  const { video, loading } = useSelector((state) => state.selectedVideo);

  return (
    <Row>
      <Col lg={8}>
        <div className="watchScreen__player">
          <iframe
            frameBorder="0"
            allowFullScreen
            title={video?.snippet?.title}
            width="100%"
            height="100%"
            src={`https://www.youtube.com/embed/${id}`}
          ></iframe>
        </div>
        {!loading ? (
          <VideoMetaData video={video} videoId={id}></VideoMetaData>
        ) : (
          <h6>Loading...</h6>
        )}

        <Comments
          videoId={id}
          totalComments={video?.statistics.commentCount}
        ></Comments>
      </Col>
      <Col lg={4}>
        {!relatedVideosLoading &&
          videos
            ?.filter((video) => video.snippet)
            .map((video) => (
              <VideoHorizontal
                video={video}
                key={video.id.videoId}
              ></VideoHorizontal>
            ))}
      </Col>
    </Row>
  );
};

export default WatchScreen;
