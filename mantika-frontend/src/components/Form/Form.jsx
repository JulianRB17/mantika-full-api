import React from 'react';
import Input from '../Input/Input';

export default function Form(props) {
  const { formName, inputs, submitText, onSubmit, disciplines } = props;
  const [isValidForm, setValidForm] = React.useState(false);

  function handleSubmit(e) {
    e.preventDefault();
    onSubmit();
  }

  function handleChange(e) {
    const form = e.target.form;
    if (form.checkValidity() === true) {
      setValidForm(true);
    } else {
      setValidForm(false);
    }
  }

  return (
    <form className="form" onSubmit={handleSubmit} onChange={handleChange}>
      <div className="form__overlay" />
      <h1 className="form__title">{formName}</h1>
      {inputs.map((input) => {
        return (
          <Input
            inputData={input}
            disciplines={disciplines}
            key={formName + input.name}
          />
        );
      })}
      <button
        type="submit"
        className={`form__submit-btn ${
          isValidForm || 'form__submit-btn_inactive'
        }`}
        disabled={!isValidForm}
      >
        {submitText}
      </button>
    </form>
  );
}
