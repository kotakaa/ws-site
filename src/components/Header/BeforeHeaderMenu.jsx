import React from 'react';
import { push } from 'connected-react-router';
import { WhiteButton } from '../../components/UIkit';
import LockOpenIcon from '@material-ui/icons/LockOpen';
import {useDispatch} from "react-redux";

const BeforeHeaderMenu = () => {
  const dispatch = useDispatch();
  return(
    <>
      <button
        onClick={() => dispatch(push("/admin/signup"))}
        className="after-button"
      >企業様はこちら</button>
      <span className="hedder-left">
        <button 
          onClick={() => dispatch(push("/signin"))}
          className="after-button"
        >ログイン</button>
      </span>
    </>
  )
}

export default BeforeHeaderMenu;