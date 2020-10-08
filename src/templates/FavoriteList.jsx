import React, { useCallback } from 'react';
import List from '@material-ui/core/List';
import { useDispatch, useSelector } from 'react-redux';
import { FavoriteListItem } from '../components/Products';
import { GrayButton } from '../components/UIkit';
import { push } from 'connected-react-router';
import { makeStyles } from '@material-ui/core';
import { useEffect } from 'react';
import { db } from '../firebase';
import { getUserId } from '../reducks/users/selectors';
import { useState } from 'react';

const useStyles = makeStyles({
  root: {
    margin: '0 auto',
    maxWidth: 512,
    width: '100%'
  }
})

const FavoriteList = () => {
  const classes = useStyles()
  const dispatch = useDispatch()
  const selector = useSelector((state) => state);
  const uid = getUserId(selector)

  const [favorite, setFavorite] = useState(null);

  const backToHome = useCallback(() => {
    dispatch(push('/product'))
  },[])

  useEffect(() => {
    db.collection("users").doc(uid).collection("favorite").get().then(function(querySnapshot) {
      const data = querySnapshot.docs.map(function(doc) {
        return doc.data()
      })
      setFavorite(data)
    })
  },[])


  return(
    <section className="c-section-wrapin">
      <div className="main">
        <h2 className="u-text__headline">
          お気に入りリスト
        </h2>
        {
          favorite.length === 0 ? (
              <h1>お気に入りした式場はありません</h1>
          ):(
            <List className={classes.root}>
              {
                (favorite === null) ? (
                  <></>
                ):(
                  favorite.length > 0 && (
                    favorite.map(product => <FavoriteListItem key={ product.favoriteId } product={ product }/>)
                  )
                )
              }
            </List>
          )
        }
        <div className="module-spacer--medium" />
        <div className="p-grid__column">
          <GrayButton
            label={"他の式場も見てみる"}
            onClick={ backToHome }
          />
        </div>
      </div>
    </section>
  )
}

export default FavoriteList;