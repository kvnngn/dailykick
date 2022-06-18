import { Typography, Button, Grid } from '@mui/material';

import AddTwoToneIcon from '@mui/icons-material/AddTwoTone';
import { useState } from 'react';
import AddWarehouseModal from './add/AddWarehouseModal';

function PageHeader() {
  const [openModal, setOpenModal] = useState<boolean>(false);

  const handleOpen = () => {
    if (!openModal) {
      setOpenModal(true);
    }
  };

  return (
    <>
      {openModal && (
        <AddWarehouseModal open={openModal} onClose={setOpenModal} />
      )}
      <Grid container justifyContent="space-between" alignItems="center">
        <Grid item>
          <Typography variant="h3" component="h3" gutterBottom>
            Dépôts
          </Typography>
        </Grid>
        <Grid item>
          <Button
            sx={{ mt: { xs: 2, md: 0 } }}
            variant="contained"
            startIcon={<AddTwoToneIcon fontSize="small" />}
            onClick={() => handleOpen()}
          >
            Ajouter un dépot
          </Button>
        </Grid>
      </Grid>
    </>
  );
}

export default PageHeader;
