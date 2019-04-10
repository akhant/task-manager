import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Pagination, Button } from 'semantic-ui-react';
import { connect } from 'react-redux';
import TaskTable from './TaskTable';
import { getTasks } from '../../AC';

const MainPage = (props) => {
  const [activePage, setActivePage] = useState(1);

  const handlePaginationChange = (e, { activePage }) => {
    setActivePage(activePage);
  };

  return (
    <div className="main-page">
      <h1>Tasks</h1>
      <Button className="main-page__btn btn" inverted color="blue">
        <Link to="/create_task"> Add new Task </Link>
      </Button>
      <TaskTable activePage={activePage} />
      <div className="pagination__wrapper">
        <Pagination
          activePage={activePage}
          totalPages={Math.ceil(props.table.total_task_count / 3) || 10}
          onPageChange={handlePaginationChange}
        />
      </div>
    </div>
  );
};

export default connect(
  ({ table }) => ({ table }),
  { getTasks }
)(MainPage);
