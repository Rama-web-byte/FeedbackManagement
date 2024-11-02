// src/components/FeedbackForm.js
import React, { useState } from 'react';
import {
  TextField,
  Button,
  Container,
  Typography,
  Snackbar,
  Alert,
  MenuItem,
  Select,
  InputLabel,
  FormControl,
} from '@mui/material';

const FeedbackForm = () => {
  const [feedback, setFeedback] = useState({ id: '',userid: '', message: '', rating: '' });
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const [snackbarSeverity, setSnackbarSeverity] = useState('success');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFeedback((prevFeedback) => ({
      ...prevFeedback,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Replace with your actual API endpoint
      console.log(feedback)
      const response = await fetch('https://localhost:56122/api/Feedback', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(feedback),
      });

      if (!response.ok) {
        throw new Error('Failed to submit feedback');
      }

      const data = await response.json();
      console.log(data)
      setSnackbarMessage('Feedback submitted successfully!');
      setSnackbarSeverity('success');
      setFeedback({ userid: '', message: '', rating: 3 }); // Reset form
    } catch (error) {
      console.error('Error submitting feedback:', error);
      setSnackbarMessage('Failed to submit feedback.');
      setSnackbarSeverity('error');
    } finally {
      setSnackbarOpen(true);
    }
  };

  const handleCloseSnackbar = () => {
    setSnackbarOpen(false);
  };

  return (
    <Container maxWidth="sm">
      <Typography variant="h4" gutterBottom>
        Submit Your Feedback
      </Typography>
      <form onSubmit={handleSubmit}>
        <TextField
          label="User ID"
          name="userid"
          fullWidth
          margin="normal"
          variant="outlined"
          value={feedback.userid}
          onChange={handleChange}
          required
        />
        <TextField
          label="Message"
          name="message"
          fullWidth
          margin="normal"
          variant="outlined"
          multiline
          rows={4}
          value={feedback.message}
          onChange={handleChange}
          required
        />
        <FormControl fullWidth margin="normal">
          <InputLabel>Rating</InputLabel>
          <Select
            label="Rating"
            name="rating"
            value={feedback.rating}
            onChange={handleChange}
            required
          >
            {[1, 2, 3, 4, 5].map((num) => (
              <MenuItem key={num} value={num}>
                {num}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        <Button type="submit" variant="contained" color="primary">
          Submit Feedback
        </Button>
      </form>
      <Snackbar
        open={snackbarOpen}
        autoHideDuration={6000}
        onClose={handleCloseSnackbar}
      >
        <Alert onClose={handleCloseSnackbar} severity={snackbarSeverity}>
          {snackbarMessage}
        </Alert>
      </Snackbar>
    </Container>
  );
};

export default FeedbackForm;
