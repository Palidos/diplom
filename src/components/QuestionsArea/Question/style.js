import { makeStyles } from '@material-ui/core/styles';


// LessonsFeed's styles
export default makeStyles(theme => ({
  questionWrapper: {
    borderBottom: 'solid 1px',
    padding: theme.spacing(1, 2, 0, 2),
  },
  questionTitle: { fontWeight: '500' },
  questionImage: {
    display: 'flex',
    justifySelf: 'center',
    width: 200,
  },
  answersGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(2, 1fr)',
  },
}));
