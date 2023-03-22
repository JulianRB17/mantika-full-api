import React from 'react';
import { Link } from 'react-router-dom';
import logo from '../../images/Logo.svg';
import Navigation from '../Navigation/Navigation';

export default function Header(props) {
  const {
    isAuthorized,
    onChange,
    onLanguageChangeEn,
    onLanguageChangeEs,
    onLogout,
    onAllProyectsRenderer,
    onSubmit,
  } = props;

  function handleLanguageChangeEn(e) {
    e.preventDefault();
    onLanguageChangeEn();
  }
  function handleLanguageChangeEs(e) {
    e.preventDefault();
    onLanguageChangeEs();
  }

  return (
    <section className="header">
      <Link to="/about" className="header__logo-container">
        <img className="header__logo" src={logo} alt="logo" />
        <h1 className="header__title">Mantika</h1>
      </Link>
      <div className="header__btn-container">
        <button onClick={handleLanguageChangeEn} className="header__btn">
          EN
        </button>
        <button onClick={handleLanguageChangeEs} className="header__btn">
          ES
        </button>
      </div>
      <Navigation
        onAllProyectsRenderer={onAllProyectsRenderer}
        isAuthorized={isAuthorized}
        onChange={onChange}
        onLogout={onLogout}
        onSubmit={onSubmit}
      />
    </section>
  );
}
