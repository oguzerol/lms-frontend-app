import { useFormik } from "formik";
import axios from "axios";
import { Redirect, useHistory } from "react-router-dom";
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

import { API_LOGIN, URL_HOME, API_ME } from "../../core/route/constants";
import { selectAuth, setAuth } from "../../core/redux/auth";
import { useDispatch, useSelector } from "react-redux";

const validationSchema = yup.object({
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

const Login = () => {
  const classes = useStyles();
  const history = useHistory();
  const { isAuthenticated } = useSelector(selectAuth);

  const dispatch = useDispatch();

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: validationSchema,
    onSubmit: async (values) => {
      try {
        const response = await axios.post(API_LOGIN, {
          email: values.email,
          password: values.password,
        });
        axios.defaults.headers.common.token = response.data;
        localStorage.setItem("token", response.data);

        axios.get(API_ME).then((res) => {
          dispatch(setAuth(res.data));
          history.replace(URL_HOME);
        });
      } catch (err) {
        // TODO: handle errors
      }
    },
  });

  if (isAuthenticated) return <Redirect to={URL_HOME} />;
  return (
    <Container maxWidth="xs" className={classes.root}>
      <Box mb={3} display="flex" alignItems="center" flexDirection="column">
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Giriş Yap
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
        <Button
          type="submit"
          fullWidth
          variant="contained"
          color="primary"
          className={classes.submit}
        >
          Giriş Yap
        </Button>
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

export default Login;
