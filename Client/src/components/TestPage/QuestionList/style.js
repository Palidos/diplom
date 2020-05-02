import { makeStyles } from '@material-ui/core/styles';

export default makeStyles(theme => ({
  questionList: ({ isQuestionsLoaded }) => ({
    display: isQuestionsLoaded ? 'grid' : 'block',
    gridTemplateColumns: 'repeat(auto-fit, 20px)',
    gridGap: 10,
    overflowY: 'auto',
    padding: theme.spacing(1),

    '& .MuiButtonBase-root': { display: 'inline' },
  }),
  questionLink: {
    display: 'inline-block',
    textDecoration: 'none',
  },
  questionButtonWrapper: { display: 'inline-block' },
  questionButton: {
    padding: 5,
    minWidth: 10,
    lineHeight: '15px',
  },
  submitButton: {
    marginTop: theme.spacing(1),
    width: '100%',
  },
}));
