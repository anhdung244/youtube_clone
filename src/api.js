import axios from "axios";

const request = axios.create({
  baseURL: "https://www.googleapis.com/youtube/v3/",
  params: {
    key: "AIzaSyAJBkegoOO41oEqHszRTVxe46-elCSJ2hc",
  },
});

export default request;
