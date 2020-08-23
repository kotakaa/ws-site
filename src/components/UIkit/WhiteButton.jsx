import React from 'react';
import Button from '@material-ui/core/Button'
import { makeStyles } from '@material-ui/styles'

const useStyles = makeStyles({
  "button": {
    color: "#444",
    fontSize: 12,
    height: 38,
    width: 170,
  }
})

const WhiteButton = (props) => {
  const classes = useStyles();
  return(
    <Button 
      className={ classes.button }
      variant="outlined"
      color="default" 
      onClick={() => props.onClick()}
      startIcon={props.startIcon}
      >
      { props.label}
    </Button>
  )
}

export default WhiteButton;