import { makeStyles } from '@material-ui/core/styles';


// RadioAnswers's styles
export default makeStyles(theme => ({
  answersGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(2, 1fr)',
    margin: theme.spacing(2, 0),
  },
  answer: ({ pathname }) => ({
    fontWeight: 500,
    height: 'fit-content',
    marginLeft: pathname === 'results' ? '30%' : '20%',
    '& .MuiTypography-root': { fontWeight: 500 },
    '& svg': { color: theme.palette.primary.main },
  }),
}));
