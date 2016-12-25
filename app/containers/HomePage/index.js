import React from 'react';
import _ from 'lodash';

import Col from 'react-bootstrap/lib/Col';
import Form from 'react-bootstrap/lib/Form';
import FormGroup from 'react-bootstrap/lib/FormGroup';
import Alert from 'react-bootstrap/lib/Alert';

import Select from 'react-select';

import { createStructuredSelector } from 'reselect';
import { connect } from 'react-redux';

import { selectPoints, selectOptions } from '../App/selectors';
import { MAP_SETTINGS } from './constants';
import { changeStartPoint, changeEndPoint, changeMapPoint } from './actions';
import { selectStartPoint, selectEndPoint, selectPath, selectPathError } from './selectors';
import MapBox from 'components/MapBox';

class HomePage extends React.Component { // eslint-disable-line react/prefer-stateless-function

  static propTypes = {
    points: React.PropTypes.oneOfType([
      React.PropTypes.object,
      React.PropTypes.bool,
    ]),
    path: React.PropTypes.oneOfType([
      React.PropTypes.array,
      React.PropTypes.bool,
    ]),
    options: React.PropTypes.oneOfType([
      React.PropTypes.array,
      React.PropTypes.bool,
    ]),
    onChangeStartPoint: React.PropTypes.func,
    onChangeEndPoint: React.PropTypes.func,
    onMapClick: React.PropTypes.func,
    startPoint: React.PropTypes.string,
    endPoint: React.PropTypes.string,
    pathError: React.PropTypes.string,
  };

  renderAlert() {
    if (this.props.pathError) {
      return <Alert bsStyle="danger">{ this.props.pathError }</Alert>;
    }

    return null;
  }

  render() {
    const { points, onChangeStartPoint, onChangeEndPoint, onMapClick, startPoint, endPoint, path } = this.props;
    const startPointCoordinates = points[startPoint];
    const endPointCoordinates = points[endPoint];
    return (
      <div>
        <Form horizontal>
          <FormGroup>
            <Col smOffset={1} sm={5}>
              <Select
                value={startPoint}
                options={[{ value: '', label: 'Виберіть відправну точку' }].concat(this.props.options)}
                onChange={onChangeStartPoint}
              />
            </Col>
            <Col sm={5}>
              <Select
                value={endPoint}
                options={[{ value: '', label: 'Виберіть точку призначення' }].concat(this.props.options)}
                onChange={onChangeEndPoint}
              />
            </Col>
          </FormGroup>
        </Form>
        { this.renderAlert() }
        <br />
        <MapBox path={path} {...MAP_SETTINGS} onClickHandler={onMapClick} start={startPointCoordinates} goal={endPointCoordinates} />
      </div>
    );
  }
}


function mapDispatchToProps(dispatch) {
  return {
    onChangeStartPoint: (evt) => dispatch(changeStartPoint(evt && evt.value)),
    onChangeEndPoint: (evt) => dispatch(changeEndPoint(evt && evt.value)),
    onMapClick: (evt) => dispatch(changeMapPoint({ lat: evt.latlng.lat, lon: evt.latlng.lng })),
    dispatch,
  };
}

const mapStateToProps = createStructuredSelector({
  points: selectPoints(),
  startPoint: selectStartPoint(),
  endPoint: selectEndPoint(),
  path: selectPath(),
  pathError: selectPathError(),
  options: selectOptions(),
});

export default connect(mapStateToProps, mapDispatchToProps)(HomePage);
