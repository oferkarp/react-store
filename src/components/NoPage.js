import React from 'react';

function NoPage() {
  return (
    <div style={styles.container}>
      <h1 style={styles.heading}>404 - Page Not Found</h1>
      <p style={styles.text}>Oops! The page you're looking for doesn't exist.</p>
      <p style={styles.text}>Please navigate back to the home page or another valid page.</p>
    </div>
  );
}

const styles = {
  container: {
    textAlign: 'center',
    marginTop: '50px',
  },
  heading: {
    fontSize: '2rem',
    marginBottom: '20px',
    color: '#333',
  },
  text: {
    fontSize: '1.2rem',
    color: '#666',
  },
};

export default NoPage;
