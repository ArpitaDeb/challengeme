import React, { useEffect, useState, useCallback } from 'react';
import { Redirect } from 'react-router-dom';
import FormControl from '@material-ui/core/FormControl';
import { makeStyles } from '@material-ui/core/styles';
import InputLabel from '@material-ui/core/InputLabel';
import Input from '@material-ui/core/Input';
import InputAdornment from '@material-ui/core/InputAdornment';
import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';
import IconButton from '@material-ui/core/IconButton';
import LockIcon from '@material-ui/icons/Lock';
import Swal from 'sweetalert2';
import Timer from './TImer';

const useStyles = makeStyles(() => ({
  ForogotPassContainer: {
    marginTop: '90px',
    marginBottom: '10px',
    width: '320px',
  },
  ForogotPasspassword: {
    marginBottom: '10px',
    width: '320px',
  },
  ForogotPassconfirmPassword: {
    marginBottom: '30px',
    width: '320px',
  },
}));

const limit = 5;

export default function Change({ data, handleChange, changePassword = false }) {
  const classes = useStyles();

  const [showOldPassword, setShowOldPassword] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [redirect, setRedirect] = useState(false);

  const hideBoth = useCallback(() => {
    setShowOldPassword(false);
    setShowPassword(false);
    setShowConfirmPassword(false);
    // eslint-disable-next-line
  }, [])

  useEffect(() => {
    // Prevent special password eye bugs
    document.addEventListener('mouseup', hideBoth);
    document.addEventListener('dragend', hideBoth);
    // eslint-disable-next-line
  }, []);

  useEffect(() => {
    if (!changePassword) {
      const timer = setTimeout(() => {
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: 'Sorry, time is up !',
        }).then(() => {
          setRedirect(true);
        });
      }, limit * 60 * 1000);

      return () => {
        clearTimeout(timer);
      };
    }
  }, [changePassword]);

  return redirect ? (
    <Redirect to="/" />
  ) : (
    <div className={classes.ForogotPassContainer}>
      {!changePassword && (
        <>
          {' '}
          <b> Attention!</b>
          {' '}
          You have
          {' '}
          <Timer limit={limit} unit="minutes" />
          {' '}
          to change your password.
          <br />
          Enter new password :
        </>
      )}
      {changePassword
          && (
            <FormControl className={classes.ForogotPasspassword}>
              <InputLabel
                style={{ color: 'grey' }}
                className={classes.labelPass}
                htmlFor="standard-adornment-password"
              >
                Old Password
              </InputLabel>
              <Input
                name="oldP"
                id="oldPassword"
                value={data.oldPassword}
                type={showOldPassword ? 'text' : 'password'}
                onChange={handleChange('oldP')}
                endAdornment={(
                  <InputAdornment position="end">
                    <IconButton
                      style={{ opacity: '0.7' }}
                      aria-label="toggle password visibility"
                      onMouseDown={() => setShowOldPassword(true)}
                    >
                      {showOldPassword ? (
                        <Visibility />
                      ) : (
                        <VisibilityOff />
                      )}
                    </IconButton>
                    <LockIcon style={{ opacity: '0.7' }} />
                  </InputAdornment>
                )}
              />
            </FormControl>
          )}
      <FormControl className={classes.ForogotPasspassword}>
        <InputLabel
          style={{ color: 'grey' }}
          className={classes.labelPass}
          htmlFor="standard-adornment-password"
        >
          Password
        </InputLabel>
        <Input
          name="newP"
          id="newPassword"
          value={data.password}
          type={showPassword ? 'text' : 'password'}
          onChange={handleChange('newP')}
          endAdornment={(
            <InputAdornment position="end">
              <IconButton
                style={{ opacity: '0.7' }}
                aria-label="toggle password visibility"
                onMouseDown={() => setShowPassword(true)}
              >
                {showPassword ? (
                  <Visibility />
                ) : (
                  <VisibilityOff />
                )}
              </IconButton>
              <LockIcon style={{ opacity: '0.7' }} />
            </InputAdornment>
          )}
        />
      </FormControl>
      <FormControl className={classes.ForogotPassconfirmPassword}>
        <InputLabel
          style={{ color: 'grey' }}
          className={classes.labelPass}
          htmlFor="standard-adornment-password"
        >
          Confirm Password
        </InputLabel>
        <Input
          id="confirmNewPassword"
          name="confirmP"
          value={data.confirmPassword}
          type={showConfirmPassword ? 'text' : 'password'}
          onChange={handleChange('confirmP')}
          endAdornment={(
            <InputAdornment position="end">
              <IconButton
                style={{ opacity: '0.7' }}
                aria-label="toggle password visibility"
                onMouseDown={() => setShowConfirmPassword(true)}
              >
                {showConfirmPassword ? (
                  <Visibility />
                ) : (
                  <VisibilityOff />
                )}
              </IconButton>
              <LockIcon style={{ opacity: '0.7' }} />
            </InputAdornment>
          )}
        />
      </FormControl>
    </div>
  );
}
