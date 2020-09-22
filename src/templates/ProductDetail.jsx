import React, { useState, useEffect, useCallback } from 'react';
import { db, FirebaseTimestamp } from '../firebase/index';
import { useSelector, useDispatch } from 'react-redux';
import { makeStyles } from '@material-ui/styles';
import { ImageSwiper, FavoriteTable } from '../components/Products';
import { addProductToFavorite } from '../reducks/users/operations';
import HTMLReactParser from 'html-react-parser';
import { getProductsInFavorite } from '../reducks/users/selectors';
import { push } from 'connected-react-router';
import { PrimaryButton } from '../components/UIkit';

const useStyle = makeStyles((theme) => ({
  sliderBox: {
    [theme.breakpoints.down('sm')]: {
      margin: '0 auto 24px auto',
      height: 320,
      width: 320
    },
    [theme.breakpoints.up('sm')]: {
      margin: '0 auto',
      height: 400,
      width: 400
    }
  },
  detail: {
    textAlign: 'left',
    [theme.breakpoints.down('sm')]: {
      margin: '0 auto 16px auto',
      height: 320,
      width: 320
    },
    [theme.breakpoints.up('sm')]: {
      margin: '0 auto',
      height: 'auto',
      width: 400
    }
  }
}))

const returnCodeToBr = (description) => {
  if (description === "") {
    return description
  } else {
    return HTMLReactParser(description.replace(/\r?\n/g, '<br/>'))
  }
}

const ProductDetail = () => {
  const classes = useStyle();
  const selector = useSelector((state) => state)
  const path = selector.router.location.pathname
  const id = path.split('/product/')[1]
  const [product, setProduct] = useState(null);
  const [cost, setCost] = useState(null);
  const dispatch = useDispatch()

  useEffect(() => {
    db.collection('products').doc(id).get()
      .then(doc => {
        const data = doc.data()
        setProduct(data)
        if (data.costId !== "") {
          const costId = data.costId
          setCost(costId)
        }
      })
  },[])

  const addFavorite = useCallback(() => {
    const timestamp = FirebaseTimestamp.now()
    const productInFavorite = getProductsInFavorite(selector)

    productInFavorite.map( p => {
        if (p.productId === product.id) {
          return false
        }else{
          dispatch(addProductToFavorite({
            added_at: timestamp,
            name: product.name,
            description: product.description,
            address: product.address,
            images: product.images,
            url: product.url,
            productId: product.id,
            favorited: true
          }))
        }
    })
    if (productInFavorite.length === 0) {
      dispatch(addProductToFavorite({
        added_at: timestamp,
        name: product.name,
        description: product.description,
        address: product.address,
        images: product.images,
        url: product.url,
        productId: product.id,
        favorited: true
      }))
    }
  },[product])


  return(
    <section className="c-section-detail">
      { product && (
        <div className="p-grid__row">
          <div className={classes.sliderBox}>
            <ImageSwiper images={ product.images }/>
          </div>
          <div className={classes.detail}>
            <h2 className="u-text__headline">{product.name}</h2>
            <p>{returnCodeToBr(product.description)}</p>
            <p>{product.url}</p>
            <p>{product.address}</p>
            <FavoriteTable 
              addFavorite={addFavorite}
              product={product}
              />
            <PrimaryButton
              label={ "費用チェックを登録する" }
              onClick={() => dispatch(push('/product/'+ product.id + '/cost/edit'))}
              />
              <PrimaryButton
              label={ "費用チェックをする" }
              onClick={() => dispatch(push('/product/'+ product.id + '/cost/' + cost + '/step' ))}
              />
          </div>
        </div>
      )}
    </section>
  )
}

export default ProductDetail;