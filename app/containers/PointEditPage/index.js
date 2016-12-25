import React from 'react';
import { connect } from 'react-redux';
import { selectCurrentPoint, selectCurrentConnection } from './selectors';
import { createStructuredSelector } from 'reselect';
import { BootstrapTable, TableHeaderColumn } from 'react-bootstrap-table';
import {
  loadCurrentPointAction,
  changeNameAction,
  changeLatAction,
  changeLonAction,
  saveCurrentPointAction,
  changeToAction,
  changeTypeAction,
  changeMinutesAction,
  changeSecondsAction,
  changeRoutesAction,
  saveCurrentConnectionAction,
} from './actions';
import { selectOptions, selectTypes, types } from '../App/selectors';
import PointForm from 'components/PointForm';
import ConnectionForm from 'components/ConnectionForm';
import { browserHistory } from 'react-router';
import { padStart } from 'lodash';

const tableOptions = {
  defaultSortName: 'name',
  onRowClick: (row) => browserHistory.push(`/points/${row.id}`),
};

const typeFormatter = (ceil) => types[ceil];
const timeFormatter = (cell) => `${padStart(Math.round(cell / 60), 2, '0')}:${padStart(cell % 60, 2, '0')}`;
const arrayFormatter = (cell) => cell && cell.join(', ');

export class PointEditPage extends React.Component { // eslint-disable-line react/prefer-stateless-function
  static propTypes = {
    currentPoint: React.PropTypes.oneOfType([
      React.PropTypes.object,
      React.PropTypes.bool,
    ]),
    params: React.PropTypes.object,
    loadCurrentPoint: React.PropTypes.func,
    onChangeName: React.PropTypes.func,
    onChangeLat: React.PropTypes.func,
    onChangeLon: React.PropTypes.func,
    triggerSave: React.PropTypes.func,
    onChangeTo: React.PropTypes.func,
    onChangeType: React.PropTypes.func,
    onChangeMinutes: React.PropTypes.func,
    onChangeSeconds: React.PropTypes.func,
    onChangeRoutes: React.PropTypes.func,
    triggerSaveConnection: React.PropTypes.func,
    options: React.PropTypes.oneOfType([
      React.PropTypes.array,
      React.PropTypes.bool,
    ]),
    connection: React.PropTypes.object,
    types: React.PropTypes.array,
  }

  componentDidMount() {
    this.props.loadCurrentPoint(this.props.params.id);
  }
  render() {
    if (this.props.currentPoint) {
      return (
        <div>
          <PointForm
            point={this.props.currentPoint}
            onChangeName={this.props.onChangeName}
            onChangeLat={this.props.onChangeLat}
            onChangeLon={this.props.onChangeLon}
            triggerSave={this.props.triggerSave}
          />
          <BootstrapTable
            data={this.props.currentPoint.get('connections').toJS()}
            striped
            hover
            pagination
            options={tableOptions}
          >
            <TableHeaderColumn dataField="id" isKey dataAlign="center" dataSort>Id</TableHeaderColumn>
            <TableHeaderColumn dataField="name" dataSort>Назва</TableHeaderColumn>
            <TableHeaderColumn dataField="type" dataSort dataFormat={typeFormatter}>Тип трансопрту</TableHeaderColumn>
            <TableHeaderColumn dataField="cost" dataFormat={timeFormatter} dataSort>Час</TableHeaderColumn>
            <TableHeaderColumn dataField="routes" dataFormat={arrayFormatter}>Маршрути</TableHeaderColumn>
          </BootstrapTable>
          <ConnectionForm
            connection={this.props.connection}
            options={this.props.options}
            types={this.props.types}
            onChangeTo={this.props.onChangeTo}
            onChangeType={this.props.onChangeType}
            onChangeMinutes={this.props.onChangeMinutes}
            onChangeSeconds={this.props.onChangeSeconds}
            onChangeRoutes={this.props.onChangeRoutes}
            triggerSave={this.props.triggerSaveConnection}
          />
        </div>
      );
    }
    return null;
  }
}

const mapStateToProps = createStructuredSelector({
  currentPoint: selectCurrentPoint(),
  options: selectOptions(),
  connection: selectCurrentConnection(),
  types: selectTypes(),
});


function mapDispatchToProps(dispatch) {
  return {
    loadCurrentPoint: (id) => dispatch(loadCurrentPointAction(id)),
    onChangeName: (evt) => dispatch(changeNameAction(evt.target.value)),
    onChangeLat: (evt) => dispatch(changeLatAction(evt.target.value)),
    onChangeLon: (evt) => dispatch(changeLonAction(evt.target.value)),
    triggerSave: () => dispatch(saveCurrentPointAction()),
    onChangeTo: (evt) => dispatch(changeToAction(evt)),
    onChangeType: (evt) => dispatch(changeTypeAction(evt.value)),
    onChangeMinutes: (evt) => dispatch(changeMinutesAction(evt.value)),
    onChangeSeconds: (evt) => dispatch(changeSecondsAction(evt.value)),
    onChangeRoutes: (evt) => dispatch(changeRoutesAction(evt.target.value)),
    triggerSaveConnection: () => dispatch(saveCurrentConnectionAction()),
    dispatch,
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(PointEditPage);
