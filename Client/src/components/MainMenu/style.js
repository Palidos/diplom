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
  title: {
    color: theme.palette.primary.main,
    cursor: 'pointer',
    height: 33,

    display: 'block',
    fontSize: '2em',
    marginBlockStart: '0.67em',
    marginBlockEnd: '0.67em',
    marginInlineStart: '0px',
    marginInlineEnd: '0px',
    fontWeight: 'bold',
    textDecoration: 'none',

    order: 1,
    textAlign: 'left',
    width: 'fit-content',
  },
}));
