import React from 'react'
// Styles
import { Link, useNavigate } from 'react-router-dom';
import { Button, FormHelperText, CircularProgress, Box } from '@mui/material';
// Hooks
import { useForm } from "react-hook-form";
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from "yup";
// Store
import { useDispatch, useSelector } from 'react-redux';
import { auth, selectAuthLoading, selectAuthError, selectIsAuth } from './../../store/auth/slice';

const schema = yup.object({
  email: yup.string().email().required().test(value => value.includes('@activist.com') || value.includes('@derzh.com')),
  password: yup.string().required().min(6),
}).required();



const Auth = () => {

  const { register, handleSubmit, formState: { errors, isValid, isDirty } } = useForm({
    resolver: yupResolver(schema),
    mode: "onChange"
  });
  const navigate = useNavigate()

  const dispatch = useDispatch()

  const loading = useSelector(selectAuthLoading);
  const errorAuth = useSelector(selectAuthError);
  const isAuth = useSelector(selectAuthError);

  const onSubmit = (data, e) => {
    e.preventDefault();
    dispatch(auth(data))
    if (isAuth) {
      navigate('/')
    }
  }


  if (loading) {
    return <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', mt: 30 }}>
      <CircularProgress />
    </Box>
  }

  return (
    <div  className='container_register'>
      <Link className="button__in" to="/sign-up">Sign up</Link>
      <form className="form" onSubmit={handleSubmit(onSubmit)}>
        <h1 className="form__title">
          Sign in
        </h1>
        <p className="form__description">
          Sign in and start managing your account!
        </p>
        {errorAuth ? <FormHelperText sx={{ color: 'red', fondSize: 20, textAlign: 'center' }}>Password or email is incorrect</FormHelperText> : null}
        <input id="email" type="email" className="email-field" placeholder="Enter E-mail"  {...register("email")} />
        <FormHelperText sx={{ color: 'red' }}>{errors.email?.message}</FormHelperText>
        <input id="password" type="password" className="password-field" placeholder="Enter password" {...register("password")} />
        <FormHelperText sx={{ color: 'red' }}>{errors.password?.message}</FormHelperText>
        <Button variant="contained" className="submit_button" disabled={!isDirty || !isValid} type="submit">Sign in</Button>
      </form>
    </div>
  )
}


export default Auth
