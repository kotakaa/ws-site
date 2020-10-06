import React from 'react';
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
import { getProductsInFavorite } from '../../reducks/users/selectors';

const useStyles = makeStyles({
  iconCell: {
    padding: 0,
    height: 48,
    width: 48
  }
})

const FavoriteTable = (props) => {
  const classes = useStyles();
  const selector = useSelector((state) => state)
  const productInFavorite = getProductsInFavorite(selector)
  
  return(
    <TableContainer>
      <Table>
        <TableBody>
              <TableRow>
                <TableCell className={classes.iconCell}>
                  <IconButton onClick={() => props.addFavorite()}>
                    <FavoriteBorderIcon />
                  </IconButton>
                </TableCell>
              </TableRow>
        </TableBody>
      </Table>
    </TableContainer>
  )
}

export default FavoriteTable;
