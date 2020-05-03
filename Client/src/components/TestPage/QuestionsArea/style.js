import { makeStyles } from '@material-ui/core/styles';

// QuestionsArea's styles
export default makeStyles(theme => ({
  questionsArea: () => ({
    alignSelf: 'center',
    display: 'flex',
    flexDirection: 'column',
    height: `calc(100vh - 102px)`,
    marginLeft: '7vw',
    overflowY: 'auto',
    '& > div:not(:first-child)': { borderTop: 'solid 1px' },
  }),
}));
