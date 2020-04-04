import { makeStyles } from '@material-ui/core/styles';


// LessonsFeed's styles
export default makeStyles(theme => ({
  questionWrapper: {
    borderTop: 'solid 1px',
    padding: theme.spacing(1, 2, 0, 2),
  },
  questionTitle: { fontWeight: '500' },
  questionImageContainer: {
    display: 'flex',
    justifySelf: 'center',
  },
  questionImage: { width: 200 },
  answersGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(2, 1fr)',
  },
}));
