import React from 'react';
import { useDispatch } from 'react-redux';
import { push } from 'connected-react-router';
import { WhiteButton } from '../components/UIkit';
import CreateIcon from '@material-ui/icons/Create';
import LibraryBooksIcon from '@material-ui/icons/LibraryBooks';


const AdminTopPage = () => {
  const dispatch = useDispatch();

  return(
    <div className="back-ground-top">
      <div className="c-section-toppage">
        <div className="center"> 
          <WhiteButton 
            onClick={() => dispatch(push("/product/edit"))}
            label={"式場を作成"}
            startIcon={<CreateIcon />}
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


export default AdminTopPage;