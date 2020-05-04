import { makeStyles } from '@material-ui/core/styles';


// Question's styles
export default makeStyles(theme => ({
  questionWrapper: { padding: theme.spacing(1, 2, 0, 2) },
  questionNumber: { fontWeight: '500' },
  questionTitle: {
    fontWeight: '500',
    marginBottom: theme.spacing(2),
  },
  questionImageContainer: {
    display: 'flex',
    justifyContent: 'center',
  },
  answersGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(2, 1fr)',
    justifyItems: 'center',
  },
  answer: {
    alignItems: 'center',
    display: 'flex',
    fontWeight: 500,
    height: 42,
    '& .MuiTypography-root': { fontWeight: 500 },
  },
}));
