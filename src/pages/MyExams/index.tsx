import { Grid } from "@material-ui/core";
import UpComingExam from "../../components/UpComingExam";

const MyExams = () => {
  return (
    <Grid container spacing={2}>
      <Grid item xs={12} sm={4}>
        <UpComingExam />
      </Grid>
    </Grid>
  );
};

export default MyExams;
