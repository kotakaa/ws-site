import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import StepLabel from '@material-ui/core/StepLabel';
import Button from '@material-ui/core/Button';
import WeddingDetail from '../components/Cost/WeddingDetail';
import BanquetDetail from '../components/Cost/BanquetDetail';
import FixedCost from '../components/Cost/FixedCost';
import CostResult from './CostResult';
import { useDispatch } from 'react-redux';
import { costResult } from '../reducks/users/operations';


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
  const [activeStep, setActiveStep] = useState(0);
  const steps = getSteps();

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleReset = () => {
    setActiveStep(0);
  };

  const [value, setValue] = useState("cost.value1"),
        [dress, setDress] = useState(""),
        [snap, setSnap] = useState(""),
        [movie, setMovie] = useState(""),
        [bouquet, setBouquet] = useState(""),
        [makeAndDressing, setMakeAndDressing] = useState(""),
        
        [dish, setDish] = useState(""),
        [cake, setCake] = useState(""),
        [flowerDecoration, setFlowerDecoration] = useState(""),
        [staging, setStaging] = useState(""),
        [gift, setGift] = useState("");

  
        console.log(value, dress, snap, movie, bouquet, makeAndDressing, dish, cake, flowerDecoration, staging, gift);
  const handleChange = (event) => {
    setValue(event.target.value);
  };

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
                  value={value}
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
        return <FixedCost />;
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
            <CostResult />
            <Button onClick={handleReset}>最初に戻る</Button>
            <Button onClick={() => dispatch(costResult(value, dress, snap, movie, bouquet, makeAndDressing, dish, cake, flowerDecoration, staging, gift))} variant="contained" color="primary">保存する</Button>
          </div>
        ) : (
          <div>
            <div className={classes.instructions}>{getStepContent(activeStep)}</div>
            <div className="center">
              <Button
                disabled={activeStep === 0}
                onClick={handleBack}
                className={classes.backButton}
              >
                戻る
              </Button>
              <Button variant="contained" color="primary" onClick={handleNext}>
                {activeStep === steps.length - 1 ? '費用をチェックする' : '次に進む'}
              </Button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
export default StepForm;