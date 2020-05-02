import { makeStyles } from '@material-ui/core/styles';


// QuestionsArea's styles
export default makeStyles(theme => ({
  questionsArea: () => ({
    display: 'flex',
    flexDirection: 'column',
    height: `calc(100vh - 102px)`,
    overflowY: 'auto',
    alignSelf: 'center',
    marginLeft: '10vw',
    '& > div:not(:first-child)': { borderTop: 'solid 1px' },
  }),
}));
