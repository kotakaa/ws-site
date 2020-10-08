import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import {useDispatch, useSelector} from "react-redux";
import IconButton from "@material-ui/core/IconButton";
import MoreVertIcon from '@material-ui/icons/MoreVert';
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import NoImage from "../../assets/img/src/no_image.png";
import { push } from "connected-react-router";
import { deleteProducts } from "../../reducks/products/operations";
import { getRole, getUserId } from "../../reducks/users/selectors";
import LazyLoad from 'react-lazyload'
import { useEffect } from 'react';
import { db } from '../../firebase';

const useStyles = makeStyles((theme) => ({
  root: {
    [theme.breakpoints.down('sm')]: {
      margin: '20px auto',
      width: 'calc(95% - 12px)'
    },
    [theme.breakpoints.up('sm')]: {
      margin: 16,
      width: 'calc(33.3333% - 32px)'
    }
  },
  content: {
    display: 'flex',
    padding: '16 8',
    textAlign: 'left',
    '&:last-child': {
    paddingBottom: 16
    }
  },
  icon: {
    marginRight: 0,
    marginLeft: 'auto'
  },
  media: {
    height: 0,
    paddingTop: '100%'
  },
  area: {
    fontSize: 13
  },
  name: {
    fontSize: 18,
    color: theme.palette.secondary.dark,
    paddingBottom: 2,
  },
  productName: {
    boxOrient: 'vertical',
    display: '-webkit-box',
    fontSize: 14,
    lineHeight: '18px',
    overflow: 'hidden',
    [theme.breakpoints.down('sm')]: {
      height: 36,
      lineClamp: 2,
    },
    [theme.breakpoints.up('md')]: {
      height: 18,
      lineClamp: 1,
    }
  }
}))

const ProductCard = (props) => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const selector = useSelector((state) => state)
  const uid = getUserId(selector)


  const [data, setData] = useState([]);
  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget)
  }
  const handleClose = () => {
    setAnchorEl(null)
  }

  useEffect(() => {
    db.collection("users").doc(uid).collection("products").get().then(function(querySnapshot) {
      const data = querySnapshot.docs.map(function(doc) {
        return doc.data()
      })
      setData(data)
    })
  },[])

  if (data === null) {
    return(
      <></>
    )
  }

  const images = (props.images.length > 0) ? props.images : [NoImage];
  return(
    <Card className={classes.root}>
              <LazyLoad height="656" width="233" once>
              <CardMedia 
                className={classes.media}
                image={images[0].path}
                title=""
                onClick={() => dispatch(push('/product/detail/'+ props.id))}
              />
              </LazyLoad>
              <CardContent className={classes.content}>
                <div onClick={() => dispatch(push('/product/detail/'+ props.id))}>
                <Typography color="textSecondary" component="p" className={classes.name}>
                  {props.name}
                </Typography>
                <Typography component="p" className={classes.area}>
                  {props.area}
                </Typography>
                </div>
          {
            data.map(doc => {
              return (doc.id === props.id) ? (
                <>
                  <IconButton className={classes.icon} onClick={handleClick}>
                    <MoreVertIcon />
                  </IconButton>
                    <Menu
                      anchorEl={anchorEl}
                      keepMounted
                      open={Boolean(anchorEl)}
                      onClose={handleClose}
                    >
                    <MenuItem
                      onClick={() => {
                        dispatch(push('/product/edit/'+ props.id))
                        handleClose()
                      }}
                    >    
                      編集する
                    </MenuItem>
                    <MenuItem
                      onClick={() => {
                        dispatch(deleteProducts(props.id))
                        handleClose()
                    }}
                    >
                      削除する
                    </MenuItem>
                    </Menu>
                </>
              ):(
                <></>
              )
          })
          }
              </CardContent>
            </Card>
  )
}

export default ProductCard;