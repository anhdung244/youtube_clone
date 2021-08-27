import React from "react";
import { useEffect } from "react";
import { Container } from "react-bootstrap";
import Skeleton, { SkeletonTheme } from "react-loading-skeleton";
import { useDispatch, useSelector } from "react-redux";
import VideoHorizontal from "../../components/videoHorizontal/VideoHorizontal";
import { getLikedVideos } from "../../redux/actions/videoAction";

const LikedScreen = ({ video }) => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getLikedVideos());
  }, [dispatch]);

  const { videos, loading } = useSelector((state) => state.likedVideos);

  return (
    <Container>
      {!loading ? (
        videos?.map((video) => (
          <VideoHorizontal video={video} key={video.id.videoId} likedScreen />
        ))
      ) : (
        <SkeletonTheme color="#343a40" highlightColor="#3c4147">
          <Skeleton width="100%" height="160px" count={20} />
        </SkeletonTheme>
      )}
    </Container>
  );
};

export default LikedScreen;
