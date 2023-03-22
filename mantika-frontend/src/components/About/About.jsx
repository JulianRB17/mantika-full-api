import React from 'react';
import logo from '../../images/Logo.svg';
import { TextContext } from '../../contexts/TextContext';

export default function About() {
  const text = React.useContext(TextContext);

  return (
    <section className="about">
      <img
        className="about__logo about__animation"
        src={logo}
        alt="Mantika logo"
      />
      <h1 className="about__title about__animation">About us</h1>
      <h2 className="about__subtitle about__animation">
        {text.aboutUsSubtitle}
      </h2>
      <p className="about__paragraph about__animation">
        {text.aboutUsParagraphZero}
      </p>
      <h3 className="about__paragraph-subtitle about__animation">
        {text.aboutUsParagraphTitleFirst}
      </h3>
      <p className="about__paragraph about__animation">
        {text.aboutUsParagraphFirst}
      </p>
      <p className="about__paragraph about__animation">
        {text.aboutUsParagraphSecond}
      </p>
      <h3 className="about__paragraph-subtitle about__animation">
        {text.aboutUsParagraphTitleSecond}
      </h3>
      <p className="about__paragraph about__animation">
        {text.aboutUsParagraphThird}
      </p>
      <p className="about__paragraph about__animation">
        {text.aboutUsParagraphFourth}
      </p>
      <p className="about__paragraph about__animation">
        {text.aboutUsParagraphFifth}
      </p>
      <p className="about__paragraph about__animation">
        {text.aboutUsParagraphSixth}
      </p>
    </section>
  );
}
