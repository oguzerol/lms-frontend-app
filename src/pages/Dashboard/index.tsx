import { Grid } from "@material-ui/core";
import UpComingExam from "../../components/UpComingExam";

const Dashboard = () => {
  return (
    <Grid container spacing={2}>
      <Grid item xs={12} sm={6}>
        <UpComingExam />
      </Grid>
    </Grid>
  );
};

export default Dashboard;
