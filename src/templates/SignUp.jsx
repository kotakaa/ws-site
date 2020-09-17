import React, {useState, useCallback} from 'react';
import { TextInput, PrimaryButton } from '../components/UIkit';
import { signUp } from '../reducks/users/operations';
import { useDispatch } from 'react-redux';
import { push } from 'connected-react-router';
import Grid from '@material-ui/core/Grid';
import AccountCircle from '@material-ui/icons/AccountCircle';
import EmailIcon from '@material-ui/icons/Email';
import HttpsIcon from '@material-ui/icons/Https';
import { Divider } from '@material-ui/core';

const SignUp = () => {
  const dispatch = useDispatch();

  const [username, setUsername] = useState(""),
        [email, setEmail] = useState(""),
        [password, setPassword] = useState(""),
        [confirmPassword, setConfirmPassword] = useState("");

  const inputUsername = useCallback((event) => {
    setUsername(event.target.value)
  }, [setUsername])

  const inputEmail = useCallback((event) => {
    setEmail(event.target.value)
  }, [setEmail])

  const inputPassword = useCallback((event) => {
    setPassword(event.target.value)
  }, [setPassword])

  const inputConfirmPassword = useCallback((event) => {
    setConfirmPassword(event.target.value)
  }, [setConfirmPassword])

  
  return(
    <div className="back-ground-main">
      <div className="c-section-main">
        <h2 className="u-text__headline u-text-center">Create Account</h2>
        <Divider/>
        <div className="module-spacer--medium" />
  
      <Grid container spacing={1} alignItems="flex-end" >
        <Grid item>
          <AccountCircle />
        </Grid>
        <Grid item >
          <TextInput 
            id="input-with-icon-grid" 
            fullWidth={ true }
            label={ "ユーザー名" }
            multiline={ false }
            rows={ 1 }
            value={ username }
            type={ "text" }
            required={ true }
            onChange={ inputUsername }
          />
        </Grid>
      </Grid>

      <Grid container spacing={1} alignItems="flex-end">
        <Grid item>
          <EmailIcon />
        </Grid>
        <Grid item>
          <TextInput 
            fullWidth={ true }
            label={ "メールアドレス" }
            multiline={ false }
            rows={ 1 }
            value={ email }
            type={ "email" }
            required={ true }
            onChange={ inputEmail }
          />
        </Grid>
      </Grid>

      <Grid container spacing={1} alignItems="flex-end">
        <Grid item>
          <HttpsIcon />
        </Grid>
        <Grid item>
          <TextInput 
            fullWidth={ true }
            label={ "パスワード" }
            multiline={ false }
            rows={ 1 }
            value={ password }
            type={ "password" }
            required={ true }
            onChange={ inputPassword }
          />
        </Grid>
      </Grid>

      <Grid container spacing={1} alignItems="flex-end">
        <Grid item>
          <HttpsIcon />
        </Grid>
        <Grid item>
          <TextInput 
            fullWidth={ true }
            label={ "パスワード(再確認)" }
            multiline={ false }
            rows={ 1 }
            value={ confirmPassword }
            type={ "password" }
            required={ true }
            onChange={ inputConfirmPassword }
          />
        </Grid>
      </Grid>
        <div className="center">
          <PrimaryButton 
            label={ "Sign up" }
            onClick={() => dispatch(signUp(username, email, password, confirmPassword))}
          />
          <div className="module-spacer--medium" />
          <div  className="c-cursor"
              onClick={() => dispatch(push("/signin"))}>アカウントをすでにお持ちの方はこちら</div>
          </div>
      </div>
      </div>
  )  
}

export default SignUp;