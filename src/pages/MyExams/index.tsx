import { useEffect } from "react";
import axios from "axios";

import Table from "@material-ui/core/Table";
import Button from "@material-ui/core/Button";
import Box from "@material-ui/core/Box";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import { Typography } from "@material-ui/core";
import { UserExams } from "../../core/types/exam";
import useUserExams from "../../core/querys/useUserExams";
import Loading from "../../components/Loading";
import { useSocket } from "../../core/contexts/socket";
import { toastError, toastLocalDebug } from "../../core/utils/toaster";

export default function StandAloneExams() {
  const socket = useSocket();
  let { data, isLoading, error } = useUserExams("done");

  useEffect(() => {
    if (socket == null) return;

    toastLocalDebug("Socket bağlantısı kuruldu.");

    socket.on("end-exam", () => {
      toastLocalDebug("Socket'ten sınavı bitirme isteği geldi.");
    });

    return () => {
      socket.off("end-exam");
      toastLocalDebug("Socket bağlantısı kapatıldı.");
    };
  }, [socket]);

  const startExam = (id: number) => {
    axios
      .put(`user/exams/${id}/start`)
      .then((res) => toastLocalDebug(`Sinav baslatma istegi basarili ${res}`))
      .catch((err) => {
        toastError(`Sınava başlanamadı. ${err.response.data.error}`);
      });
  };

  if (error) return <Typography>Bir hata oluştu.</Typography>;
  if (isLoading) return <Loading />;

  return data && data.length ? (
    <TableContainer component={Paper}>
      <Table aria-label="simple table">
        <TableHead color="secondary">
          <TableRow>
            <TableCell>Sınav</TableCell>
            <TableCell align="right"></TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {data.map((item: UserExams) => (
            <TableRow key={item.info.id}>
              <TableCell component="th" scope="row">
                {item.info.name}
              </TableCell>

              <TableCell align="right">
                <Button
                  variant="outlined"
                  color="secondary"
                  onClick={() => startExam(item.info.id)}
                >
                  Sınava Başla
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  ) : (
    <Typography variant="h4">
      <Box textAlign="center">
        Şu anda aktif olarak çözebileceğiniz bir sınav bulunmuyor. Hemen yeni
        bir sınav satın alın
      </Box>
    </Typography>
  );
}
