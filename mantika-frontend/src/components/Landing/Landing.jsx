import React from 'react';
import { Link } from 'react-router-dom';
import logo from '../../images/Logo.svg';
import { TextContext } from '../../contexts/TextContext';

export default function Landing() {
  const text = React.useContext(TextContext);

  return (
    <section className="landing">
      <img
        className="landing__logo landing__animation"
        src={logo}
        alt="Mantika logo"
      />
      <h1 className="landing__title landing__animation">Mantika</h1>
      <h2 className="landing__subtitle landing__animation">
        {text.landingSubtitle}
      </h2>
      <p className="landing__paragraph landing__animation">
        {text.landingParagraphFirst}
      </p>
      <p className="landing__paragraph landing__animation">
        {text.landingParagraphSecond}
      </p>
      <div className="landing__btn-container landing__animation">
        <Link className="landing__btn" to="/register">
          {text.registerBtn}{' '}
        </Link>
        <Link className="landing__btn" to="/login">
          Login
        </Link>
      </div>
    </section>
  );
}
