import React from 'react';

export default function ContentInput(props) {
  const { inputData, disciplines, isMine, currentData } = props;
  const {
    name,
    onChange,
    modifier,
    isInput,
    isLarge,
    errorMessage,
    type,
    pattern,
  } = inputData;

  const [blur, setBlur] = React.useState(false);

  function handleBlur(e) {
    setBlur(true);
  }

  function errorMessageRenderer() {
    return <span className="content-input__error-msg">{errorMessage}</span>;
  }

  function valuesRenderer() {
    if (
      (currentData[name] && name === 'colaborators') ||
      name === 'createdProyects' ||
      name === 'colaboratingInProyects'
    ) {
      return `${currentData[name].length} proyectos`;
    }
    if (currentData[name]) {
      return currentData[name];
    }
    return '-';
  }

  function disciplineRenderer() {
    return (
      <>
        <select
          className="content-input content-input__info-value"
          name="discipline"
          onChange={onChange}
          defaultValue={currentData.discipline}
          placeholder={currentData.discipline}
          pattern={pattern}
          onBlur={handleBlur}
          blur={blur.toString()}
        >
          {disciplines.map((discipline) => {
            return (
              <option value={discipline} key={disciplines.indexOf(discipline)}>
                {discipline}
              </option>
            );
          })}
        </select>
        {errorMessageRenderer()}
      </>
    );
  }

  function largeInputRenderer() {
    return (
      <>
        <textarea
          className={`content-input__info-value content-input ${
            modifier || ''
          }`}
          key={name}
          placeholder={currentData[name]}
          onChange={onChange}
          name={name}
          type={type}
          pattern={pattern}
          onBlur={handleBlur}
          blur={blur.toString()}
        />
        {errorMessageRenderer()}
      </>
    );
  }

  const inputRenderer = function () {
    return (
      <>
        <input
          className={`content-input__info-value content-input ${
            modifier || ''
          }`}
          placeholder={currentData[name]}
          onChange={onChange}
          name={name}
          type={type}
          pattern={pattern}
          onBlur={handleBlur}
          blur={blur.toString()}
        />
        {errorMessageRenderer()}
      </>
    );
  };

  function paragraphRenderer() {
    return (
      <p className={`content-input__info-value ${modifier || ''}`}>
        {valuesRenderer()}
      </p>
    );
  }

  function elementRenderer() {
    if (isMine && isInput && isLarge) {
      return largeInputRenderer();
    }
    if (isMine && isInput) {
      return inputRenderer();
    }
    if (name === 'discipline' && isMine) {
      return disciplineRenderer();
    } else {
      return paragraphRenderer();
    }
  }
  return <div className="content-input__container">{elementRenderer()}</div>;
}
