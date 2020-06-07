import { makeStyles } from '@material-ui/core/styles';

export default makeStyles(theme => ({
  mainScreenWrapper: {
    display: 'flex',
    justifyContent: 'center',
    height: 'calc(100vh - 100px)',
    width: '100%',
  },
  mainScreenPaper: {
    display: 'flex',
    padding: theme.spacing(2),
    width: 500,
  },
  TestCreatorWrapper: {
    display: 'flex',
    flexDirection: 'column',
    width: '100%',
  },
  testCreator: { marginBottom: theme.spacing(2) },
  nextQuestionButton: { marginTop: theme.spacing(2) },
  finishCreationButton: { marginBottom: theme.spacing(2) },
}));
