import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { db } from '../../firebase';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';

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

const FixedCost = () => {
  const dispatch = useDispatch();
  const classes = useStyles();
  const [costResult, setCostResult] = useState([]);
  const selector = useSelector((state) => state)
  const path = selector.router.location.pathname
  const productId = path.split('/')[2]
  const costId = path.split('/')[4]

  useEffect(() => {
    db.collection('products').doc(productId).collection('cost').doc(costId).get()
      .then(doc => {
        const data = doc.data()
        setCostResult(data)
      })
  },[])
  console.log(costResult);
  return (
    <>
    <TableContainer component={Paper}>
      <h2 className="u-text__headline u-text-center main">費用チェック</h2>
      <Table className={classes.table} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell className={classes.title}>固定費用項目</TableCell>
            <TableCell className={classes.title} align="right">価格</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          <TableRow>
            <TableCell component="th" scope="row">挙式料</TableCell>
            <TableCell align="right">{costResult.weddingFee}円</TableCell>
          </TableRow>

          <TableRow>
            <TableCell component="th" scope="row">サービス料</TableCell>
            <TableCell align="right">{costResult.tax} %</TableCell>
          </TableRow>

          <TableRow>
            <TableCell component="th" scope="row">会場使用料</TableCell>
            <TableCell align="right">{costResult.venueUsageFee}円</TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </TableContainer>
    </>
  )
}

export default FixedCost;


