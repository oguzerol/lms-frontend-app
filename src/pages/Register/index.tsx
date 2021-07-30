import { useFormik } from "formik";
import axios from "axios";
import { Link as RouterLink, Redirect, useHistory } from "react-router-dom";
import * as yup from "yup";
import { makeStyles } from "@material-ui/core/styles";
import Avatar from "@material-ui/core/Avatar";
import Link from "@material-ui/core/Link";
import Grid from "@material-ui/core/Grid";
import Box from "@material-ui/core/Box";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Typography from "@material-ui/core/Typography";
import Container from "@material-ui/core/Container";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";

import {
  API_REGISTER,
  URL_DASHBOARD,
  URL_LOGIN,
} from "../../core/route/constants";
import { selectAuth } from "../../core/redux/slices/auth";
import { useSelector } from "react-redux";

const validationSchema = yup.object({
  username_: yup
    .string()
    .min(3, "Şifre en az üç karakterden oluşmalıdır.")
    .required("Kullanıcı adı gerekli."),
  email: yup
    .string()
    .email("Geçerli bir email adresi giriniz.")
    .required("Email gerekli."),
  password: yup
    .string()
    .min(8, "Şifre en az sekiz karakterden oluşmalıdır.")
    .required("Şifre gereklidir."),
});

const useStyles = makeStyles((theme) => ({
  root: {
    minHeight: "100vh",
    display: "flex",
    justifyContent: "center",
    flexDirection: "column",
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: "100%", // Fix IE 11 issue.
    marginTop: theme.spacing(3),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

const Register = () => {
  const classes = useStyles();
  const history = useHistory();
  const { isAuthenticated } = useSelector(selectAuth);

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
      username_: "",
      api: "",
    },
    validationSchema: validationSchema,
    onSubmit: async (values, { setErrors }) => {
      axios
        .post(API_REGISTER, {
          email: values.email,
          password: values.password,
          username: values.username_,
        })
        .then((response) => {
          history.replace(URL_LOGIN);
        })
        .catch((err: any) => {
          setErrors({ api: err.response.data.message });
        });
    },
  });

  if (isAuthenticated) return <Redirect to={URL_DASHBOARD} />;

  return (
    <Container maxWidth="xs" className={classes.root}>
      <Box mb={3} display="flex" alignItems="center" flexDirection="column">
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h4">
          Kayıt Ol
        </Typography>
      </Box>
      <form
        className={classes.form}
        onSubmit={formik.handleSubmit}
        noValidate
        autoComplete="off"
      >
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <TextField
              variant="outlined"
              required
              fullWidth
              placeholder="Kullanıcı adınızı giriniz."
              id="username_"
              label="Kullanıcı Adınız"
              name="username_"
              autoComplete="off"
              value={formik.values.username_}
              onChange={formik.handleChange}
              error={
                formik.touched.username_ && Boolean(formik.errors.username_)
              }
              helperText={formik.touched.username_ && formik.errors.username_}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              variant="outlined"
              required
              fullWidth
              placeholder="Email adresinizi giriniz."
              id="email"
              label="E-mail Adresiniz"
              name="email"
              autoComplete="off"
              value={formik.values.email}
              onChange={formik.handleChange}
              error={formik.touched.email && Boolean(formik.errors.email)}
              helperText={formik.touched.email && formik.errors.email}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              variant="outlined"
              required
              fullWidth
              name="password"
              label="Şifreniz"
              type="password"
              placeholder="Şifrenizi giriniz."
              id="password"
              autoComplete="new-password"
              value={formik.values.password}
              onChange={formik.handleChange}
              error={formik.touched.password && Boolean(formik.errors.password)}
              helperText={formik.touched.password && formik.errors.password}
            />
          </Grid>
        </Grid>

        <Box mt={2}>
          {formik.errors.api && (
            <Typography color="secondary">{formik.errors.api}</Typography>
          )}
        </Box>
        <Button
          type="submit"
          fullWidth
          disabled={formik.isSubmitting}
          variant="contained"
          color="primary"
          className={classes.submit}
        >
          Hesap Oluştur
        </Button>
        <Typography color="textSecondary" variant="body2" align="right">
          Hesabın var mi?{" "}
          <Link
            component={RouterLink}
            to={URL_LOGIN}
            variant="body2"
            color="secondary"
          >
            Giriş Yap
          </Link>
        </Typography>
      </form>
      <Box mt={5}>
        <Typography variant="body2" color="textSecondary" align="center">
          {"Copyright © "}
          <Link color="inherit" href="www.onlineydt.com">
            onlineydt
          </Link>{" "}
          {new Date().getFullYear()}
          {"."}
        </Typography>
      </Box>
    </Container>
  );
};

export default Register;
