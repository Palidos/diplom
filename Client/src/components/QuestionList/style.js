import { makeStyles } from '@material-ui/core/styles';

export default makeStyles(theme => ({
  questionList: {
    alignSelf: 'stretch',
    marginRight: theme.spacing(3),
    height: 200,
    overflowY: 'auto',
    padding: theme.spacing(1),


    '& .MuiButtonBase-root': { display: 'inline' },
  },
  questionLink: {
    padding: 5,
    minWidth: 10,
    lineHeight: '15px',
    marginRight: 10,
    marginBottom: 10,
  },
}));
