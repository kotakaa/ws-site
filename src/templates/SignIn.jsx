import React, {useState, useCallback} from 'react';
import { TextInput, PrimaryButton } from '../components/UIkit';
import { signIn } from '../reducks/users/operations';
import { useDispatch } from 'react-redux';
import { push } from 'connected-react-router';
import Grid from '@material-ui/core/Grid';
import EmailIcon from '@material-ui/icons/Email';
import HttpsIcon from '@material-ui/icons/Https';
import { Divider } from '@material-ui/core';

const SignIn = () => {
  const dispatch = useDispatch()

  const [email, setEmail] = useState(""),
        [password, setPassword] = useState("");

  const inputEmail = useCallback((event) => {
    setEmail(event.target.value)
  }, [setEmail])

  const inputPassword = useCallback((event) => {
    setPassword(event.target.value)
  }, [setPassword])

  
  return(
    <div className="back-ground-main">
      <div className="c-section-main">
        <h2 className="u-text__headline u-text-center">LOGIN</h2>
        <Divider />
        <div className="module-spacer--medium" />
  
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

        <div className="center">
          <PrimaryButton 
            label={ "Sign in" }
            onClick={() => dispatch(signIn(email, password))}
          />
          <div className="module-spacer--medium" />
          <div  className="c-cursor"
              onClick={() => dispatch(push("/signup"))}>アカウントをお持ちでない方はこちら</div>
          <div  className="c-cursor"
              onClick={() => dispatch(push("/signin/reset"))}>パスワードを忘れた方はこちら</div>
        </div>
      </div>
    </div>
  )  
}

export default SignIn