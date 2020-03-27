import { makeStyles } from '@material-ui/core/styles';

export default makeStyles(theme => ({
  calendarMini: {
    alignSelf: 'stretch',
    marginRight: theme.spacing(3),
    height: 200,
    // maxHeight: 'calc(100vh - 118px)',
    overflowY: 'auto',
  },
}));
