import React from 'react';
import Navbar from 'react-bootstrap/lib/Navbar';
import Nav from 'react-bootstrap/lib/Nav';
import NavItem from 'react-bootstrap/lib/NavItem';
import Grid from 'react-bootstrap/lib/Grid';
import Row from 'react-bootstrap/lib/Row';
import Col from 'react-bootstrap/lib/Col';
import { LinkContainer } from 'react-router-bootstrap';
import { connect } from 'react-redux';

import { loadCoordinates } from './actions';

import 'react-select/dist/react-select.css';
import 'leaflet/dist/leaflet.css';
import styles from './styles.css';

class App extends React.Component { // eslint-disable-line react/prefer-stateless-function

  static propTypes = {
    children: React.PropTypes.node,
    loadCoordinates: React.PropTypes.func,
  };

  componentDidMount() {
    this.props.loadCoordinates();
  }

  render() {
    return (
      <div className={styles.container}>
        <Navbar>
          <Navbar.Header>
            <Navbar.Brand>
              PathFinder
            </Navbar.Brand>
            <Navbar.Toggle />
          </Navbar.Header>
          <Navbar.Collapse>
            <Nav>
              <LinkContainer to="/">
                <NavItem>Головна</NavItem>
              </LinkContainer>
              <LinkContainer to="/points">
                <NavItem>Управління точками</NavItem>
              </LinkContainer>
            </Nav>
          </Navbar.Collapse>
        </Navbar>
		<Grid>
			<Row className="show-grid">
				<Col xs={12}>
					{React.Children.toArray(this.props.children)}
				</Col>
			</Row>
		</Grid>
      </div>
    );
  }
}

function mapDispatchToProps(dispatch) {
  return {
    loadCoordinates: () => dispatch(loadCoordinates()),
    dispatch,
  };
}

export default connect(null, mapDispatchToProps)(App);

