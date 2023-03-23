import React, { useEffect } from 'react';
import { useState } from 'react';

const StatusProfileWithHooks = (props) => {
  let [editMode, setEditMode] = useState(false);
  let [status, setStatus] = useState(props.status);

  const activateEditMode = () => {
    setEditMode(true);
  };

  const deactivateEditMode = () => {
    setEditMode(false);
    props.updateUserStatus(status);
  };

  const onStatusChange = (e) => {
    setStatus(e.currentTarget.value);
  };

  useEffect(() => {
    setStatus(props.status);
  }, [props.status]);

  return (
    <div>
      {!editMode && (
        <span onDoubleClick={activateEditMode}>{props.status}</span>
      )}
      {editMode && (
        <input
          autoFocus={true}
          onBlur={deactivateEditMode}
          onChange={onStatusChange}
          value={status}
        ></input>
      )}
    </div>
  );
};

export default StatusProfileWithHooks;
