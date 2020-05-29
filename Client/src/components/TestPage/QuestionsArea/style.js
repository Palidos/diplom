import { makeStyles } from '@material-ui/core/styles';
import { fade } from '@material-ui/core/styles/colorManipulator';

// QuestionsArea's styles
export default makeStyles(theme => ({
  questionsArea: {
    alignSelf: 'center',
    display: 'flex',
    flexDirection: 'column',
    flexGrow: 1,
    height: `calc(100vh - 102px)`,
    marginLeft: '16px',
    overflowY: 'auto',
    '& > div:not(:first-child)': { borderTop: `1px solid ${fade(theme.palette.secondary.text, 0.5)}` },
  },
}));
