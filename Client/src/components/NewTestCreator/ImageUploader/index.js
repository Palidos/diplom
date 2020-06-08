import React from 'react';

import { DropzoneArea } from 'material-ui-dropzone';

import useStyles from './style';
// ImageUploader component
export default function ImageUploader({ setQuestionInfo, inputName }) {
  const classes = useStyles();

  const toDataURL = url => fetch(url)
    .then(response => response.blob())
    .then(blob => new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onloadend = () => resolve(reader.result);
      reader.onerror = reject;
      reader.readAsDataURL(blob);
    }));

  const handleChange = async newFilesArray => {
    const file = newFilesArray[newFilesArray.length - 1];
    const url = URL.createObjectURL(file);

    toDataURL(url)
      .then(dataUrl => {
        setQuestionInfo(previousQuestionInfo => ({
          ...previousQuestionInfo,
          [inputName]: dataUrl,
        }));
      });
  };

  // const handleChange = async newFilesArray => {
  //   const file = newFilesArray[newFilesArray.length - 1];
  //   const formData = new FormData();
  //   formData.append('File', file);
  //   setQuestionInfo(previousQuestionInfo => ({
  //     ...previousQuestionInfo,
  //     [inputName]: formData,
  //   }));
  // };


  return (
    <>
      <div className={classes.fileUploaderHeader}>{'Question Image'}</div>
      <DropzoneArea
        name={inputName}
        acceptedFiles={['image/*']}
        filesLimit={1}
        showPreviewsInDropzone={false}
        maxFileSize={Infinity}
        dropzoneClass={classes.uploadField}
        dropzoneParagraphClass={classes.dropzoneText}
        dropzoneText={'Upload image'}
        onChange={files => handleChange(files)}
      />
    </>
  );
}
