import React from 'react';
import { Link } from 'react-router-dom';
import { CurrentUserContext } from '../../contexts/CurrentUserContext';
import { TextContext } from '../../contexts/TextContext';
import defaultImg from '../../images/default.jpg';

export default function Sidebar(props) {
  const { onMyProyectsRenderer } = props;
  const currentUser = React.useContext(CurrentUserContext);
  const text = React.useContext(TextContext);

  function handleMyProyectsRenderer(e) {
    e.preventDefault();
    onMyProyectsRenderer();
  }
  return (
    <section className="sidebar">
      <img
        src={currentUser.profilePic || defaultImg}
        alt="Imagen de perfil"
        className="sidebar__profile-img"
      />
      <h1 className="sidebar__user-name">{currentUser.username}</h1>
      <div className="sidebar__info-container">
        <div className="sidebar__info-element">
          <h2 className="sidebar__info-key">{text.discipline}</h2>
          <p className="sidebar__info-value">{currentUser.discipline}</p>
        </div>
        <div className="sidebar__info-element">
          <h2 className="sidebar__info-key">{text.city}</h2>
          <p className="sidebar__info-value">{currentUser.city}</p>
        </div>
        <div className="sidebar__info-element">
          <h2 className="sidebar__info-key">{text.description}</h2>
          <p className="sidebar__info-value">{currentUser.description}</p>
        </div>
        <div className="sidebar__info-element">
          <h2 className="sidebar__info-key">{text.createdProyects}</h2>
          <p className="sidebar__info-value">
            {currentUser.createdProyects
              ? currentUser.createdProyects.length
              : 0}
          </p>
        </div>
        <div className="sidebar__info-element">
          <h2 className="sidebar__info-key">{text.colaboratingIn}</h2>
          <p className="sidebar__info-value">{`${
            currentUser.colaboratingIn ? currentUser.colaboratingIn.length : 0
          } ${text.proyectsCountText}`}</p>
        </div>
      </div>
      <div className="sidebar__btns-container">
        <Link to={`../users/${currentUser._id}`} className="sidebar__btn">
          {text.editBtn}
        </Link>
        <button onClick={handleMyProyectsRenderer} className="sidebar__btn">
          {text.myProyectsBtn}
        </button>
      </div>
    </section>
  );
}
