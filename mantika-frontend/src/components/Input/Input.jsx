import React from 'react';

export default function Input(props) {
  const { inputData, disciplines } = props;
  const [blur, setBlur] = React.useState(false);

  function handleBlur(e) {
    setBlur(true);
  }

  function errorMessageRenderer() {
    return <span className="input__error-msg">{inputData.errorMessage}</span>;
  }

  function disciplineRenderer() {
    return (
      <>
        <label className="input__label">{inputData.title}</label>
        <select
          required
          className="input"
          name="discipline"
          onChange={inputData.onChange}
          pattern={inputData.pattern}
          onBlur={handleBlur}
          blur={blur.toString()}
          defaultValue=""
        >
          <option disabled value="">
            -- select an option --
          </option>
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

  function inputLargeRenderer() {
    return (
      <>
        <label className="input__label">{inputData.title}</label>
        <textarea
          required
          className={
            inputData.modifier ? `input ${inputData.modifier}` : 'input'
          }
          name={inputData.name}
          placeholder={inputData.title}
          type={inputData.type}
          onBlur={handleBlur}
          pattern={inputData.pattern}
          blur={blur.toString()}
          onChange={inputData.onChange}
        ></textarea>
        {errorMessageRenderer()}
      </>
    );
  }

  function inputRenderer() {
    return (
      <>
        <label className="input__label">{inputData.title}</label>
        <input
          required
          className={
            inputData.modifier ? `input ${inputData.modifier}` : 'input'
          }
          name={inputData.name}
          placeholder={inputData.title}
          type={inputData.type}
          onBlur={handleBlur}
          pattern={inputData.pattern}
          blur={blur.toString()}
          onChange={inputData.onChange}
        ></input>
        {errorMessageRenderer()}
      </>
    );
  }

  function inputsRenderer() {
    if (inputData.name === 'discipline') {
      return disciplineRenderer();
    }
    if (inputData.modifier) {
      return inputLargeRenderer();
    } else {
      return inputRenderer();
    }
  }

  return <div className="input__container">{inputsRenderer()}</div>;
}
