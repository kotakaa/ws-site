import React, { useState } from 'react'
import { withStyles } from '@material-ui/core/styles';
import Dialog from '@material-ui/core/Dialog';
import MuiDialogTitle from '@material-ui/core/DialogTitle';
import MuiDialogContent from '@material-ui/core/DialogContent';
import Typography from '@material-ui/core/Typography';
import { useDispatch } from 'react-redux';
import { push } from 'connected-react-router';
import { WhiteButton } from '../components/UIkit';
import SearchIcon from '@material-ui/icons/Search';
import LibraryBooksIcon from '@material-ui/icons/LibraryBooks';

const styles = (theme) => ({
  root: {
    margin: 0,
    padding: theme.spacing(2),
  },
  closeButton: {
    position: 'absolute',
    right: theme.spacing(1),
    top: theme.spacing(1),
    color: theme.palette.grey[500],
  },
});


const DialogContent = withStyles((theme) => ({
  root: {
    padding: 30,
  },
}))(MuiDialogContent);

const DialogTitle = withStyles(styles)((props) => {
  const { children, classes, onClose, ...other } = props;
  return (
    <MuiDialogTitle disableTypography className={classes.root} {...other}>
      <Typography variant="h6">{children}</Typography>
    </MuiDialogTitle>
  );
});

const TopPage = () => {
  const dispatch = useDispatch();
  const [open, setOpen] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  return(
    <div className="back-ground-top">
      <div className="c-section-toppage">
        <div className="center"> 
            様々な式場の中から気に入った式場、<br/>
            お２人のこだわりに合う結婚式をお選びいただき<br/>
            予想費用をチェックしていただけます
        </div>
        <div className="module-spacer--small"/>
        <div className="center"> 
          <WhiteButton 
            onClick={handleClickOpen}
            label={"地方から式場を探す"}
            startIcon={<SearchIcon />}
          />
          <div className="c-margin-left"> 
            <WhiteButton 
              onClick={() => dispatch(push("/product"))}
              label={"式場の一覧"}
              startIcon={<LibraryBooksIcon />}
            />
          </div>
        </div>
      </div>
      <Dialog onClose={handleClose} aria-labelledby="customized-dialog-title" open={open}>
        <DialogTitle id="customized-dialog-title">
          地方から探す
        </DialogTitle>
        <DialogContent dividers>
          <Typography gutterBottom>
            <WhiteButton label={"北海道地方"} onClick={() => dispatch(push('/product?region=北海道地方'))}/>
          </Typography>
          <Typography gutterBottom>
            <WhiteButton label={"東北地方"} onClick={() => dispatch(push('/product?region=東北地方'))}/>
          </Typography>
          <Typography gutterBottom>
            <WhiteButton label={"中部地方"} onClick={() => dispatch(push('/product?region=中部地方'))}/>
          </Typography>
          <Typography gutterBottom>
            <WhiteButton label={"関東地方"} onClick={() => dispatch(push('/product?region=関東地方'))}/>
          </Typography>
          <Typography gutterBottom>
            <WhiteButton label={"近畿地方"} onClick={() => dispatch(push('/product?region=近畿地方'))}/>
          </Typography>
          <Typography gutterBottom>
            <WhiteButton label={"中国地方"} onClick={() => dispatch(push('/product?region=中国地方'))}/>
          </Typography>
          <Typography gutterBottom>
            <WhiteButton label={"九州地方"} onClick={() => dispatch(push('/product?region=九州地方'))}/>
          </Typography>
        </DialogContent>
      </Dialog>
    </div>
  )
}


export default TopPage;