import "./App.css";
import "./_app.scss";
import { Route, Switch, Redirect, useHistory } from "react-router-dom";

import Header from "./components/header/Header";
import Sidebar from "./components/sidebar/Sidebar";
import HomeScreen from "./screens/homeScreen/HomeScreen";
import WatchScreen from "./screens/watchScreen/WatchScreen";

import { Container } from "react-bootstrap";

import { useState } from "react";

import LoginScreen from "./screens/loginScreen/LoginScreen";
import { useSelector } from "react-redux";
import { useEffect } from "react";
import SearchScreen from "./screens/SearchScreen";
import SubscriptionsScreen from "./screens/subscriptionScreen/SubscriptionsScreen";
import ChannelScreen from "./screens/channelScreen/ChannelScreen";
import LikedScreen from "./screens/likedScreen/LikedScreen";
// const Layout = ({ children }) => {
//   const [sideBar, setSideBar] = useState(false);
//   const handleToggleSideBar = () => setSideBar((value) => !value);
//   return (
//     <>
//       <Header handleToggleSideBar={handleToggleSideBar}></Header>
//       <div className="app__container">
//         <Sidebar
//           sideBar={sideBar}
//           handleToggleSideBar={handleToggleSideBar}
//         ></Sidebar>

//         <Container fluid className="app__main  ">
//           {children}
//         </Container>
//       </div>
//     </>
//   );
// };
const Layout = ({ children }) => {
  const [sidebar, toggleSidebar] = useState(false);

  const handleToggleSidebar = () => toggleSidebar((value) => !value);

  return (
    <>
      <Header handleToggleSidebar={handleToggleSidebar} />
      <div className="app__container">
        <Sidebar sidebar={sidebar} handleToggleSidebar={handleToggleSidebar} />
        <Container fluid className="app__main ">
          {children}
        </Container>
      </div>
    </>
  );
};
function App() {
  const { accessToken, loading } = useSelector((state) => state.auth);

  const history = useHistory();
  useEffect(() => {
    if (!loading && !accessToken) {
      history.push("/auth");
    }
  }, [accessToken, loading, history]);

  return (
    <div className="App">
      <Switch>
        <Route path="/" exact>
          <Layout>
            <HomeScreen></HomeScreen>
          </Layout>
        </Route>

        <Route path="/auth">
          <LoginScreen></LoginScreen>
        </Route>

        <Route path="/search/:query">
          <Layout>
            <SearchScreen></SearchScreen>
          </Layout>
        </Route>

        <Route path="/watch/:id">
          <Layout>
            <WatchScreen></WatchScreen>
          </Layout>
        </Route>

        <Route path="/feed/subscriptions">
          <Layout>
            <SubscriptionsScreen />
          </Layout>
        </Route>

        <Route path="/channel/:channelId">
          <Layout>
            <ChannelScreen></ChannelScreen>
          </Layout>
        </Route>

        <Route path="/Liked">
          <Layout>
            <LikedScreen></LikedScreen>
          </Layout>
        </Route>

        <Route>
          <Redirect to="/"></Redirect>
        </Route>
      </Switch>
    </div>
  );
}

export default App;
