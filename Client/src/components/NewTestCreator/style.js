import { makeStyles } from '@material-ui/core/styles';

export default makeStyles(theme => ({
  mainScreenWrapper: {
    display: 'flex',
    justifyContent: 'center',
    width: '100%',
  },
  mainScreenPaper: {
    display: 'flex',
    justifyContent: 'center',
    width: 700,
  },
  TestCreatorWrapper: {
    display: 'flex',
    flexDirection: 'column',
    marginTop: 50,
  },
  testCreator: {
    marginBottom: theme.spacing(2),
    width: 200,
  },
  questionTypeSelector: {
    '& .MuiFormLabel-root': { textAlign: 'center' },
    '& .MuiFormGroup-root': { flexDirection: 'row' },
  },
}));
