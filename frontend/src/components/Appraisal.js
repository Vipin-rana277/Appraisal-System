import React, { useState } from 'react';
import axios from 'axios';

const CreateQuestion = () => {
  const [questionText, setQuestionText] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    
    axios.post('/questions', { questionText })
      .then((response) => {
        setQuestionText(''); // Clear the input field
      })
      .catch((error) => {
        console.error(error);
      });
  };

  return (
    <div>
      <h2>Create New Appraisal Question</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="questionText">Question Text:</label>
          <input
            type="text"
            id="questionText"
            value={questionText}
            onChange={(e) => setQuestionText(e.target.value)}
            required
          />
        </div>
        <button type="submit">Add Question</button>
      </form>
    </div>
  );
};

export default CreateQuestion;
