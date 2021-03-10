import { Grid } from "@material-ui/core";
import UpComingExam from "../../components/UpComingExam";

const Dashboard = () => {
  return (
    <Grid container spacing={2}>
      <Grid item sm={12} md={5}>
        <UpComingExam />
      </Grid>
    </Grid>
  );
};

export default Dashboard;
