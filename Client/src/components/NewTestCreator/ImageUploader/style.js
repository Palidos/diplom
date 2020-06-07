import { makeStyles } from '@material-ui/core/styles';

export default makeStyles(theme => ({
  fileUploaderHeader: { fontSize: 16 },
  uploadField: {
    alignItems: 'center',

    backgroundColor: theme.palette.blank.main,
    border: `1px dashed ${theme.palette.primary.main}`,
    borderRadius: '2px',
    boxSizing: 'border-box',
    boxShadow: 'none',

    display: 'flex',
    justifyContent: 'center',
    fontSize: 12,
    height: 100,

    minHeight: 0,

    '& > div': {
      display: 'grid',
      gridGap: theme.spacing(1),
      gridTemplateAreas: `"icon text"`,
    },

    '& svg': {
      color: theme.palette.text.main,
      gridArea: 'icon',
      height: 24,
      width: 24,
    },
    '& input': { width: '100%' },
  },

  dropzoneText: {
    alignSelf: 'center',
    color: theme.palette.text.main,
    fontSize: 12,
    fontWeight: 500,
    gridArea: 'text',
    lineHeight: '14px',
    margin: 0,
  },
}));
