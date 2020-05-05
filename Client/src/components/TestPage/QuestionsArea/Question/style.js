import { makeStyles } from '@material-ui/core/styles';


// Question's styles
export default makeStyles(theme => ({
  questionWrapper: { padding: theme.spacing(1, 2, 0, 2) },
  questionNumber: { fontWeight: '500' },
  questionTitle: { fontWeight: '500' },
  questionImageContainer: {
    display: 'flex',
    justifyContent: 'center',
    marginTop: theme.spacing(2),
  },
}));
