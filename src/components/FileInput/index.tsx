import { Box, Button } from '@mui/material';
import _ from 'lodash';
import { useState, useEffect, FC } from 'react';

type FileInputProps = {
  setSelectedImage: (file: any) => void;
  selectedImage?: any;
};

const FileInput: FC<FileInputProps> = ({ selectedImage, setSelectedImage }) => {
  const [imageUrl, setImageUrl] = useState(null);

  useEffect(() => {
    if (selectedImage && !_.isString(selectedImage)) {
      console.log('object');
      setImageUrl(URL.createObjectURL(selectedImage));
    } else {
      console.log('string or null');
      setImageUrl(selectedImage);
    }
  }, [selectedImage]);

  return (
    <>
      <input
        accept="image/*"
        type="file"
        id="select-image"
        style={{ display: 'none' }}
        onChange={(e) => setSelectedImage(e.target.files[0])}
      />
      <label htmlFor="select-image">
        <Button variant="contained" color="primary" component="span">
          Importer une image
        </Button>
      </label>

      {imageUrl && selectedImage && (
        <Box mt={2}>
          <div>Aperçu:</div>
          <img src={imageUrl} alt={selectedImage.name} height="100px" />
        </Box>
      )}
    </>
  );
};

export default FileInput;
