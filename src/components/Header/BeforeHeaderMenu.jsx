import React from 'react';
import { push } from 'connected-react-router';
import { WhiteButton } from '../../components/UIkit';
import VpnKeyIcon from '@material-ui/icons/VpnKey';
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
          startIcon={<VpnKeyIcon />}
        />
      </div>
      </div>
    </>
  )
}

export default BeforeHeaderMenu;