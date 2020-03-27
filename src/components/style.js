import { makeStyles } from '@material-ui/core/styles';
import { fade } from '@material-ui/core/styles/colorManipulator';


// useStyles
export default makeStyles(theme => ({
  root: {
    display: 'flex',
    flexDirection: 'column',
    backgroundColor: '#efeff4',
    height: '100vh',
    width: '100vw',
    overflow: 'hidden',
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
  },
  '@global': {  // Scrollbar styling
    '::-webkit-scrollbar': {
      width: 6,
      height: 6,
      backgroundColor: `transparent`,
    },
    '::-webkit-scrollbar-track': {
      borderRadius: 6,
      background: `transparent`,
    },
    '::-webkit-scrollbar-thumb': {
      borderRadius: 6,
      background: fade(theme.palette.blank.scrollBar, 0.2),
    },
    '::-webkit-scrollbar-thumb:hover': { background: fade(theme.palette.blank.scrollBar, 0.5) },
    '::-webkit-scrollbar-thumb:active': { background: fade(theme.palette.blank.scrollBar, 0.8) },
  },
}));
