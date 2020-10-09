import React, { useCallback, useState } from 'react';
import List from '@material-ui/core/List';
import { useDispatch, useSelector } from 'react-redux';
import { CostResultListItem } from '../components/Products';
import { GrayButton } from '../components/UIkit';
import { push } from 'connected-react-router';
import { makeStyles } from '@material-ui/core';
import { useEffect } from 'react';
import { db } from '../firebase';
import { getUserId } from '../reducks/users/selectors';


const useStyles = makeStyles({
  root: {
    margin: '0 auto',
    maxWidth: 512,
    width: '100%'
  }
})

const CostResultList = () => {
  const classes = useStyles()
  const dispatch = useDispatch()
  const selector = useSelector((state) => state);
  const uid = getUserId(selector)
  const [costData, setCostData] = useState(null);

  const backToHome = useCallback(() => {
    dispatch(push('/product'))
  },[])

  useEffect(() => {
    db.collection("users").doc(uid).collection("costs").get().then(function(querySnapshot) {
      const data = querySnapshot.docs.map(function(doc) {
        return doc.data()
      })
      setCostData(data)
    })
  },[])

  if (costData === null) {
    return <></>
  }
console.log(costData);
  return (
    <section className="c-section-wrapin">
      <div className="main">
        <h2 className="u-text__headline">
          費用チェックリスト
        </h2>
        {
          costData.length === 0 ? (
              <h1>費用チェックした式場はありません</h1>
          ):(
            <List className={classes.root}>
              {costData.map(cost => <CostResultListItem key={ cost.costsId } cost={ cost }/>)}
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

export default CostResultList;
