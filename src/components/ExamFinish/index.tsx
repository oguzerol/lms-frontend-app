import { makeStyles } from "@material-ui/core/styles";
import Modal from "@material-ui/core/Modal";
import React from "react";

import {
  Button,
  Typography,
  Grid,
  Theme,
  createStyles,
} from "@material-ui/core";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    paper: {
      position: "absolute",
      backgroundColor: theme.palette.background.paper,
      boxShadow: theme.shadows[5],
      top: "50%",
      left: "50%",
      transform: "translate(-50%, -50%)",
      textAlign: "center",
      padding: "50px",
      "&:focus": {
        outline: "none",
      },
    },
    finishExam: {
      whiteSpace: "nowrap",
      marginTop: "30px",
    },
  })
);

export default function ExamFinish({ finishExam }: { finishExam: any }) {
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleFinishExam = () => {
    finishExam.mutate();
  };

  const body = (
    <div className={classes.paper}>
      <Typography variant="h4">
        Sinavi bitirmek istediginizden emin misiniz?
        <br />
        Bitirdiginiz takdirde tekrar baslayamayacaksiniz.
      </Typography>
      <Grid container>
        <Grid item xs>
          <Button
            className={classes.finishExam}
            color="secondary"
            variant="contained"
            fullWidth
            onClick={handleFinishExam}
          >
            SINAVI BİTİRMEK İSTİYORUM
          </Button>
        </Grid>
        <Grid item xs>
          <Button
            className={classes.finishExam}
            variant="outlined"
            fullWidth
            onClick={handleClose}
          >
            VAZGEÇ
          </Button>
        </Grid>
      </Grid>
    </div>
  );

  return (
    <div>
      <Button color="secondary" variant="contained" onClick={handleOpen}>
        SINAVI BİTİR
      </Button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="simple-modal-title"
        aria-describedby="simple-modal-description"
      >
        {body}
      </Modal>
    </div>
  );
}
