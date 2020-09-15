import React, {useState, useCallback} from 'react';
import { TextInput, PrimaryButton } from '../components/UIkit';
import { resetPassword } from '../reducks/users/operations';
import { useDispatch } from 'react-redux';
import { push } from 'connected-react-router';
import Grid from '@material-ui/core/Grid';
import EmailIcon from '@material-ui/icons/Email';
import { Divider } from '@material-ui/core';


const Reset = () => {
  const dispatch = useDispatch()

  const [email, setEmail] = useState("");

  const inputEmail = useCallback((event) => {
    setEmail(event.target.value)
  }, [setEmail]);

  
  return(
    <div className="back-ground-main">
      <div className="c-section-main">
        <h2 className="u-text__headline u-text-center">Password Reset</h2>
        <Divider/>
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
  
        <div className="center">
          <PrimaryButton 
            label={ "Password reset" }
            onClick={() => dispatch(resetPassword(email))}
          />
          <div className="module-spacer--medium" />
          <div  className="c-cursor"
              onClick={() => dispatch(push("/signin"))}>ログイン画面に戻る</div>
        </div>
      </div>
    </div>
  )
}

export default Reset;