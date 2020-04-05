import { makeStyles } from '@material-ui/core/styles';


// LessonsFeed's styles
export default makeStyles(theme => ({
  questionsArea: () => ({
    display: 'flex',
    flexDirection: 'column',
    height: `calc(100vh - 118px)`,
    overflowY: 'auto',
    alignSelf: 'center',
  }),
}));