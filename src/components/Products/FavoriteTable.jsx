import React, { useState } from 'react';
import IconButton from "@material-ui/core/IconButton";
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableRow from '@material-ui/core/TableRow';
import FavoriteIcon from '@material-ui/icons/Favorite';
import FavoriteBorderIcon from '@material-ui/icons/FavoriteBorder';
import {makeStyles} from "@material-ui/styles";
import { useSelector } from 'react-redux';
import { getUserId } from '../../reducks/users/selectors';
import { useEffect } from 'react';
import { db, FirebaseTimestamp } from '../../firebase';
import { useCallback } from 'react';

const useStyles = makeStyles({
  iconCell: {
    padding: 0,
    height: 48,
    width: 48
  }
})

const FavoriteTable = (props) => {
  const classes = useStyles();
  const selector = useSelector((state) => state);
  const uid = getUserId(selector)
  const path = selector.router.location.pathname
  const id = path.split('/product/detail/')[1]

  const [liked, setLike] = useState(false);

  const toggleLike = useCallback(() => {
    setLike(!liked)

    const timestamp = FirebaseTimestamp.now()
    db.collection('products').doc(id).get()
      .then(doc => {
        const data = doc.data()

        const addFavorite = {
          create_at: timestamp,
          name: data.name,
          description: data.description,
          address: data.address,
          images: data.images,
          url: data.url,
          productId: id,
        }

        const favoriteRef = db.collection('users').doc(uid).collection('favorite').doc()
        addFavorite['favoriteId'] = favoriteRef.id

        if (liked === false) {
          favoriteRef.set(addFavorite, {merge: true})
          console.log("a");
          setLike(true)
        }else if(liked === true) {
          return(
            db.collection("users").doc(uid).collection("favorite").get().then(function(querySnapshot) {
              const data = querySnapshot.docs.map(function(doc) {
                return doc.data()
              })
              data.forEach((doc) => {
                if (doc.productId === id) {
                  removeProductFromFavorite(doc.favoriteId)
                  setLike(false)
                }
              })
            })
          )
        }

      })
  });

  const removeProductFromFavorite = async(favoriteId) => {
    return await db.collection('users').doc(uid)
              .collection('favorite').doc(favoriteId)
              .delete()
  }

  useEffect(() => {
    db.collection("users").doc(uid).collection("favorite").get().then(function(querySnapshot) {
      const data = querySnapshot.docs.map(function(doc) {
        return doc.data()
      })
      data.forEach((doc) => {
        if (doc.productId === id) {
          setLike(true)
        }
      })
    })
  },[])

  
  return(
    <TableContainer>
      <Table>
        <TableBody>
              <TableRow>
                <TableCell className={classes.iconCell}>
                  <IconButton onClick={() => toggleLike()}>
                    {liked ? <FavoriteIcon /> : <FavoriteBorderIcon />}
                  </IconButton>
                </TableCell>
              </TableRow>
        </TableBody>
      </Table>
    </TableContainer>
  )
}

export default FavoriteTable;
