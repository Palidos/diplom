import { makeStyles } from '@material-ui/core/styles';


// useStyles
export default makeStyles(theme => ({
  appBar: {
    backgroundColor: 'rgba(255, 255, 255, 0.8)',
    boxShadow: 'none',
    height: theme.spacing(8.75),
  },
  toolBar: ({ isWideScreen }) => ({
    height: '100%',
    display: 'flex',

    '& > div:first-of-type': {
      maxHeight: isWideScreen ? 'auto' : '100vh',
      height: isWideScreen ? 'auto' : '100vh',
    },
  }),
  menuButton: { marginRight: theme.spacing(2) },
  avatar: {
    order: 1,
    marginLeft: theme.spacing(1),
    textAlign: 'left',

    width: '100%',
    height: 33,
    color: theme.palette.primary.main,
  },
  sideBarButton: {
    order: 0,
    marginRight: theme.spacing(1),
  },
  swipeableDrawer: { '& [class^="MuiDrawer"]': { minWidth: '250px' } },
}));
