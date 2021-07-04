import { useEffect, useState } from "react";
import moment from "moment";
import { makeStyles } from "@material-ui/core/styles";

import TimeItem from "./TimeItem";

const useStyles = makeStyles(() => ({
  root: {
    display: "flex",
    flexDirection: "row",
  },
}));

type Props = {
  endTime: Date | null | undefined;
};

const ExamTimer = ({ endTime }: Props) => {
  const [now, setNow] = useState(moment());
  const utcEndTime = moment(endTime);
  const duration = moment.duration(utcEndTime.diff(moment()));
  const hours = Math.trunc(duration.asHours());
  const minutes = Math.trunc(duration.asMinutes() % 60);

  let remaingTime = "00:00";
  if (moment(now).isBefore(endTime)) {
    remaingTime = endTime
      ? `${hours < 10 ? "0" + hours : hours}:${
          minutes < 10 ? "0" + minutes : minutes
        }`
      : ":";
  }
  const classes = useStyles();

  useEffect(() => {
    const interval = setInterval(() => {
      setNow(moment());
    }, 1000);

    return () => {
      clearInterval(interval);
    };
  }, []);

  return (
    <div className={classes.root}>
      <TimeItem title="Saat" time={now.format("HH:mm")} />
      <TimeItem title="Kalan Süre" time={remaingTime} />
    </div>
  );
};

export default ExamTimer;
