import React, { useState } from "react";
import "./_header.scss";

import { FaBars } from "react-icons/fa";
import { AiOutlineSearch } from "react-icons/ai";
import { MdNotifications, MdApps } from "react-icons/md";
import { Link, useHistory } from "react-router-dom";
import { useSelector } from "react-redux";

const Header = ({ handleToggleSidebar }) => {
  const [inputSearch, setInputSearch] = useState("");

  const history = useHistory();
  const { user } = useSelector((state) => state.auth);

  const handleSubmit = (event) => {
    event.preventDefault();
    history.push(`/search/${inputSearch}`);
  };

  return (
    <div className="border border-dark header">
      <FaBars
        className="header__menu"
        size={26}
        onClick={() => handleToggleSidebar()}
      />
      <Link to="/">
        <img
          src="http://pngimg.com/uploads/youtube/youtube_PNG2.png"
          alt=""
          className="header__logo"
        />
      </Link>

      <form onSubmit={handleSubmit} action="">
        <input
          placeholder="Search"
          type="text"
          onChange={(e) => setInputSearch(e.target.value)}
        />
        <button type="submit">
          <AiOutlineSearch size={22}></AiOutlineSearch>
        </button>
      </form>

      <div className="header__icons">
        <MdNotifications size={28} />
        <MdApps size={28} />
        <img src={user?.photoURL} alt="avatar" />
      </div>
    </div>
  );
};

export default Header;
