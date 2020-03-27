import React from 'react';
import { useSelector } from 'react-redux';

import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import useMediaQuery from '@material-ui/core/useMediaQuery';

import NavListItem from './NavListItem';

import useStyles from './style';


// NavList component
export default function NavList() {
  const classes = useStyles();
  const role = useSelector(state => state.identity.role);
  const isWideScreen = useMediaQuery('(min-width:800px)');

  const showNavigation = () => {
    switch (role) {
      case 'Student':
        return ['lessons'];

      case 'Teacher':
        return [
          'lessons',
          'calendar',
          'groups',
        ];

      case 'HR':
        return ['statistics'];

      case 'Admin':
        return ['courses', 'administration'];

      default:
        break;
    }
  };

  return (
    isWideScreen
      ? (
        <div className={classes.navList}>
          {role && showNavigation().map(path => (
            <NavListItem
              key={path}
              classes={classes}
              path={path}
            />
          ))}
        </div>
      )
      : (
        <List className={classes.navInDrawer}>
          {role && showNavigation().map(path => (
            <ListItem
              key={path}
              button
            >
              <NavListItem
                key={path}
                classes={classes}
                path={path}
              />
            </ListItem>
          ))}
        </List>
      )
  );
}
