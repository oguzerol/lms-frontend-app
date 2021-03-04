import { Grid } from "@material-ui/core";
import { useEffect } from "react";
import UpComingExam from "../../components/UpComingExam";
import { useSocket } from "../../core/contexts/socket";

const Dashboard = () => {
  const socket = useSocket();

  useEffect(() => {
    if (socket == null) return;

    socket.on("test", (test) => {
      console.log("test", test);
    });

    return () => {
      socket.off("test");
    };
  }, [socket]);
  return (
    <Grid container spacing={2}>
      <Grid item sm={12} md={5}>
        <UpComingExam />
      </Grid>
    </Grid>
  );
};

export default Dashboard;
