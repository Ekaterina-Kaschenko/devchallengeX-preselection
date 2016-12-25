import React from 'react';

import Form from 'react-bootstrap/lib/Form';
import FormGroup from 'react-bootstrap/lib/FormGroup';
import Col from 'react-bootstrap/lib/Col';
import ControlLabel from 'react-bootstrap/lib/ControlLabel';
import FormControl from 'react-bootstrap/lib/FormControl';
import Button from 'react-bootstrap/lib/Button';
import Select from 'react-select';

import { padStart } from 'lodash';
const timeOptions = Array.from({ length: 20 }).map((v, i) => ({ value: i, label: padStart(i, 2, '0') }));

function ConnectoinForm({ connection, options, types, onChangeTo, onChangeType, onChangeMinutes, onChangeSeconds, onChangeRoutes, triggerSave }) {
  return (
    <Form horizontal>
      <FormGroup controlId="pointName">
        <Col smOffset={1} sm={5}>
          <ControlLabel>До зупинки</ControlLabel>
        </Col>
        <Col sm={5}>
          <Select
            value={connection.get('to')}
            options={options}
            onChange={onChangeTo}
          />
        </Col>
      </FormGroup>
      <FormGroup controlId="pointLat">
        <Col smOffset={1} sm={5}>
          <ControlLabel>Вид транспорту</ControlLabel>
        </Col>
        <Col sm={5}>
          <Select
            value={connection.get('type')}
            options={types}
            onChange={onChangeType}
          />
        </Col>
      </FormGroup>
      <FormGroup controlId="pointLon">
        <Col smOffset={1} sm={5}>
          <ControlLabel>Час</ControlLabel>
        </Col>
        <Col sm={2}>
          <Select
            value={connection.get('minutes')}
            options={timeOptions}
            onChange={onChangeMinutes}
          />
        </Col>
        <Col sm={2}>
          <Select
            value={connection.get('seconds')}
            options={timeOptions}
            onChange={onChangeSeconds}
          />
        </Col>
      </FormGroup>
      <FormGroup controlId="pointLat">
        <Col smOffset={1} sm={5}>
          <ControlLabel>Маршрути (розділені коммою)</ControlLabel>
        </Col>
        <Col sm={5}>
          <FormControl componentClass="textarea" value={connection.get('routes')} onChange={onChangeRoutes} />
        </Col>
      </FormGroup>
      <FormGroup>
        <Col smOffset={10} sm={2}>
          <Button bsStyle="primary" onClick={triggerSave}>Додати</Button>
        </Col>
      </FormGroup>
    </Form>
  );
}

ConnectoinForm.propTypes = {
  connection: React.PropTypes.object,
  onChangeTo: React.PropTypes.func,
  onChangeType: React.PropTypes.func,
  onChangeMinutes: React.PropTypes.func,
  onChangeSeconds: React.PropTypes.func,
  onChangeRoutes: React.PropTypes.func,
  triggerSave: React.PropTypes.func,
  options: React.PropTypes.oneOfType([
    React.PropTypes.array,
    React.PropTypes.bool,
  ]),
  types: React.PropTypes.array,
};

export default ConnectoinForm;
