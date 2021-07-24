import axios from "axios";

import Box from "@material-ui/core/Box";
import { Typography } from "@material-ui/core";
import Container from "@material-ui/core/Container";
import Grid from "@material-ui/core/Grid";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Button from "@material-ui/core/Button";
import { Exams as ExamsType } from "../../core/types/exam";
import Loading from "../../components/Loading";
import { toastError } from "../../core/utils/toaster";
import { useHistory } from "react-router";
import { URL_EXAM } from "../../core/route/constants";
import useExams from "../../core/querys/useExams";

import ydtImage from "../../assets/images/ucretsiz-eyds.jpg";

const useStyles = makeStyles((theme) => ({
  media: {
    height: "200px",
    objectFit: "contain",
  },
  cardActions: {
    justifyContent: "flex-end",
  },
}));

export default function Exams() {
  const classes = useStyles();
  const history = useHistory();
  let { data, isLoading, error } = useExams();

  const startExam = (id: number) => {
    axios
      .put(`user/exams/${id}/start`)
      .then((res) => history.push(`${URL_EXAM}/${id}`))
      .catch((err) => {
        toastError(`Sınava başlanamadı. ${err.response.data.error}`);
      });
  };

  if (error) return <Typography>Bir hata oluştu.</Typography>;
  if (isLoading) return <Loading />;

  return data && data.length ? (
    <Container>
      <Grid container spacing={3}>
        {data.map((exam: ExamsType) => (
          <Grid item xs={12} sm={3} key={exam.id}>
            <Card>
              <CardMedia
                className={classes.media}
                src={ydtImage}
                component="img"
                title="Ucretsiz E-YDS"
              />
              <CardContent>
                <Typography
                  gutterBottom
                  variant="subtitle1"
                  component="h5"
                  align="center"
                >
                  {exam.name}
                </Typography>
                <Typography
                  variant="subtitle2"
                  color="textSecondary"
                  component="p"
                >
                  {exam.description}
                </Typography>
                <CardActions className={classes.cardActions} disableSpacing>
                  <Button
                    onClick={() => startExam(exam.id)}
                    size="small"
                    color="primary"
                    variant="outlined"
                  >
                    Satın Al {exam.price}
                  </Button>
                </CardActions>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Container>
  ) : (
    <Typography variant="h4">
      <Box textAlign="center">
        Şu anda aktif olarak çözebileceğiniz bir sınav bulunmuyor. Hemen yeni
        bir sınav satın alın
      </Box>
    </Typography>
  );
}
