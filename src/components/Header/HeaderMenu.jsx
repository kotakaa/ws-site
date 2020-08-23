import React, { useEffect } from 'react';
import IconButton from "@material-ui/core/IconButton";
import PersonIcon from '@material-ui/icons/Person';

import FavoriteBorderIcon from '@material-ui/icons/FavoriteBorder';
import MenuIcon from '@material-ui/icons/Menu';
import { getUserId, getProductsInFavorite } from '../../reducks/users/selectors';
import { useSelector, useDispatch } from 'react-redux';
import { db } from '../../firebase/index';
import { fetchProductsInFavorite } from '../../reducks/users/operations';
import { push } from 'connected-react-router';

const HeaderMenu = (props) => {
  const dispatch = useDispatch()
  const selector = useSelector((state) => state)
  const uid = getUserId(selector)
  let productsInFavorite = getProductsInFavorite(selector)

  useEffect(()=>{
    const unsubscribe = db.collection('users').doc(uid).collection('favorite')
      .onSnapshot( snapshots => {
        snapshots.docChanges().forEach( change => {
          const product = change.doc.data()
          const changeType = change.type

          switch (changeType) {
            case 'added':
              productsInFavorite.push(product)
              break;
            case 'modified':
              const index = productsInFavorite.findIndex(product => product.favoriteId === change.doc.id)
              productsInFavorite[index] = product
              break;
            case 'removed':
              productsInFavorite = productsInFavorite.filter(product => product.favoriteId !== change.doc.id)
              break;
            default: 
              break;
          }
        })
        dispatch(fetchProductsInFavorite(productsInFavorite))
      })
      return () => unsubscribe()
  },[])

  return(
    <>
      <IconButton onClick={() => dispatch(push('/favorite'))}>
        <FavoriteBorderIcon/>
      </IconButton>

      <IconButton onClick={() => dispatch(push('/user/mypage')) }>
        <PersonIcon />
      </IconButton>

      <IconButton onClick={(event)=> props.handleDrawerToggle(event)}>
        <MenuIcon/>
      </IconButton>

    </>
  )
}

export default HeaderMenu