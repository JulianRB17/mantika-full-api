import React from 'react';
import { useParams } from 'react-router-dom';
import { CurrentUserContext } from '../../contexts/CurrentUserContext';
import api from '../../utils/api';
import defaultImg from '../../images/default.jpg';
import ContentInput from '../ContentInput/ContentInput';

export default function UserContent(props) {
  const currentUser = React.useContext(CurrentUserContext);
  const [user, setUser] = React.useState('');
  const [isMine, setIsMine] = React.useState(false);
  const [isValidForm, setValidForm] = React.useState(false);

  const {
    elements,
    submitText,
    onSubmit,
    disciplines,
    openPopupWithConfirmation,
  } = props;
  const { id } = useParams();

  React.useEffect(() => {
    (async () => {
      if (currentUser._id === id) {
        setUser(currentUser);
        setIsMine(true);
      } else {
        const selectedUser = await api.getUser(id);
        setUser(selectedUser);
        setIsMine(false);
      }
    })();
  }, [currentUser, id]);

  function handleSubmit(e) {
    e.preventDefault();
    onSubmit();
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

  if (user)
    return (
      <form
        className="user-content"
        onSubmit={handleSubmit}
        onChange={handleChange}
      >
        <button className="user-content__trash-btn" onClick={handleDelete} />
        <img
          src={user.profilePic || defaultImg}
          alt="Imagen de perfil"
          className="user-content__profile-img"
        />
        <div className="user-content__info-container">
          {elements.map((element) => {
            const { title } = element;
            return (
              <div
                className="user-content__info-element"
                key={elements.indexOf(element)}
              >
                <h2 className="user-content__info-key">{title}</h2>
                <ContentInput
                  inputData={element}
                  disciplines={disciplines}
                  isMine={isMine}
                  currentData={user}
                />
              </div>
            );
          })}
        </div>

        <button
          className={`user-content__submit-btn ${
            isValidForm || 'user-content__submit-btn_inactive'
          }`}
          type="submit"
          disabled={!isValidForm}
        >
          {submitText}
        </button>
      </form>
    );
}
