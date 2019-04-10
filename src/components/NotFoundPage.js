import React from 'react';
import { Link } from 'react-router-dom';

export default ({ location }) => (
  <div className="not-found-page">
    <div>
      {' '}
      <p>Page "{location.pathname}" not found.</p>
    </div>
    <div>
      <Link to="/" className="btn">
        Go to main
      </Link>
    </div>
  </div>
);
