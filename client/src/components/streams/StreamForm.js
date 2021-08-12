import { Form, Field } from "react-final-form";

const StreamForm = (props) => {
  const renderError = ({ error, touched }) => {
    if (touched && error) {
      return (
        <div className="ui error message">
          <div className="header">{error}</div>
        </div>
      );
    }
  };

  const renderInput = ({ input, label, meta }) => {
    const className = `field ${meta.error && meta.touched ? "error" : ""}`;
    return (
      <div className={className}>
        <label>{label}</label>
        <input {...input} autoComplete="off" />
        {renderError(meta)}
      </div>
    );
  };

  const submitHandler = (formValues) => {
    props.onSubmit(formValues);
  };

  const validate = (formValues) => {
    const errors = {};
    if (!formValues.title) {
      errors.title = "You must enter a title!";
    }
    if (!formValues.description) {
      errors.description = "You must enter a description!";
    }
    return errors;
  };

  const renderForm = ({ handleSubmit }) => (
    <form onSubmit={handleSubmit} className="ui form error">
      <Field name="title" component={renderInput} label="Enter Title" />
      <Field name="description" component={renderInput} label="Enter Description" />
      <button className="ui button primary">Submit</button>
    </form>
  );

  return (
    <Form
      initialValues={props.initialValues}
      onSubmit={submitHandler}
      validate={validate}
      render={renderForm}
    />
  );

  ////////////////////

  // return (
  //   <form className="ui form error" onSubmit={props.handleSubmit(submitHandler)}>
  //     <Field name="title" component={renderInput} label="Enter Title" />
  //     <Field name="description" component={renderInput} label="Enter Description" />
  //     <button className="ui button primary">Submit</button>
  //   </form>
  // );
};

export default StreamForm;
