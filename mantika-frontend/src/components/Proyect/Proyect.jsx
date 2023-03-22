import React from 'react';
import { Link } from 'react-router-dom';
import { CurrentUserContext } from '../../contexts/CurrentUserContext';
import { TextContext } from '../../contexts/TextContext';
import defaultImg from '../../images/default.jpg';
import api from '../../utils/api';

export default function Proyect(props) {
  const currentUser = React.useContext(CurrentUserContext);
  const text = React.useContext(TextContext);
  const [ownerObject, setOwnerObject] = React.useState('');

  const { openPopupWithConfirmation, setSelectedProyect } = props;
  const { proyectName, discipline, owner, proyectPic, colaborators, _id } =
    props.proyectData;

  React.useState(() => {
    (async () => {
      const user = await api.getUser(owner);
      setOwnerObject(user);
    })();
  });

  function handleDelete(e) {
    e.preventDefault();
    setSelectedProyect(_id);
    openPopupWithConfirmation();
  }

  return (
    <div className="proyect">
      <Link to={`/proyect/${_id}`}>
        <img
          className="proyect__img"
          src={proyectPic || defaultImg}
          alt={proyectName}
        />
      </Link>
      <h3 className="proyect__name">{proyectName}</h3>
      <div className="proyect__info-container">
        <div className="proyect__info">
          <h4 className="proyect__key">{text.discipline}</h4>
          <p className="proyect__value">{discipline}</p>
        </div>
        <div className="proyect__info">
          <h4 className="proyect__key">{text.creator}</h4>
          <Link to={`/users/${owner}`} className="proyect__value proyect__link">
            {ownerObject.username}
          </Link>
        </div>
        <div className="proyect__info">
          <h4 className="proyect__key">{text.colaborators}</h4>
          <p className="proyect__value">{colaborators.length}</p>
        </div>
        <div className="proyect__btns">
          <Link
            to={`/proyect/${_id}`}
            className={`proyect__btn ${currentUser._id === owner || 'hidden'}`}
          >
            {text.editBtn}
          </Link>
          <button
            className={`proyect__btn ${currentUser._id === owner || 'hidden'}`}
            onClick={handleDelete}
          >
            {text.deleteBtn}
          </button>
        </div>
      </div>
    </div>
  );
}
