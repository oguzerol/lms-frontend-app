import { useFormik } from "formik";
import axios from "axios";

import * as yup from "yup";
import Avatar from "@material-ui/core/Avatar";
import TextField from "@material-ui/core/TextField";
import Link from "@material-ui/core/Link";
import Grid from "@material-ui/core/Grid";
import Box from "@material-ui/core/Box";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import Button from "@material-ui/core/Button";

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
  const router = "test";

  const classes = useStyles();
  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: validationSchema,
    onSubmit: async (values) => {
      try {
        const response = await axios.post("/auth/login", {
          email: values.email,
          password: values.password,
        }); //handle API call to sign in here.
        console.log("response");
      } catch (err) {}
    },
  });
  console.log("yee");

  return (
    <Container maxWidth="xs">
      <Box mb={3} display="flex" alignItems="center" flexDirection="column">
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Giriş Yap
        </Typography>
      </Box>
      <form className={classes.form} onSubmit={formik.handleSubmit} noValidate>
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
              autoComplete="new-password"
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
