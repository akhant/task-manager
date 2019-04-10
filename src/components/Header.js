import React from 'react';
import { Grid } from 'semantic-ui-react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { logout } from '../AC';

const Header = (props) => {
  const onLogout = () => {
    props.logout();
  };

  const { username } = props.user;

  return (
    <Grid>
      <Grid.Row className="header">
        <Grid.Column >
          {username ? (
            <span role="button" className="logout-link" onClick={onLogout}>
              Logout
            </span>
          ) : (
            <span style={{ color: '#474749' }}>
              <Link to="/login">Login</Link>
            </span>
          )}
          | <Link to="/">Main</Link>{' '}
        </Grid.Column>
      </Grid.Row>
    </Grid>
  );
};

export default connect(
  ({ user }) => ({
    user,
  }),
  { logout }
)(Header);
