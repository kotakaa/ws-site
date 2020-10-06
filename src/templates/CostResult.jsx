import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { db } from '../firebase/index';
import { getUserId } from '../reducks/users/selectors';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import { push } from 'connected-react-router';
import { Button } from '@material-ui/core';

const useStyles = makeStyles({
  table: {
    width: 500,
    margin: "40px auto 0"
  },
  title: {
    fontWeight: "bold",
    fontSize: "18px"
  }
});


const CostResult = () => {
  const dispatch = useDispatch()
  const classes = useStyles();
  const [costResult, setCostResult] = useState([]);
  const selector = useSelector((state) => state)
  const uid = getUserId(selector)
  const path = selector.router.location.pathname
  const costsId = path.split('/')[2]

  useEffect(() => {
    db.collection('users').doc(uid).collection('costs').doc(costsId).get()
      .then(doc => {
        const data = doc.data()
        setCostResult(data)
      })
  },[])

  // コンマを追加する
  function comma(num) {
    return String(num).replace( /(\d)(?=(\d\d\d)+(?!\d))/g, '$1,');
}

  return (
    <>
    <TableContainer component={Paper}>
      <h2 className="u-text__headline u-text-center main">費用チェックの結果</h2>
      <div className="center">ゲストを { costResult.number }人 招待した場合</div>
      <div className="center">結婚式にかかる費用は平均で&nbsp;{comma(costResult.result)}円&nbsp;です</div>
      <Table className={classes.table} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell className={classes.title}>項目</TableCell>
            <TableCell className={classes.title} align="right">価格&nbsp;(円)</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          <TableRow>
            <TableCell component="th" scope="row">ドレス・タキシード</TableCell>
            <TableCell align="right">{comma(costResult.dress)}</TableCell>
          </TableRow>

          <TableRow>
            <TableCell component="th" scope="row">スナップ</TableCell>
            <TableCell align="right">{comma(costResult.snap)}</TableCell>
          </TableRow>

          <TableRow>
            <TableCell component="th" scope="row">映像</TableCell>
            <TableCell align="right">{comma(costResult.movie)}</TableCell>
          </TableRow>

          <TableRow>
            <TableCell component="th" scope="row">ブーケ</TableCell>
            <TableCell align="right">{comma(costResult.bouquet)}</TableCell>
          </TableRow>

          <TableRow>
            <TableCell component="th" scope="row">ヘアメイク・着付</TableCell>
            <TableCell align="right">{comma(costResult.makeAndDressing)}</TableCell>
          </TableRow>

          <TableRow>
            <TableCell component="th" scope="row">お料理</TableCell>
            <TableCell align="right">{comma(costResult.dish)}</TableCell>
          </TableRow>

          <TableRow>
            <TableCell component="th" scope="row">ウエディングケーキ</TableCell>
            <TableCell align="right">{comma(costResult.cake)}</TableCell>
          </TableRow>

          <TableRow>
            <TableCell component="th" scope="row">装花</TableCell>
            <TableCell align="right">{comma(costResult.flowerDecoration)}</TableCell>
          </TableRow>

          <TableRow>
            <TableCell component="th" scope="row">演出(音響含む)</TableCell>
            <TableCell align="right">{comma(costResult.staging)}</TableCell>
          </TableRow>

          <TableRow>
            <TableCell component="th" scope="row">引出物</TableCell>
            <TableCell align="right">{comma(costResult.gift)}</TableCell>
          </TableRow>

          <TableRow>
            <TableCell component="th" scope="row">司会者</TableCell>
            <TableCell align="right">{comma(costResult.value)}</TableCell>
          </TableRow>

          <TableRow>
            <TableCell component="th" scope="row">挙式料</TableCell>
            <TableCell align="right">{comma(costResult.weddingFee)}</TableCell>
          </TableRow>

          <TableRow>
            <TableCell component="th" scope="row">会場使用料</TableCell>
            <TableCell align="right">{comma(costResult.venueUsageFee)}</TableCell>
          </TableRow>

          <TableRow>
            <TableCell component="th" scope="row">サービス料</TableCell>
            <TableCell align="right">{costResult.tax}%</TableCell>
          </TableRow>

        </TableBody>
      </Table>
    </TableContainer>

    <div className="center">
      <Button onClick={() => dispatch(push("/product"))}>式場一覧に戻る</Button>
      <Button onClick={() => dispatch(push("/product"))} variant="contained" color="primary">保存する</Button>
    </div>
    </>
  )
}

export default CostResult;
