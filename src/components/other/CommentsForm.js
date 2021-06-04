import React, { useState } from 'react';
import './CommentsForm.css';
import Button from '@material-ui/core/Button';
import { useForm } from 'react-hook-form';

function CommentsForm({ _id }) {
  const [formData, setFormData] = useState();

  // Sets up our form states
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [hasSubmitted, setHasSubmitted] = useState(false);

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    setIsSubmitting(true);

    setFormData(data);
    console.log(formData);
  };

  if (isSubmitting) {
    // Returns a "Submitting comment" state if being processed
    return <h3>Submitting comment…</h3>;
  }

  if (hasSubmitted) {
    // Returns the data that the user submitted for them to preview after submission
    return (
      <div className="support">
        <h3 className="support__header">
          Thanks for your comment! It has to be authorized by an administrator
        </h3>
        <ul>
          <p className="support__dataContainer">
            <p className="support__data">
              {' '}
              <span>Name:</span> {formData.name}
            </p>

            <p className="support__data">
              {' '}
              <span>Email:</span> {formData.email}
            </p>
            <p className="support__data">
              {' '}
              <span>Comment:</span> {formData.comment}
            </p>
          </p>
        </ul>
      </div>
    );
  }

  return (
    <form className="commentsForm" onSubmit={handleSubmit(onSubmit)} disabled>
      {' '}
      <h5>Share a comment</h5>
      <input {...register('_id')} type="hidden" name="_id" value={_id} />
      {/* register your input into the hook by invoking the "register" function */}
      <input
        placeholder="name"
        className="input"
        name="name"
        {...register('name', { required: true })}
      />
      {/* include validation with required or other standard HTML validation rules */}
      <input
        placeholder="e-mail"
        className="input"
        name="email"
        type="email"
        {...register('email', { required: true })}
      />
      <textarea
        {...register('comment', { required: true })}
        name="comment"
        rows="8"
        placeholder="Share your comment"></textarea>
      {/* errors will return when field validation fails  */}
      {errors.exampleRequired && <span>This field is required</span>}
      <Button variant="contained" className="shareButton" type="submit">
        {' '}
        Submit
      </Button>
    </form>
  );
}

export default CommentsForm;
