import { makeStyles } from "@material-ui/core/styles";
import Modal from "@material-ui/core/Modal";
import React from "react";
import axios from "axios";
import { useHistory } from "react-router-dom";

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

export default function ExamFinish({ examId }: { examId: number }) {
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);
  const history = useHistory();

  const finishExam = () => {
    axios
      .post(`/api/me/exams/${examId}/end/`)
      .then((res) => {
        history.push("/sonuclar");
      })
      .catch((err) => {
        console.log("err", err);
      });
  };

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
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
            onClick={() => finishExam()}
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
