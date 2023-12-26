import React, { useState } from 'react';
import { createTheme, ThemeProvider, Container, Typography, Card, Grid, Slider, TextField, Box, CssBaseline } from '@mui/material';

function App() {
  const [grades, setGrades] = useState({
    'Midterm Exam': { weight: 25, grade: 65 },
    'Homework Assignment 1': { weight: 5, grade: 100 },
    'Homework Assignment 2': { weight: 5, grade: 90 },
    'Homework Assignment 3': { weight: 5, grade: 95 },
    'First-step of Project': { weight: 15, grade: 85 },
    'Second-step of Project': { weight: 15, grade: 50 },
    'Final Exam': { weight: 30, grade: 50 },
  });

  const darkTheme = createTheme({
    palette: {
      background: {
        default: '#121212',
        paper: '#1e1e1e'
      },
      mode: 'dark',
      primary: {
        main: '#82c8fc',
      },
      secondary: {
        main: '#bb9bf2',
      }
    },
  });

  const handleGradeChange = (assessment, value) => {
    const numericValue = parseInt(value, 10);
    if (numericValue < 0 || numericValue > 100) return;
    setGrades(prevGrades => ({
      ...prevGrades,
      [assessment]: { ...prevGrades[assessment], grade: numericValue }
    }));
  };

  const handleSliderChange = (assessment, value) => {
    setGrades(prevGrades => ({
      ...prevGrades,
      [assessment]: { ...prevGrades[assessment], grade: value }
    }));
  };

  const calculateAverage = () => {
    let total = Object.values(grades).reduce((acc, { weight, grade }) => acc + grade * weight, 0);
    let weightSum = Object.values(grades).reduce((acc, { weight }) => acc + weight, 0);
    return weightSum > 0 ? total / weightSum : 0;
  };

  const determineLetterGrade = average => {
    if (average >= 91) return 'AA';
    if (average >= 81) return 'BA';
    if (average >= 71) return 'BB';
    if (average >= 61) return 'CB';
    if (average >= 55) return 'CC';
    if (average >= 50) return 'DC';
    if (average >= 45) return 'DD';
    return 'FF';
  };

  const average = calculateAverage();
  const letterGrade = determineLetterGrade(average);

  return (
    <ThemeProvider theme={darkTheme}>
      <CssBaseline />
      <Container maxWidth="lg" sx={{ bgcolor: 'background.default', padding: 2, overflow: 'auto', height: 'auto', minHeight: '100vh' }}>
        <Box sx={{ py: 3 }}>
          <Typography variant="h4" gutterBottom align="center" color="primary">
            Grade Calculator
          </Typography>
          <Card sx={{ bgcolor: 'background.paper', p: 3, my: 2 }}>
            <Grid container spacing={2} justifyContent="center">
              {Object.keys(grades).map((assessment, idx) => (
                <Grid item xs={12} sm={6} md={4} key={idx}>
                  <Typography gutterBottom>{assessment} (Weight: {grades[assessment].weight}%)</Typography>
                  <Slider
                    value={grades[assessment].grade}
                    onChange={(e, value) => handleSliderChange(assessment, value)}
                    aria-labelledby="input-slider"
                    min={0}
                    max={100}
                  />
                  <TextField
                    value={grades[assessment].grade}
                    onChange={e => handleGradeChange(assessment, e.target.value)}
                    type="number"
                    margin="normal"
                    fullWidth
                    inputProps={{ step: 1, min: 0, max: 100 }}
                    sx={{ input: { color: 'white' } }}
                  />
                </Grid>
              ))}
            </Grid>
            <Typography variant="h6" color="secondary" mt={2} align="center">
              Average Grade: {average.toFixed(2)}, Letter Grade: {letterGrade}
            </Typography>
          </Card>
        </Box>
      </Container>
    </ThemeProvider>
  );
}

export default App;
