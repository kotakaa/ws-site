import React from 'react';
import { useSelector } from 'react-redux';
import { Route, Switch } from 'react-router';
import { SignIn, ProductList, SignUp, Reset, ProductEdit, ProductDetail, FavoriteList, AdminSignUp, AdminTopPage, TopPage, MyPage} from './templates';
import Auth from './Auth';
import { getRole } from './reducks/users/selectors';



const Router = () => {
  const selector = useSelector((state) => state);
  const role = getRole(selector);

  function BranchingComponent(){
    if(role === "admin") 
      return <AdminTopPage />;
    else 
      return <TopPage />;
  }
  return(
    <Switch>
      <Route exact path={"/signup"} component={SignUp} />
      <Route exact path={"/signin"} component={SignIn} />
      <Route exact path={"/signin/reset"} component={Reset} />
      <Route exact path={"/admin/signup"} component={AdminSignUp} />
      <Route exact path={"(/)?"} component={BranchingComponent} />
      <Auth>
        <Route exact path={"/product"} component={ProductList} />
        <Route exact path={"/user/mypage"} component={MyPage} />
        <Route exact path={"/product/:id"} component={ProductDetail} />
        <Route path={"/product/edit(/:id)?"} component={ProductEdit} />
        <Route path={"/favorite"} component={FavoriteList} />
      </Auth>
    </Switch>
  )
}

export default Router;