import React from 'react';
import { useParams } from 'react-router-dom';
import { CurrentUserContext } from '../../contexts/CurrentUserContext';
import defaultImg from '../../images/default.jpg';
import { TextContext } from './../../contexts/TextContext';
import api from '../../utils/api';
import ContentInput from './../ContentInput/ContentInput';

export default function UserContent(props) {
  const currentUser = React.useContext(CurrentUserContext);
  const text = React.useContext(TextContext);
  const {
    elements,
    onEdit,
    onColaborate,
    disciplines,
    openPopupWithConfirmation,
    setSelectedProyect,
  } = props;
  const { id } = useParams();
  const [isMine, setIsMine] = React.useState(false);
  const [data, setData] = React.useState('');
  const [isValidForm, setValidForm] = React.useState(false);

  React.useEffect(() => {
    (async function () {
      const proyectData = await api.getProyect(id);
      setData(proyectData);
      if (proyectData.owner === currentUser._id) {
        setIsMine(true);
        setSelectedProyect(proyectData._id);
      } else {
        setIsMine(false);
      }
    })();
  }, [id, currentUser._id, setSelectedProyect]);

  function handleEdit(e) {
    e.preventDefault();
    onEdit(id);
  }

  function handleColaborate(e) {
    e.preventDefault();
    onColaborate(id);
  }

  const handleDelete = function (e) {
    e.preventDefault();
    openPopupWithConfirmation();
  };

  function handleChange(e) {
    const form = e.target.form;
    if (form.checkValidity() === true) {
      setValidForm(true);
    } else {
      setValidForm(false);
    }
  }

  function btnClassName() {
    if (isMine && !isValidForm) {
      return 'proyect-content__submit-btn_inactive';
    }
  }

  return (
    <form
      className="proyect-content"
      onSubmit={isMine ? handleEdit : handleColaborate}
      onChange={handleChange}
    >
      <button
        className={`proyect-content__trash-btn ${isMine || 'hidden'}`}
        onClick={handleDelete}
      />
      <img
        src={data.proyectPic || defaultImg}
        alt="Imagen de perfil"
        className="proyect-content__profile-img"
      />
      <div className="proyect-content__info-container">
        {elements.map((element) => {
          const { title } = element;
          return (
            <div
              className="proyect-content__info-element"
              key={'ProyectContent' + element.name}
            >
              <h2 className="proyect-content__info-key">{title}</h2>
              <ContentInput
                inputData={element}
                disciplines={disciplines}
                isMine={isMine}
                currentData={data}
              />
            </div>
          );
        })}
      </div>
      <button
        className={`proyect-content__submit-btn ${btnClassName()}`}
        type="submit"
        disabled={isMine ? !isValidForm : false}
      >
        {isMine ? text.editBtn : text.colaborateBtn}
      </button>
    </form>
  );
}
