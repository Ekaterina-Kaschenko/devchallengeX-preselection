import React from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import Button from 'react-bootstrap/lib/Button';
import { LinkContainer } from 'react-router-bootstrap';

import { BootstrapTable, TableHeaderColumn } from 'react-bootstrap-table';
import { selectPoints } from '../App/selectors';
import { selectFilteredPoints } from './selectors';
import { filterPointsAction } from './actions';
import { MAP_SETTINGS } from 'containers/HomePage/constants';
import { browserHistory } from 'react-router';
import { Map, Marker, TileLayer, Popup } from 'react-leaflet';

import 'react-bootstrap-table/dist/react-bootstrap-table-all.min.css';

const tableOptions = {
  defaultSortName: 'name',
  onRowClick: (row) => browserHistory.push(`/points/${row.id}`),
  afterColumnFilter: (x) => x,
};

const renderMarker = (point) => (
  <Marker key={point.id} position={[point.lat, point.lon]}>
    <Popup>
      <div>
        {point.name} {point.id }<br />
        Можливо дібратися до
        <ul>
          {point.connections && point.connections.map(c => <li key={c.to}>{c.name} ({c.routes.join(', ')})</li>)}
        </ul>
        <Button bsStyle="primary" onClick={() => browserHistory.push(`/points/${point.id}`)}>Edit</Button>
      </div>
    </Popup>
  </Marker>
);


export class PointsListPage extends React.Component { // eslint-disable-line react/prefer-stateless-function
  static propTypes = {
    points: React.PropTypes.oneOfType([
      React.PropTypes.object,
      React.PropTypes.bool,
    ]),
    filteredPoints: React.PropTypes.oneOfType([
      React.PropTypes.array,
      React.PropTypes.bool,
    ]),
  }

  render() {
    const { position, zoom } = MAP_SETTINGS;
    const points = (this.props.points && Object.values(this.props.points)) || [];
    const mapPoints = this.props.filteredPoints || points;
    return (
      <div>
        <LinkContainer to="/points/new">
          <Button bsStyle="primary">Додати</Button>
        </LinkContainer>
        <Map center={position} zoom={zoom} style={{ height: '50vh' }}>
          <TileLayer
            url="http://{s}.tile.osm.org/{z}/{x}/{y}.png"
            attribution="&copy; <a href='http://osm.org/copyright'>OpenStreetMap</a> contributors"
          />
          {mapPoints.map(renderMarker)}
        </Map>
        <BootstrapTable
          data={points}
          striped
          hover
          pagination
          options={tableOptions}
        >
          <TableHeaderColumn dataField="id" isKey dataAlign="center" dataSort filter={{ type: 'TextFilter', placeholder: 'Шукати по Id' }}>Id</TableHeaderColumn>
          <TableHeaderColumn dataField="name" dataSort filter={{ type: 'TextFilter', placeholder: 'Шукати по назві' }}>Назва</TableHeaderColumn>
          <TableHeaderColumn dataField="lat" dataSort filter={{ type: 'NumberFilter', delay: 1000, placeholder: 'Шукати по широті' }}>Широта</TableHeaderColumn>
          <TableHeaderColumn dataField="lon" dataSort filter={{ type: 'NumberFilter', delay: 1000, placeholder: 'Шукати по довготі' }}>Довгота</TableHeaderColumn>
        </BootstrapTable>
      </div>
    );
  }
}

function mapDispatchToProps(dispatch) {
  tableOptions.afterColumnFilter = (filter, rows) => {
    dispatch(filterPointsAction(rows));
    return rows;
  };
  return {
    onRowSelect: (row) => dispatch(selectRow(row)),
    dispatch,
  };
}

const mapStateToProps = createStructuredSelector({
  points: selectPoints(),
  filteredPoints: selectFilteredPoints()
});


export default connect(mapStateToProps, mapDispatchToProps)(PointsListPage);
