import React from 'react';
import popupSuccessIcon from '../../images/crear.png';
import popupErrorIcon from '../../images/sad-filled.png';

export default function Popup(props) {
  const { isPopupOpen, popupError, onClose } = props;

  function handleClose(e) {
    e.preventDefault();
    onClose();
  }

  function handleKeyDown(e) {
    if (e.key === 'Escape') {
      onClose();
    }
  }

  return (
    <section
      className={`popup ${isPopupOpen && 'popup_opened'}`}
      onKeyDown={handleKeyDown}
      tabIndex={0}
    >
      <div className="popup__overlay" onClick={handleClose}></div>
      <div className="popup__body">
        <button className="popup__close-btn" onClick={handleClose} />
        <img
          src={popupError ? popupErrorIcon : popupSuccessIcon}
          className="popup__icon"
          alt="popup icon"
        />
        <p className="popup__msg">
          {popupError ? 'Ups, algo salió mal' : '¡A seguir creando!'}
        </p>
      </div>
    </section>
  );
}
