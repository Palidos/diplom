import { createMuiTheme } from '@material-ui/core/styles';

export const colors = {
  answered: '#ffeb3b', // yellow
  correct: '#00e676', // green
  wrong: '#f44336', // red
};
// A custom theme for this app
export default createMuiTheme({
  palette: {
    primary: {
      main: 'rgb(56, 71, 138)',
      text: 'rgb(74, 74, 74)',
    },
    secondary: {
      main: '#efeff4',
      text: 'rgb(189, 195, 199)',
    },
    blank: { scrollBar: 'rgb(61, 61, 61)' },

  },
  overrides: {
    MuiPaper: { elevation1: { boxShadow: '0 2px 8px 0 rgba(205, 205, 210, 0.5)' } },
    MuiSvgIcon: { root: { color: 'rgba(37, 37, 37, 0.8)' } },
    MuiDialogContent: { root: { overflowY: 'visible' } },
    MuiDialog: { paper: { overflowY: 'visible' } },
    MuiSnackbarContent: {
      root: {
        backgroundColor: 'rgb(39, 174, 96)',
        color: 'rgb(255, 255, 255)',
      },
    },
    MuiMenu: { paper: { maxHeight: '200px' } },
  },
});
