import { makeStyles } from '@material-ui/core/styles';


// UserInfo
export default makeStyles(theme => ({
  userInfo: {
    order: 5,
    marginLeft: 'auto',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    color: '#000',
  },
  userName: {
    fontWeight: 500,
    margin: theme.spacing(0, 1),
  },
  userAvatar: {
    fontSize: 32,
    color: theme.palette.primary.main,
  },
  iconButton: { '&:hover': { background: 'transparent' } },
}));
