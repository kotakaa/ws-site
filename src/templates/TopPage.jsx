import React from 'react';
import { useDispatch } from 'react-redux';
import { push } from 'connected-react-router';
import { WhiteButton } from '../components/UIkit';
import SearchIcon from '@material-ui/icons/Search';
import LibraryBooksIcon from '@material-ui/icons/LibraryBooks';

const TopPage = () => {
  const dispatch = useDispatch();

  return(
    <div className="back-ground-top">
      <div className="c-section-toppage">
        <div className="center"> 
            様々な式場の中から気に入った式場、<br/>
            お２人のこだわりに合う結婚式をお選びいただき<br/>
            予想費用をチェックしていただけます
        </div>
        <div className="module-spacer--small"/>
        <div className="center"> 
          <WhiteButton 
            onClick={() => dispatch(push("/seatch"))}
            label={"式場を探す"}
            startIcon={<SearchIcon />}
          />
          <div className="c-margin-left"> 
            <WhiteButton 
              onClick={() => dispatch(push("/product"))}
              label={"式場の一覧"}
              startIcon={<LibraryBooksIcon />}
            />
          </div>
        </div>
      </div>
    </div>
  )
}


export default TopPage;