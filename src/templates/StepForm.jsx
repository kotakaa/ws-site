import React, { useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import StepLabel from '@material-ui/core/StepLabel';
import Button from '@material-ui/core/Button';
import WeddingDetail from '../components/Cost/WeddingDetail';
import BanquetDetail from '../components/Cost/BanquetDetail';
import FixedCost from '../components/Cost/FixedCost';
import CostResult from './CostResult';
import { useDispatch, useSelector } from 'react-redux';
import { costResult } from '../reducks/users/operations';
import { db } from '../firebase';


const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
  },
  backButton: {
    marginRight: theme.spacing(1),
  },
  instructions: {
    marginTop: theme.spacing(1),
    marginBottom: theme.spacing(1),
  },
}));

function getSteps() {
  return ['挙式の詳細', '披露宴の詳細', '固定でかかる費用'];
}



const StepForm = () => {
  const dispatch = useDispatch();
  const classes = useStyles();
  const [cost, setCost] = useState("");
  const [activeStep, setActiveStep] = useState(0);
  const steps = getSteps();
  const selector = useSelector((state) => state)
  const path = selector.router.location.pathname

  const productId = path.split('/')[2]
  const id = path.split('/')[4]

  useEffect(() => {
    db.collection('products').doc(productId).collection('cost').doc(id).get()
      .then(doc => {
        const data = doc.data()
        setCost(data)
      })
  },[])

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleReset = () => {
    setActiveStep(0);
  };

  const [value, setValue] = useState(""),
        [radio, setRadio] = useState(""),
        [dress, setDress] = useState(""),
        [snap, setSnap] = useState(""),
        [movie, setMovie] = useState(""),
        [bouquet, setBouquet] = useState(""),
        [makeAndDressing, setMakeAndDressing] = useState(""),
        
        [dish, setDish] = useState(""),
        [cake, setCake] = useState(""),
        [flowerDecoration, setFlowerDecoration] = useState(""),
        [staging, setStaging] = useState(""),
        [gift, setGift] = useState(""),
        [weddingFee, setWeddingFee] = useState(""),
        [tax, setTax] = useState(""),
        [venueUsageFee, setVenueUsageFee] = useState("");

  
  console.log(value, dress, snap, movie, bouquet, makeAndDressing, dish, cake, flowerDecoration, staging, gift);
  const handleChange = (event) => {
    setRadio(event.target.value);
  };

  useEffect(() => {
    if (radio === "value1") {
      setValue(cost.value1);
    }else if (radio === "value2") {
      setValue(cost.value2);
    }
  },[radio])

  console.log(value);

  function getStepContent(stepIndex) {
    switch (stepIndex) {
      case 0:
        return <WeddingDetail
                  dress = {dress}
                  snap={snap}
                  movie={movie}
                  bouquet={bouquet}
                  makeAndDressing={makeAndDressing}
                  setDress={setDress}
                  setSnap={setSnap}
                  setMovie={setMovie}
                  setBouquet={setBouquet}
                  setMakeAndDressing={setMakeAndDressing}
                />;
      case 1:
        return <BanquetDetail
                  radio={radio}
                  dish={dish}
                  cake={cake}
                  flowerDecoration={flowerDecoration}
                  staging={staging}
                  gift={gift}
                  setDish={setDish}
                  setCake={setCake}
                  setFlowerDecoration={setFlowerDecoration}
                  setStaging={setStaging}
                  setGift={setGift}
                  handleChange={handleChange}
                />;
      case 2:
        return <FixedCost 
                  weddingFee={weddingFee}
                  setWeddingFee={setWeddingFee}
                  tax={tax}
                  setTax={setTax}
                  venueUsageFee={venueUsageFee}
                  setVenueUsageFee={setVenueUsageFee}
                />;
      default:
        return 'Unknown stepIndex';
    }
  }
  return (
    <div className={classes.root}>
      <Stepper activeStep={activeStep} alternativeLabel>
        {steps.map((label) => (
          <Step key={label}>
            <StepLabel>{label}</StepLabel>
          </Step>
        ))}
      </Stepper>
      <div>
        {activeStep === steps.length ? (
          <div className="center">
          </div>
        ) : (
          <div>
            <div className={classes.instructions}>{getStepContent(activeStep)}</div>
            <div className="center">
            {activeStep === steps.length - 1 ? (
              <Button onClick={handleReset}>最初に戻る</Button>
            ) : (
              <Button
                disabled={activeStep === 0}
                onClick={handleBack}
                className={classes.backButton}
              >
                戻る
              </Button>
            )}
              {activeStep === steps.length - 1 ? (
                <Button onClick={() => dispatch(costResult(value, dress, snap, movie, bouquet, makeAndDressing, dish, cake, flowerDecoration, staging, gift))} variant="contained" color="primary">費用をチェックする</Button>
              ) : (
                <Button variant="contained" color="primary" onClick={handleNext}>次に進む</Button>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
export default StepForm;