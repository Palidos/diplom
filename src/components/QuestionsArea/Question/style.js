import { makeStyles } from '@material-ui/core/styles';


// LessonsFeed's styles
export default makeStyles(theme => ({
  questionTitle: {
    fontWeight: '500',
  },
  answersGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(2, 1fr)',
  },
}));
