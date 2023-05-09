import React, {ChangeEvent, useEffect} from 'react';
import { useState } from 'react';

type propsType = {
  status: string
  updateUserStatus: (status: string) => void
}

const StatusProfileWithHooks: React.FC<propsType> = (props) => {
  let [editMode, setEditMode] = useState(false);
  let [status, setStatus] = useState(props.status);

  const activateEditMode = () => {
    setEditMode(true);
  };

  const deactivateEditMode = () => {
    setEditMode(false);
    props.updateUserStatus(status);
  };

  const onStatusChange = (e: ChangeEvent<HTMLInputElement>) => {
    setStatus(e.currentTarget.value);
  };

  useEffect(() => {
    setStatus(props.status);
  }, [props.status]);

  return (
    <>
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
    </>
  );
};

export default StatusProfileWithHooks;
