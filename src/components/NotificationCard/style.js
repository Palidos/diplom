import { makeStyles } from '@material-ui/core/styles';

export default makeStyles(theme => ({ notification: ({ type }) => ({ '& .MuiSnackbarContent-root': { backgroundColor: theme.palette.notification[type] } }) }));
