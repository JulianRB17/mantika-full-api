import React from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { CurrentUserContext } from '../../contexts/CurrentUserContext';
import searchIcon from '../../images/search-icon.svg';

export default function Navigation(props) {
  const {
    isAuthorized,
    searchInput,
    onChange,
    onLogout,
    onAllProyectsRenderer,
    onSubmit,
  } = props;
  const currentUser = React.useContext(CurrentUserContext);

  const navigate = useNavigate();

  function handleLogout(e) {
    e.preventDefault();
    onLogout();
  }

  function handleAllProyectsRenderer(e) {
    e.preventDefault();
    onAllProyectsRenderer();
    navigate('/home');
  }

  function handleSearch(e) {
    e.preventDefault();
    onSubmit();
  }

  if (isAuthorized) {
    return (
      <section className="navigation">
        <div className="navigation__links-container">
          <NavLink
            className="navigation__link"
            onClick={handleAllProyectsRenderer}
          >
            Home
          </NavLink>
          <NavLink className="navigation__link" to="/about">
            About us
          </NavLink>
          <NavLink
            className="navigation__link"
            to={`../users/${currentUser._id}`}
          >
            {currentUser.username}
          </NavLink>
          <NavLink
            className="navigation__link"
            to="/landing"
            onClick={handleLogout}
          >
            Logout
          </NavLink>
        </div>
        <form
          className="navigation__searchbar-container"
          onSubmit={handleSearch}
        >
          <input
            type="search"
            placeholder="Search proyect"
            onChange={onChange}
            value={searchInput}
            className="navigation__searchbar"
          />
          <button className="navigation__btn">
            <img
              src={searchIcon}
              className="navigation__btn-img"
              alt="nagigation lookup icon"
            />
          </button>
        </form>
      </section>
    );
  } else {
    return (
      <section className="navigation">
        <div className="navigation__links-container">
          <NavLink className="navigation__link" to="/landing">
            Landing
          </NavLink>
          <NavLink className="navigation__link" to="/about">
            About us
          </NavLink>
          <NavLink className="navigation__link" to="/login">
            Login
          </NavLink>
          <NavLink className="navigation__link" to="/register">
            Register
          </NavLink>
        </div>
      </section>
    );
  }
}
