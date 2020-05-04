import { makeStyles } from '@material-ui/core/styles';


// TextFieldAnswers's styles
export default makeStyles(theme => ({
  answer: {
    display: 'flex',
    fontWeight: 500,
    marginTop: theme.spacing(2),
    height: 42,
    '& .MuiTypography-root': { fontWeight: 500 },
  },
}));
