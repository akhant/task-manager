import _ from 'lodash';
import React, { useState, useEffect } from 'react';
import { Table } from 'semantic-ui-react';
import { connect } from 'react-redux';
import TaskText from './TaskText';
import StatusCell from './StatusCell';
import { getTasks } from '../../AC';

const TaskTable = (props) => {
  const { tasks } = props.table;
  const [column, setColumn] = useState(null);
  const [data, setData] = useState(tasks);
  const [direction, setDirection] = useState(null);

  const handleSort = clickedColumn => () => {
    if (column !== clickedColumn) {
      setColumn(clickedColumn);
      setData(_.sortBy(data, [clickedColumn]));
      setDirection('ascending');
      return;
    }
    setData(data.reverse());
    setDirection(direction === 'ascending' ? 'descending' : 'ascending');
  };

  useEffect(() => {
    props.getTasks(props.activePage, column, direction);
  }, [props.activePage]);

  useEffect(() => {
    setData(tasks);
  }, [tasks]);

  const { isAdmin } = props.user;

  return (
    <Table className="main-page__table" sortable celled fixed compact>
      <Table.Header>
        <Table.Row>
          <Table.HeaderCell width={3}  sorted={column === 'username' ? direction : null} onClick={handleSort('username')}>
            Username
          </Table.HeaderCell>
          <Table.HeaderCell width={3} sorted={column === 'email' ? direction : null} onClick={handleSort('email')}>
            Email
          </Table.HeaderCell>
          <Table.HeaderCell width={9} sorted={column === 'text' ? direction : null} onClick={handleSort('text')}>
            Task
          </Table.HeaderCell>
          <Table.HeaderCell  width={1} sorted={column === 'status' ? direction : null} onClick={handleSort('status')}>
            Done
          </Table.HeaderCell>
        </Table.Row>
      </Table.Header>
      <Table.Body>
        {data
          && data.map(({
            username, email, text, status, id,
          }) => (
            <Table.Row key={username}>
              <Table.Cell collapsing>{username}</Table.Cell>
              <Table.Cell collapsing>{email}</Table.Cell>
              <Table.Cell >
                <TaskText textFromServer={text} id={id} isAdmin={isAdmin} />
              </Table.Cell>
              <Table.Cell collapsing>
                <StatusCell status={status} id={id} isAdmin={isAdmin} />
              </Table.Cell>
            </Table.Row>
          ))}
      </Table.Body>
    </Table>
  );
};

export default connect(
  ({ user, table }) => ({ user, table }),
  { getTasks }
)(TaskTable);
