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
    text: {
      main: 'rgb(0, 0, 0)',
      white: 'rgb(255, 255, 255)',
      secondary: 'rgb(189, 195, 199)',
      grey: 'rgb(149, 149, 149)',
      blue: 'rgb(74, 144, 226)',
    },
    blank: {
      main: '#ffffff',
      black: '#000000',
      divider: 'rgba(0, 0, 0, 0.08)',
      scrollBar: 'rgb(61, 61, 61)',
    },
    background: {
      main: 'rgb(255, 255, 255)',
      homework: 'rgb(247, 247, 249)',
      files: 'rgba(91, 100, 110, 0.1)',
      user: 'rgba(255, 152, 0, 0.15)',
      quarter: 'rgba(59, 197, 195)',
    },
    notification: {
      answered: 'rgb(39, 174, 96)', // green
      correct: 'rgb(39, 174, 96)', // green
      wrong: 'rgb(222, 72, 64)', // red
    },
    shadow: {
      paper: '0 2px 8px 0 rgba(205, 205, 210, 0.5)',
      upload: 'rgba(127, 140, 141, 0.6)',
    },
    level: {
      PreInt: 'rgb(112, 91, 207)',
      LowInt: 'rgb(243, 156, 18)',
      Int: 'rgb(52, 152, 219)',
      IntPlus: 'rgb(123, 173, 74)',
      UppInt: 'rgb(56, 71, 138)',
      Adv: 'rgb(247, 84, 84)',
    },
    role: {
      student: `rgb(27, 161, 226)`,
      teacher: `rgb(244, 114, 208)`,
      hr: `rgb(0, 138, 0)`,
      admin: `rgb(240, 163, 10)`,
    },
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
