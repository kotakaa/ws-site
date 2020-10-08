import React, { useState, useEffect, useCallback } from 'react';
import { db, FirebaseTimestamp } from '../firebase/index';
import { useSelector, useDispatch } from 'react-redux';
import { makeStyles } from '@material-ui/styles';
import { ImageSwiper, FavoriteTable } from '../components/Products';
import { addProductToFavorite } from '../reducks/users/operations';
import HTMLReactParser from 'html-react-parser';
import { getProductsInFavorite, getRole, getUserId } from '../reducks/users/selectors';
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
  const uid = getUserId(selector)
  const role = getRole(selector)
  const path = selector.router.location.pathname
  const id = path.split('/product/detail/')[1]
  const [product, setProduct] = useState(null);
  const [data, setData] = useState([]);
  const [cost, setCost] = useState("");
  const dispatch = useDispatch()

  useEffect(() => {
    db.collection('products').doc(id).get()
      .then(doc => {
        const data = doc.data()
        setProduct(data)
        if (typeof data !== 'undefined') {
          if (data.costId !== "") {
            const costId = data.costId
            setCost(costId)
          }
        }
      })

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

  return(
    <section className="c-section-detail">
      { product ? (
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
              product={product}
            />
              {
                (role === "admin") ? (
                  data.map(doc => {
                    return (doc.id === id) && (
                      (cost === null || typeof cost === 'undefined') ? (
                        <PrimaryButton
                          label={ "費用チェックを登録する" }
                          onClick={() => dispatch(push('/product/'+ product.id + '/cost/edit'))}
                        />
                      ):(
                        <PrimaryButton
                          label={ "費用チェックを編集する" }
                          onClick={() => dispatch(push('/product/'+ product.id + '/cost/edit/' + cost ))}
                        />
                        
                      )
                    )})
                ):(
                  <PrimaryButton
                    label={ "費用チェックをする" }
                    onClick={() => dispatch(push('/product/'+ product.id + '/cost/' + cost + '/step' ))}
                  />
                )
              }
          </div>
        </div>
      ):(
        <h1>データが見つかりませんでした。削除された可能性があります。</h1>
      )}
    </section>
  )
}

export default ProductDetail;