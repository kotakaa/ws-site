import React, { useState, useCallback, useEffect } from 'react';
import Divider from '@material-ui/core/Divider';
import Drawer from '@material-ui/core/Drawer';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import {makeStyles} from '@material-ui/core/styles';
import IconButton from "@material-ui/core/IconButton";
import CheckIcon from '@material-ui/icons/Check';
import ControlPointIcon from '@material-ui/icons/ControlPoint';
import SearchIcon from "@material-ui/icons/Search";
import PersonIcon from '@material-ui/icons/Person';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import ExpandLess from '@material-ui/icons/ExpandLess';
import ExpandMore from '@material-ui/icons/ExpandMore';
import Collapse from '@material-ui/core/Collapse';
import {push} from "connected-react-router";
import {useDispatch} from "react-redux";
import {signOut} from "../../reducks/users/operations";
import {TextInput} from "../UIkit";
import { db } from "../../firebase/index";
import { getProduct } from '../../reducks/products/operations';


const useStyles = makeStyles((theme) => ({
  drawer: {
    [theme.breakpoints.up('sm')]: {
      width: 256,
      flexShrink: 0,
    }
  },
  toolbar: theme.mixins.toolbar,
  drawerPaper: {
    width: 256
  },
  searchField: {
    alignItems: 'center',
    display: 'flex',
    marginLeft: 32
  },
  search: {
    marginTop: 18
  }
}))

const MenuDrawer = (props) => {
  const classes = useStyles()
  const dispatch = useDispatch()
  const {container} = props
  const [keyword, setKeyword] = useState("");
  const [styleFilters, setStyleFilters] = useState([]);
  const [typeFilters, setTypeFilters] = useState([]);
  const [styleOpen, setStyleOpen] = useState(true);
  const [typeOpen, setTypeOpen] = useState(true);


  const styleHandleClick = () => {
    setStyleOpen(!styleOpen);
  };

  const typeHandleClick = () => {
    setTypeOpen(!typeOpen);
  };

  const inputKeyword = useCallback((event) => {
    setKeyword(event.target.value)
  }, [setKeyword])

  const selectMenu = (event, path) => {
    dispatch(push(path))
    props.onClose(event)
  }


  const menus = [
    { func: selectMenu, 
      label: "商品登録",
      icon: <ControlPointIcon />,
      id: "register",
      value: "/product/edit"
    },
    { func: selectMenu, 
      label: "費用チェック",
      icon: <CheckIcon />,
      id: "cost",
      value: "/step"
    },
    { func: selectMenu, 
      label: "プロフィール",
      icon: <PersonIcon />,
      id: "profile",
      value: "/user/mypage"
    }
  ]

  useEffect(() => {
    db.collection('styles').orderBy('order', 'asc').get()
      .then(snapshots => {
        const list = [];
        snapshots.forEach(snapshot => {
          const style = snapshot.data()
          list.push(
            { func: selectMenu,
              label: style.name,
              id: style.id,
              value: `?style=${style.id}`}
          )
        })
        setStyleFilters(prevState => [...prevState, ...list])
      })
    db.collection('types').orderBy('order', 'asc').get()
    .then(snapshots => {
      const list = [];
      snapshots.forEach(snapshot => {
        const type = snapshot.data()
        list.push(
          { func: selectMenu,
            label: type.name,
            id: type.id,
            value: `?type=${type.id}`}
        )
      })
      setTypeFilters(prevState => [...prevState, ...list])
    })
  },[])

  return(
    <nav className={classes.drawer}>
      <Drawer
        container={container}
        variant='temporary'
        anchor={'right'}
        open={props.open}
        onClose={(event) => props.onClose(event)}
        classes={{paper: classes.drawerPaper}}
        ModalProps={{keepMounted: true}}
      >
      <div 
        onClose={(event) => props.onClose(event)}
        onKeyDown={(event) => props.onClose(event)}
      >
        <div className={classes.searchField}>
          <TextInput 
            fullWidth={ false }
            label={ "キーワードを入力" }
            multiline={ false }
            rows={ 1 }
            value={ keyword }
            type={ "text" }
            required={ true }
            onChange={ inputKeyword }
            />
          <IconButton className={classes.search}>
            <SearchIcon 
              onClick={() => dispatch(getProduct(keyword))}
              />
          </IconButton>
        </div>
        <div className="module-spacer--extra-small" />
        <Divider />
        <List>
          { menus.map(menu => (
            <ListItem button key={menu.id} onClick={(event) => menu.func(event, menu.value)}>
              <ListItemIcon>
                {menu.icon}
              </ListItemIcon>
              <ListItemText primary={menu.label} />
            </ListItem>
          ))}
          <ListItem 
            button key="logout" 
            onClick={() => dispatch(signOut())}
          >
            <ListItemIcon>
              <ExitToAppIcon />
            </ListItemIcon>
            <ListItemText primary={"ログアウト"} />
          </ListItem>
        </List>
        <Divider/>
        <ListItem button onClick={styleHandleClick}>
          <ListItemText primary="挙式スタイル" />
          {styleOpen ? <ExpandLess /> : <ExpandMore />}
        </ListItem>
        <Collapse in={styleOpen} timeout="auto" unmountOnExit>
          <List component="div" disablePadding>
            {styleFilters.map( filter => (
              <ListItem button key={filter.id} onClick={(event) => filter.func(event, filter.value)}>
                <ListItemText primary={filter.label} />
              </ListItem>
            ))}
          </List>
        </Collapse>
        <Divider/>
        <ListItem button onClick={typeHandleClick}>
          <ListItemText primary="式場タイプ" />
          {typeOpen ? <ExpandLess /> : <ExpandMore />}
        </ListItem>
        <Collapse in={typeOpen} timeout="auto" unmountOnExit>
          <List component="div" disablePadding>
            {typeFilters.map( filter => (
              <ListItem button key={filter.id} onClick={(event) => filter.func(event, filter.value)}>
                <ListItemText primary={filter.label} />
              </ListItem>
            ))}
          </List>
        </Collapse>
        <Divider/>
      </div>
      </Drawer>
    </nav>
  )
}

  export default MenuDrawer