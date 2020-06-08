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
    width: 500,
  },
  selectionWrapper: {
    display: 'flex',
    flexDirection: 'column',
    marginTop: 50,
  },
  topInputs: { display: 'flex' },
  testSelector: {
    marginBottom: theme.spacing(2),
    width: 200,
  },
  isEditCheckbox: {
    margin: 0,
    '& svg': { color: theme.palette.primary.main },
  },
}));
