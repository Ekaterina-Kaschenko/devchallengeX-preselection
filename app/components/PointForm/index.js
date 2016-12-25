import React from 'react';

import Form from 'react-bootstrap/lib/Form';
import FormGroup from 'react-bootstrap/lib/FormGroup';
import Col from 'react-bootstrap/lib/Col';
import ControlLabel from 'react-bootstrap/lib/ControlLabel';
import FormControl from 'react-bootstrap/lib/FormControl';
import Button from 'react-bootstrap/lib/Button';

function PointForm({ point, onChangeName, onChangeLat, onChangeLon, triggerSave }) {
  return (
    <Form horizontal>
      <FormGroup controlId="pointName">
        <Col smOffset={1} sm={5}>
          <ControlLabel>Назва</ControlLabel>
        </Col>
        <Col sm={5}>
          <FormControl type="text" value={point.get('name')} onChange={onChangeName} />
        </Col>
      </FormGroup>
      <FormGroup controlId="pointLat">
        <Col smOffset={1} sm={5}>
          <ControlLabel>Широта</ControlLabel>
        </Col>
        <Col sm={5}>
          <FormControl type="text" value={point.get('lat')} onChange={onChangeLat} />
        </Col>
      </FormGroup>
      <FormGroup controlId="pointLon">
        <Col smOffset={1} sm={5}>
          <ControlLabel>Довгота</ControlLabel>
        </Col>
        <Col sm={5}>
          <FormControl type="text" value={point.get('lon')} onChange={onChangeLon} />
        </Col>
      </FormGroup>
      <FormGroup>
        <Col smOffset={10} sm={2}>
          <Button bsStyle="primary" onClick={triggerSave}>Зберегти</Button>
        </Col>
      </FormGroup>
    </Form>
  );
}

PointForm.propTypes = {
  point: React.PropTypes.object,
  onChangeName: React.PropTypes.func,
  onChangeLat: React.PropTypes.func,
  onChangeLon: React.PropTypes.func,
  triggerSave: React.PropTypes.func,
};

export default PointForm;
