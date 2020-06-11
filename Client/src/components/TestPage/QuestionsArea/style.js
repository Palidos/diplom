import { makeStyles, fade } from '@material-ui/core/styles';


// QuestionsArea's styles
export default makeStyles(theme => ({
  questionsArea: ({ pathname }) => ({
    alignSelf: 'center',
    display: 'flex',
    flexDirection: 'column',
    flexGrow: 1,
    height: `calc(100vh - 102px)`,
    marginLeft: pathname === 'finalResults' ? 0 : theme.spacing(2),
    overflowY: 'auto',
    '& > div:not(:first-child)': { borderTop: `1px solid ${fade(theme.palette.secondary.text, 0.5)}` },
  }),
  statisticsWrapper: {
    margin: '0 auto',
    padding: theme.spacing(2, 0),
    width: 900,
    '& > div:last-child': {
      borderRadius: '0px 0px 2px 2px',
      borderBottom: `1px solid ${fade(theme.palette.secondary.text, 0.5)}`,
    },
  },
  statisticsHeader: {
    borderLeft: `1px solid  ${fade(theme.palette.secondary.text, 0.5)}`,
    borderRight: `1px solid  ${fade(theme.palette.secondary.text, 0.5)}`,
    borderTop: `1px solid  ${fade(theme.palette.secondary.text, 0.5)}`,
    borderRadius: '2px 2px 0px 0px',

    display: 'flex',
    justifyContent: 'space-between',
    fontSize: 16,
    fontWeight: 500,
    padding: theme.spacing(1, 4),
  },
  statisticsItem: {
    borderLeft: `1px solid  ${fade(theme.palette.secondary.text, 0.5)}`,
    borderRight: `1px solid  ${fade(theme.palette.secondary.text, 0.5)}`,
    borderTop: `1px solid  ${fade(theme.palette.secondary.text, 0.5)}`,

    display: 'flex',
    fontSize: 16,
    justifyContent: 'space-between',
    padding: theme.spacing(1, 4),
  },
  theme: { alignSelf: 'center' },
  maxQuestionLevel: {
    display: 'flex',
    justifyContent: 'center',
    width: 200,
  },
}));
