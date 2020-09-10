import React, { useCallback } from 'react';
import Divider from '@material-ui/core/Divider';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import DeleteIcon from '@material-ui/icons/Delete';
import IconButton from '@material-ui/core/IconButton';
import { getUserId } from '../../reducks/users/selectors';
import { makeStyles } from '@material-ui/styles';
import { useSelector, useDispatch } from 'react-redux';
import { db } from '../../firebase/index';
import { PrimaryButton } from '../UIkit';
import { push } from 'connected-react-router';

const useStyles = makeStyles({
  list: {
    height:128
  },
  image: {
    objectFit: 'cover',
    margin: 16,
    height: 96,
    width: 96
  },
  text: {
    width: '100%'
  }
})

const FavoriteListItem = (props) => {
  const selector = useSelector((state) => state)
  const uid = getUserId(selector)
  const dispatch = useDispatch();

  const classes = useStyles()
  const image = props.product.images[0].path
  const description = props.product.description
  const name = props.product.name
  const address = props.product.address
  const id = props.product.productId

  const removeProductFromFavorite = (favoriteId) => {
    return  db.collection('users').doc(uid)
              .collection('favorite').doc(favoriteId)
              .delete()
  }

  const goToProductDetail = useCallback((id) => {
    dispatch(push('/product/' + id))
  },[])

  return(
    <>
      <ListItem className={classes.list}>
        <ListItemAvatar>
          <img className={classes.image} src={image} alt="商品画像" />
        </ListItemAvatar>
        <div className={classes.text}>
          <ListItemText 
            primary={name} 
            secondary={description}
          />
          <ListItemText 
            primary={address} 
          />
        </div>
        <PrimaryButton 
          label={"詳細"} 
          onClick={() => goToProductDetail(id)}
        />
        <IconButton onClick={() => removeProductFromFavorite(props.product.favoriteId)}>
          <DeleteIcon />
        </IconButton>
        <Divider />
      </ListItem>
    </>
  )
}

export default FavoriteListItem;