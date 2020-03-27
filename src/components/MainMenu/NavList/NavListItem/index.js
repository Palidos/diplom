import React, { useContext } from 'react';
import { useSelector } from 'react-redux';
import { Link, __RouterContext as RouterContext } from 'react-router-dom';

import MaterialLink from '@material-ui/core/Link';

// import FiberManualRecordIcon from '@material-ui/icons/FiberManualRecord';
import { OperateDate } from '../../../../models';


// NavListItem component
export default ({
  path,
  classes: {
    navItem,
    navItemActive,
  },
}) => {
  // Gets Router props outside of the Router
  const { location: { pathname } } = useContext(RouterContext);
  const date = useSelector(state => state.date.date);

  let to;

  switch (path) { // Selects right URI
    case 'lessons':
      to = `/${path}/${OperateDate.constructDateString(date)}`;
      break;

    case 'calendar':
      to = `/${path}/${OperateDate.constructDateString(date)}`;
      break;

    case 'groups':
      to = `/${path}/`;
      break;

    case 'statistics':
      to = `/${path}/`;
      break;

    case 'administration':
      to = `/${path}`;
      break;

    case 'courses':
      to = `/${path}`;
      break;

    default:
      break;
  }

  return (
    <MaterialLink
      to={to}
      component={Link}
      className={// Highlights an active router link
        pathname.includes(path)
          ? navItemActive
          : navItem
      }
      underline='none'
    >
      {path.toUpperCase()}
      {/* {path === 'lessons' &&  // Basic notification logic
        !(to === pathname) &&
        <FiberManualRecordIcon className={notification} />
      } */}
    </MaterialLink>
  );
};
