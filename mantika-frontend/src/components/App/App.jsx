import React from 'react';
import { Routes, Route, useNavigate } from 'react-router-dom';
import Header from '../Header/Header';
import Landing from '../Landing/Landing';
import Form from '../Form/Form';
import About from '../About/About';
import Popup from '../Popup/Popup';
import Footer from '../Footer/Footer';
import Main from '../Main/Main';
import BackgroundImg from '../BackgroundImg/BackgroundImg';
import Preloader from '../Preloader/Preloader';
import './app.css';
import { translationApi } from '../../utils/translationApi';
import api from '../../utils/api';
import { register, authorize, checkToken } from '../../utils/auth';
import { CurrentUserContext } from '../../contexts/CurrentUserContext';
import { TextContext } from '../../contexts/TextContext';
import Sidebar from '../Sidebar/Sidebar';
import PopupWithConfirmation from '../PopupWithConfirmation/PopupWithConfirmation';
import UserContent from './../UserContent/UserContent';
import ProyectContent from './../ProyectContent/ProyectContent';
import ProtectedRoute from './../ProtectedRoute/ProtectedRoute';

import hiphopImg from '../../images/hip-hop-dance.jpg';
import graffitiImg from '../../images/graffiti.jpg';
import balletImg from '../../images/ballet.jpg';
import balletDancerImg from '../../images/ballet-woman.jpg';
import brushImg from '../../images/brush.jpg';
import potteryImg from '../../images/pottery.jpg';
import modelImg from '../../images/woman-model.jpg';

function App() {
  const { useState } = React;
  const [isPopupOpen, setPopupOpen] = useState(false);
  const [jwt, setJwt] = useState('');
  const [isAuthorized, setAuthorized] = useState(false);
  const [searchInput, setSearchInput] = useState('');
  const [currentUser, setCurrentUser] = useState('');
  const [isLoading, setLoading] = useState(false);
  const [text, setText] = useState(translationApi.spanishObject);
  const [disciplines, setDisciplines] = useState(translationApi.disciplines);
  const [translated, setTranslated] = useState(false);
  const [popupError, setPopupError] = useState(false);
  const [isUserPopupWithConfirmationOpen, setUserPopupWithConfirmationOpen] =
    useState(false);
  const [
    isProyectPopupWithConfirmationOpen,
    setProyectPopupWithConfirmationOpen,
  ] = useState(false);
  const [proyects, setProyects] = useState('');
  const [selectedProyect, setSelectedProyect] = useState('');
  const [registerInputData, setRegisterInputData] = useState({});
  const [loginInputData, setLoginInputData] = useState({});
  const [createProyectInputData, setCreateProyectInputData] = useState({});
  const [updateProyectInputData, setUpdateProyectInputData] = useState({});
  const [updateUserInputData, setUpdateUserInputData] = useState({});

  const navigate = useNavigate();
  const navigation = React.useRef(useNavigate());

  function handleError(err) {
    console.error(err);
    setPopupError(true);
    setPopupOpen(true);
    setLoading(false);
  }

  function handleSuccess() {
    setLoading(false);
    setPopupError(false);
    setPopupOpen(true);
  }

  React.useEffect(() => {
    const token = localStorage.getItem('jwt');
    (async function () {
      try {
        if (token) {
          setLoading(true);
          const res = await checkToken(token);
          if (res.currentUser) {
            setJwt(token);
            setAuthorized(true);
            navigation.current('/landing');
            setLoading(false);
          } else {
            setAuthorized(false);
            setLoading(false);
            navigation.current('/landing', { replace: true });
          }
        }
      } catch (err) {
        handleError(err);
      }
    })();
  }, [navigation]);

  React.useEffect(() => {
    (async function () {
      if (isAuthorized) {
        try {
          setLoading(true);
          const userInfo = await api.getUserInfo(jwt);
          const initialProyects = await api.getProyects();
          setCurrentUser(userInfo.currentUser);
          setProyects(initialProyects);
          setLoading(false);
        } catch (err) {
          console.error(err);
        }
      }
    })();
  }, [isAuthorized, jwt]);

  React.useEffect(() => {
    if (jwt) navigation.current('/home');
  }, [jwt, navigation]);

  function handleClosePopup() {
    setPopupOpen(false);
  }

  function handleClosePopupWithConfirmation() {
    setUserPopupWithConfirmationOpen(false);
    setProyectPopupWithConfirmationOpen(false);
  }

  function handleOpenUserPopupWithConfirmation() {
    setUserPopupWithConfirmationOpen(true);
  }

  function handleOpenProyectPopupWithConfirmation() {
    setProyectPopupWithConfirmationOpen(true);
  }

  async function handleUserRegistration() {
    try {
      setLoading(true);
      const data = await register(registerInputData);
      if (data.token) {
        localStorage.setItem('jwt', data.token);
        setJwt(data.token);
        navigate('/home', { replace: true });
        setAuthorized(true);
        setLoading(false);
      } else {
        throw new Error('Algo salió mal');
      }
    } catch (err) {
      handleError(err);
    }
  }
  async function handleLogin() {
    try {
      setLoading(true);
      const data = await authorize(loginInputData);
      if (data.token) {
        setJwt(data.token);
        localStorage.setItem('jwt', data.token);
        navigate('/home', { replace: true });
        setAuthorized(true);
        setLoading(false);
      } else {
        throw new Error('Algo salió mal');
      }
    } catch (err) {
      handleError(err);
    }
  }

  async function handleEditUser() {
    try {
      setLoading(true);
      const data = await api.updateUserInfo(updateUserInputData);

      if (data) {
        setCurrentUser(data.user);
        navigate('/home', { replace: true });
        handleSuccess();
      } else {
        throw new Error('Algo salió mal');
      }
    } catch (err) {
      handleError(err);
    }
  }

  function handleLogout() {
    setJwt('');
    setAuthorized(false);
    localStorage.removeItem('jwt');
    navigate('/', { replace: true });
  }

  async function handleDeleteUser() {
    try {
      await api.deleteUser(currentUser._id);
      handleLogout();
    } catch (err) {
      handleError(err);
    }
  }

  async function handleMyProyectsRenderer() {
    try {
      setLoading(true);
      const myProyectsData = await api.getMyProyects();
      setProyects(myProyectsData);
      setLoading(false);
    } catch (err) {
      handleError(err);
    }
  }

  async function handleAllProyectsRenderer() {
    try {
      setLoading(true);
      const proyects = await api.getProyects();
      setProyects(proyects);
      setLoading(false);
    } catch (err) {
      handleError(err);
    }
  }

  async function handleCreateProyect() {
    try {
      setLoading(true);
      const proyectData = await api.createProyect(createProyectInputData);
      await api.updateUserCreatedInfo(proyectData.proyect._id);
      await handleAllProyectsRenderer();
      navigate('/home', { replace: true });
      handleSuccess();
    } catch (err) {
      handleError(err);
    }
  }

  async function handleEditProyect(id) {
    try {
      setLoading(true);
      const newData = await api.updateProyectInfo(updateProyectInputData, id);
      if (newData) {
        await handleAllProyectsRenderer();
        navigate('/home', { replace: true });
        handleSuccess();
      } else {
        throw new Error('Algo salió mal');
      }
    } catch (err) {
      handleError(err);
    }
  }

  async function handleGetProyect(id) {
    try {
      setLoading(true);
      const data = await api.getProyect(id);
      setLoading(false);
      return data;
    } catch (err) {
      handleError(err);
    }
  }

  async function handleDeleteProyect() {
    try {
      setLoading(true);
      await api.deleteProyect(selectedProyect);
      handleAllProyectsRenderer();
      navigate('/home', { replace: true });
      handleSuccess();
    } catch (err) {
      handleError(err);
    }
  }

  async function handleColaborate(proyectId) {
    try {
      setLoading(true);
      await api.updateProyectColaborations(proyectId);
      await api.updateUserColaborationsInfo(proyectId);
      handleAllProyectsRenderer();
      handleSuccess();
    } catch (err) {
      handleError(err);
    }
  }

  async function handleSearch() {
    try {
      if (searchInput === '') return;
      setLoading(true);
      const proyects = await api.getProyects();
      const filteredProyects = proyects.filter((proyect) => {
        return (
          proyect.proyectName
            .toLowerCase()
            .includes(searchInput.toLowerCase()) ||
          proyect.description
            .toLowerCase()
            .includes(searchInput.toLowerCase()) ||
          proyect.discipline
            .toLowerCase()
            .includes(searchInput.toLowerCase()) ||
          proyect.city.toLowerCase().includes(searchInput.toLowerCase())
        );
      });
      setProyects(filteredProyects);
      navigate('/home');
      setLoading(false);
    } catch (err) {
      handleError(err);
    }
    setLoading(false);
  }

  async function handleLanguageChangeEn() {
    try {
      if (!translated) {
        setLoading(true);
        const englishText = await translationApi.createTranslatedObject();
        const englishDisciplines =
          await translationApi.createTranslatedDisciplines();
        setText(englishText);
        setDisciplines(englishDisciplines);
        setTranslated(true);
        setLoading(false);
      }
      if (translated) {
        setText(translationApi.translatedObject);
        setDisciplines(translationApi.translatedDisciplines);
      }
    } catch (err) {
      handleError(err);
    }
  }

  function handleLanguageChangeEs() {
    setText(translationApi.spanishObject);
  }

  function handleRegistrationChange(e) {
    const target = e.target;
    setRegisterInputData({
      ...registerInputData,
      [target.name]: target.value,
    });
  }

  function handleLoginChange(e) {
    const target = e.target;
    setLoginInputData({
      ...loginInputData,
      [target.name]: target.value,
    });
  }

  function handleCreateProyectChange(e) {
    const target = e.target;
    setCreateProyectInputData({
      ...createProyectInputData,
      [target.name]: target.value,
    });
  }

  function handleUpdateProyectChange(e) {
    const target = e.target;
    setUpdateProyectInputData({
      ...updateProyectInputData,
      [target.name]: target.value,
    });
  }

  function handleUpdateUserChange(e) {
    const target = e.target;
    setUpdateUserInputData({
      ...updateUserInputData,
      [target.name]: target.value,
    });
  }

  function handleSearchInputChange(e) {
    setSearchInput(e.target.value);
  }

  function protectedRoutes() {
    return (
      <>
        <Route
          path="/home"
          element={
            <>
              <Sidebar onMyProyectsRenderer={handleMyProyectsRenderer} />
              <Main
                proyects={proyects}
                openPopupWithConfirmation={
                  handleOpenProyectPopupWithConfirmation
                }
                setSelectedProyect={setSelectedProyect}
              />
            </>
          }
        />
        <Route
          path="/users/:id"
          element={
            <>
              <UserContent
                elements={[
                  {
                    name: 'username',
                    type: 'text',
                    title: text.username,
                    errorMessage: text.usernameErrorMessage,
                    pattern: '[^<>]{3,20}',
                    isInput: true,
                    onChange: handleUpdateUserChange,
                  },
                  {
                    name: 'discipline',
                    type: 'discipline',
                    title: text.discipline,
                    errorMessage: text.disciplineErrorMessage,
                    pattern: '[^-]',
                    onChange: handleUpdateUserChange,
                  },
                  {
                    name: 'profilePic',
                    type: 'url',
                    isInput: true,
                    title: text.proyectImage,
                    errorMessage: text.proyectPicErrorMessage,
                    onChange: handleUpdateUserChange,
                  },
                  {
                    name: 'description',
                    type: 'text',
                    modifier: 'user-content__input_large',
                    title: text.description,
                    pattern: '[^<>]{9,200}',
                    errorMessage: text.descriptionErrorMessage,
                    isInput: true,
                    isLarge: true,
                    onChange: handleUpdateUserChange,
                  },
                  {
                    title: text.city,
                    name: 'city',
                    isInput: true,
                    errorMessage: text.cityErrorMessage,
                    pattern: '[^<>]{3,20}',
                    type: 'text',
                    onChange: handleUpdateUserChange,
                  },
                  {
                    title: text.createdProyects,
                    name: 'createdProyects',
                  },
                  {
                    title: text.colaboratingIn,
                    name: 'colaboratingInProyects',
                  },
                ]}
                submitText="Edit"
                onSubmit={handleEditUser}
                openPopupWithConfirmation={handleOpenUserPopupWithConfirmation}
                disciplines={disciplines}
              />
              <BackgroundImg src={modelImg} />
            </>
          }
        />
        <Route
          path="/proyect/create"
          element={
            <>
              <Sidebar onMyProyectsRenderer={handleMyProyectsRenderer} />
              <Form
                inputs={[
                  {
                    name: 'proyectName',
                    type: 'text',
                    title: text.proyect,
                    errorMessage: text.proyectNameErrorMessage,
                    pattern: '[^<>]{3,20}',
                    onChange: handleCreateProyectChange,
                  },
                  {
                    name: 'proyectPic',
                    type: 'url',
                    title: text.proyectImage,
                    errorMessage: text.proyectPicErrorMessage,
                    onChange: handleCreateProyectChange,
                  },
                  {
                    name: 'description',
                    type: 'text',
                    modifier: 'form__input_large',
                    title: text.description,
                    pattern: '[^<>]{9,200}',
                    errorMessage: text.descriptionErrorMessage,
                    onChange: handleCreateProyectChange,
                  },
                  {
                    name: 'city',
                    type: 'text',
                    title: text.city,
                    errorMessage: text.cityErrorMessage,
                    pattern: '[^<>]{3,20}',
                    onChange: handleCreateProyectChange,
                  },
                  {
                    name: 'discipline',
                    title: text.discipline,
                    errorMessage: text.disciplineErrorMessage,
                    pattern: '[^-]',
                    onChange: handleCreateProyectChange,
                  },
                ]}
                formName={text.newProyectTitle}
                submitText={text.createBtn}
                disciplines={disciplines}
                onSubmit={handleCreateProyect}
              />

              <BackgroundImg src={brushImg} />
            </>
          }
        />
        <Route
          path="/proyect/:id"
          element={
            <>
              <ProyectContent
                elements={[
                  {
                    name: 'proyectName',
                    type: 'text',
                    title: text.proyect,
                    errorMessage: text.proyectNameErrorMessage,
                    pattern: '[^<>]{3,20}',
                    isInput: true,
                    onChange: handleUpdateProyectChange,
                  },
                  {
                    name: 'proyectPic',
                    type: 'url',
                    isInput: true,
                    title: text.proyectImage,
                    errorMessage: text.proyectPicErrorMessage,
                    onChange: handleUpdateProyectChange,
                  },
                  {
                    name: 'discipline',
                    title: text.discipline,
                    errorMessage: text.disciplineErrorMessage,
                    pattern: '[^-]',
                    onChange: handleUpdateProyectChange,
                  },
                  {
                    name: 'description',
                    title: text.description,
                    type: 'text',
                    modifier: 'content-input__large',
                    isLarge: true,
                    isInput: true,
                    pattern: '[^<>]{9,200}',
                    onChange: handleUpdateProyectChange,
                  },
                  {
                    name: 'city',
                    type: 'text',
                    title: text.city,
                    errorMessage: text.cityErrorMessage,
                    isInput: true,
                    pattern: '[^<>]{3,20}',
                    onChange: handleUpdateProyectChange,
                  },
                  {
                    title: text.colaborators,
                    name: 'colaborators',
                  },
                ]}
                onEdit={handleEditProyect}
                onGetProyect={handleGetProyect}
                onColaborate={handleColaborate}
                openPopupWithConfirmation={
                  handleOpenProyectPopupWithConfirmation
                }
                disciplines={disciplines}
                setSelectedProyect={setSelectedProyect}
                submitText={text.colaborateBtn}
              />
              <BackgroundImg src={potteryImg} />
            </>
          }
        />
      </>
    );
  }

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <TextContext.Provider value={text}>
        <div className="app">
          <Header
            isAuthorized={isAuthorized}
            onLanguageChangeEn={handleLanguageChangeEn}
            onLanguageChangeEs={handleLanguageChangeEs}
            onAllProyectsRenderer={handleAllProyectsRenderer}
            onChange={handleSearchInputChange}
            onLogout={handleLogout}
            onSubmit={handleSearch}
          />
          <Preloader isLoading={isLoading} />
          <Routes>
            <Route
              path="/landing"
              element={
                <>
                  <Landing />
                  <BackgroundImg src={hiphopImg} />
                </>
              }
            />
            <Route
              path="/register"
              element={
                <>
                  <Form
                    inputs={[
                      {
                        name: 'username',
                        type: 'text',
                        title: text.username,
                        errorMessage: text.usernameErrorMessage,
                        pattern: '[^<>]{3,20}',
                        onChange: handleRegistrationChange,
                      },
                      {
                        name: 'email',
                        type: 'email',
                        title: 'Email',
                        errorMessage: text.emailErrorMessage,
                        onChange: handleRegistrationChange,
                      },
                      {
                        name: 'password',
                        type: 'password',
                        title: text.password,
                        errorMessage: text.passwordErrorMessage,
                        pattern:
                          '^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{6,20}$',
                        onChange: handleRegistrationChange,
                      },
                      {
                        name: 'discipline',
                        type: 'discipline',
                        title: text.discipline,
                        errorMessage: text.disciplineErrorMessage,
                        pattern: '[^-]',
                        onChange: handleRegistrationChange,
                      },
                    ]}
                    formName="Register"
                    submitText={text.registerBtn}
                    onSubmit={handleUserRegistration}
                    disciplines={disciplines}
                  />
                  <BackgroundImg src={graffitiImg} />
                </>
              }
            />
            <Route
              path="/login"
              element={
                <>
                  <Form
                    inputs={[
                      {
                        name: 'email',
                        type: 'email',
                        title: 'Email',
                        errorMessage: text.emailErrorMessage,
                        onChange: handleLoginChange,
                      },
                      {
                        name: 'password',
                        type: 'password',
                        title: text.password,
                        pattern:
                          '^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{6,20}$',
                        errorMessage: text.passwordErrorMessage,
                        onChange: handleLoginChange,
                      },
                    ]}
                    formName="Login"
                    submitText="Login"
                    onSubmit={handleLogin}
                  />
                  <BackgroundImg src={balletImg} />
                </>
              }
            />
            <Route
              path="/about"
              element={
                <>
                  <About />
                  <BackgroundImg src={balletDancerImg} />
                </>
              }
            />
            <Route
              path="/*"
              element={
                <ProtectedRoute isAuthorized={isAuthorized}>
                  <Routes>{protectedRoutes()}</Routes>
                </ProtectedRoute>
              }
            />
          </Routes>
          <Popup
            popupError={popupError}
            isPopupOpen={isPopupOpen}
            onClose={handleClosePopup}
          />
          <PopupWithConfirmation
            isOpen={isUserPopupWithConfirmationOpen}
            onClose={handleClosePopupWithConfirmation}
            onDelete={handleDeleteUser}
          />
          <PopupWithConfirmation
            isOpen={isProyectPopupWithConfirmationOpen}
            onClose={handleClosePopupWithConfirmation}
            onDelete={handleDeleteProyect}
          />
          <Footer />
        </div>
      </TextContext.Provider>
    </CurrentUserContext.Provider>
  );
}

export default App;
