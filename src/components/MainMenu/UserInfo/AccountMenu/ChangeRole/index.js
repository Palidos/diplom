import React from 'react';
import { useSelector, useDispatch } from 'react-redux';

import { removeEventActive, clearEvents } from '../../../../../store/eventsStore';
import { updateRole } from '../../../../../store/identityStore';
import RoleMenuItem from './RoleMenuItem';


// ChangeRole component
export default function ChangeRole({ handleClose }) {
  const role = useSelector(state => state.identity.role);
  const rolePool = useSelector(state => state.identity.roles);
  const dispatch = useDispatch();

  const handleClick = newRole => {
    localStorage.setItem('lastRole', newRole);
    dispatch(updateRole(newRole));
    dispatch(removeEventActive());
    dispatch(clearEvents());
  };

  return (
    rolePool.map(currRole =>
      (role === currRole
        ? null
        : (
          <RoleMenuItem
            key={currRole}
            desiredRole={currRole}
            handleClose={handleClose}
            handleClick={() => handleClick(currRole)}
          />
        )),
    )
  );
}
