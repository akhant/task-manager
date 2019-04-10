import React, { useState } from 'react';
import { Checkbox } from 'semantic-ui-react';
import { connect } from 'react-redux';
import { changeStatus } from '../../AC';

const StatusCell = ({
  status, isAdmin, id, changeStatus: editStatus,
}) => {
  const done = status === 10;
  const [checked, setChecked] = useState(done);
  const handleChangeStatus = () => {
    setChecked(!checked);
    editStatus(id, checked);
  };
  return <Checkbox checked={checked} onChange={handleChangeStatus} readOnly={!isAdmin} />;
};

export default connect(
  null,
  { changeStatus }
)(StatusCell);
