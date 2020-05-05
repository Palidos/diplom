import { makeStyles } from '@material-ui/core/styles';


// RadioAnswers's styles
export default makeStyles(theme => ({
  answersGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(2, 1fr)',
    justifyItems: 'center',
  },
  answer: {
    alignItems: 'center',
    display: 'flex',
    fontWeight: 500,
    height: 42,
    '& .MuiTypography-root': { fontWeight: 500 },
    '& svg': { color: theme.palette.primary.main },
  },
}));
