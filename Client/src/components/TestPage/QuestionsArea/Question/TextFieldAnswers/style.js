import { makeStyles } from '@material-ui/core/styles';


// TextFieldAnswers's styles
export default makeStyles(theme => ({
  textFieldWrapper: {
    display: 'flex',
    justifyContent: 'center',
  },
  answer: {
    alignItems: 'center',
    display: 'flex',
    fontWeight: 500,
    margin: theme.spacing(2, 0),
    width: '60%',
    '& .MuiTypography-root': { fontWeight: 500 },
    '& .MuiOutlinedInput-input': { padding: theme.spacing(1) },
    '& fieldset': { borderColor: theme.palette.primary.main },
  },
  answerImage: {
    marginBottom: 5,
    transform: 'scale(0.7)',
  },
}));
