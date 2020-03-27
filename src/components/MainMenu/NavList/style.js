import { makeStyles } from '@material-ui/core/styles';


// NavList
export default makeStyles(theme => ({
  navList: {
    order: 2,
    display: 'flex',
    justifyContent: 'flex-start',
    alignItems: 'center',

    letterSpacing: '0.4px',
    fontWeight: 500,
    fontSize: 12,
    textDecoration: 'none',
  },
  navItem: {
    margin: theme.spacing(0, 1),
    padding: theme.spacing(0.5, 0),
    textDecoration: 'none',
    color: 'rgba(0, 0, 0, 0.4)',
    transition: 'color 0.3s',
    '&:hover': {
      color: '#000',
      transition: 'color 0.3s',
    },
    position: 'relative',
  },
  navItemActive: {
    margin: theme.spacing(0, 1),
    padding: theme.spacing(0.5, 0),
    borderBottom: `2px solid ${theme.palette.primary.main}`,
    color: '#000',
    position: 'relative',
  },
  notification: {
    maxWidth: theme.spacing(1),
    maxHeight: theme.spacing(1),
    color: theme.palette.notification.main,
    position: 'absolute',
    top: '1px',
    right: '-7px',
  },
  navInDrawer: { minWidth: '250px' },
}));
