import React from 'react';
import { push } from 'connected-react-router';
import { WhiteButton } from '../../components/UIkit';
import LockOpenIcon from '@material-ui/icons/LockOpen';
import {useDispatch} from "react-redux";

const BeforeHeaderMenu = () => {
  const dispatch = useDispatch();
  return(
    <>
      <div>
      <WhiteButton 
        onClick={() => dispatch(push("/admin/signup"))}
        label={"企業様はこちら"}
      />
      <div className="c-margin-left"> 
        <WhiteButton 
          onClick={() => dispatch(push("/signin"))}
          label={"SIGN IN"}
          startIcon={<LockOpenIcon />}
        />
      </div>
      </div>
    </>
  )
}

export default BeforeHeaderMenu;