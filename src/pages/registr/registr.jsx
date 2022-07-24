import React from 'react'
import { Link } from 'react-router-dom';
// Hooks
import { useForm } from "react-hook-form";
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from "yup";
// Styles
import './registr.css'
import { Button, FormHelperText, Box, CircularProgress } from '@mui/material';
// Store
import { useDispatch, useSelector } from 'react-redux';
import { register as registerUser, selectAuthLoading , selectRegisterError} from './../../store/auth/slice';

const schema = yup.object({
  firstName: yup.string().required(),
  lastName: yup.string().required(),
  email: yup.string().email().required().test(value => value.includes('@activist.com') || value.includes('@derzh.com')),
  password: yup.string().required().min(6),
}).required();

const Registr = () => {

  const { register, handleSubmit, formState: { errors, isValid, isDirty } } = useForm({
    resolver: yupResolver(schema),
    mode: "onChange"
  });
  const dispatch = useDispatch()

  const loading = useSelector(selectAuthLoading)
  const error = useSelector(selectRegisterError)
  const onSubmit = data => {
    dispatch(registerUser(data))
  }

  if (loading) {
    return <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', mt: 30 }}>
      <CircularProgress />
    </Box>
  }

  if (error) {
    return <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', mt: 30 }}>
      <FormHelperText sx={{ color: 'red' }}>User is already exist</FormHelperText>
    </Box>
  }

  return (
    <div className='container_register'>
      <Link className="button__in" to="/sign-in">Sign in</Link>

      <form className="form" onSubmit={handleSubmit(onSubmit)}>
        <h1 className="form__title">
          Sign up
        </h1>
        <p className="form__description">
          Sign up and start managing your account!
        </p>
        <div className="row">
          <div>
            <input
              id="firstName"
              type="text"
              className="name-field"
              placeholder="Enter first name"
              {...register("firstName")}
            />
          </div>

          <div>
            <input
              id="lastName"
              type="text"
              className="surname-field"
              placeholder="Enter last name"
              {...register("lastName")}
            />
          </div>
        </div>
        <div className="row">
          <FormHelperText sx={{ color: 'red' }}>{errors.firstName?.message}</FormHelperText>
          <FormHelperText sx={{ color: 'red' }}>{errors.lastName?.message}</FormHelperText>
        </div>

        <input id="email" type="email" className="email-field" placeholder="Enter E-mail" {...register("email")} />
        <FormHelperText sx={{ color: 'red' }}>{errors.email?.message}</FormHelperText>
        <input id="password" type="password" className="password-field" placeholder="Enter password" {...register("password")} />
        <FormHelperText sx={{ color: 'red' }}>{errors.password?.message}</FormHelperText>

        <Button variant="contained" className="submit_button" disabled={!isDirty || !isValid} type="submit">Sign up</Button>
      </form>
    </div>
  )
}


export default Registr
