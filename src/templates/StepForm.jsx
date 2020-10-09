import React, { useCallback, useEffect, useState } from 'react';
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
  const [product, setProduct] = useState("");
  const [activeStep, setActiveStep] = useState(0);
  const [image, setImage] = useState("");
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
    db.collection('products').doc(productId).get()
      .then(doc => {
        const data = doc.data()
        setProduct(data)
        setImage(data.images[0].path)
      })
  },[])



  const weddingFee = cost.weddingFee
  const tax = cost.tax
  const venueUsageFee = cost.venueUsageFee


  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleReset = () => {
    setActiveStep(0);
  };

  const [dress, setDress] = useState(""),
        [isDress, setIsDress] = useState(false),
        [snap, setSnap] = useState(""),
        [isSnap, setIsSnap] = useState(false),
        [movie, setMovie] = useState(""),
        [isMovie, setIsMovie] = useState(false),
        [bouquet, setBouquet] = useState(""),
        [isBouquet, setIsBouquet] = useState(false),
        [makeAndDressing, setMakeAndDressing] = useState(""),
        [isMakeAndDressing, setIsMakeAndDressing] = useState(false),

        [value, setValue] = useState(""),
        [isValue, setIsValue] = useState(false),
        [radio, setRadio] = useState(""),
        [number, setNumber] = useState(""),
        [isNumber, setIsNumber] = useState(false),
        [dish, setDish] = useState(""),
        [isDish, setIsDish] = useState(false),
        [cake, setCake] = useState(""),
        [isCake, setIsCake] = useState(false),
        [flowerDecoration, setFlowerDecoration] = useState(""),
        [isFlowerDecoration, setIsFlowerDecoration] = useState(false),
        [staging, setStaging] = useState(""),
        [isStaging, setIsStaging] = useState(false),
        [gift, setGift] = useState(""),
        [isGift, setIsGift] = useState(false);

  console.log(value, number ,dress, snap, movie, bouquet, makeAndDressing, dish, cake, flowerDecoration, staging, gift, weddingFee, tax, venueUsageFee);
  const handleChange = (event) => {
    setRadio(event.target.value);
  };

  const inputNumber = useCallback((event) => {
    setNumber(event.target.value)
  }, [setNumber])

  useEffect(() => {
    if (radio === "value1") {
      setValue(cost.value1);
    }else if (radio === "value2") {
      setValue(cost.value2);
    }
  },[radio])

  const errorMessageWedding = (dress, snap, movie, bouquet, makeAndDressing) => {
    if (dress === "" ) {
      setIsDress(true)
    }else{
      setIsDress(false)
    }
    if (snap === "") {
      setIsSnap(true)
    }else{
      setIsSnap(false)
    }
    if (movie === "" ) {
      setIsMovie(true)
    }else{
      setIsMovie(false)
    }
    if (bouquet === "") {
      setIsBouquet(true)
    }else{
      setIsBouquet(false)
    }
    if (makeAndDressing === "" ) {
      setIsMakeAndDressing(true)
    }else{
      setIsMakeAndDressing(false)
    }

    if (dress !== "" && snap !== "" && movie !== "" && bouquet !== "" && makeAndDressing !== "" ) {
      handleNext()
    }else{
      return false,
      window.scrollTo(0, 0)
    }
  }


  const errorMessageBanquet = (number, dish, cake, flowerDecoration, staging, gift, value) => {
    if (number === "" ) {
      setIsNumber(true)
    }else{
      setIsNumber(false)
    }
    if (dish === "" ) {
      setIsDish(true)
    }else{
      setIsDish(false)
    }
    if (cake === "") {
      setIsCake(true)
    }else{
      setIsCake(false)
    }
    if (flowerDecoration === "" ) {
      setIsFlowerDecoration(true)
    }else{
      setIsFlowerDecoration(false)
    }
    if (staging === "") {
      setIsStaging(true)
    }else{
      setIsStaging(false)
    }
    if (gift === "" ) {
      setIsGift(true)
    }else{
      setIsGift(false)
    }
    if (value === "" ) {
      setIsValue(true)
    }else{
      setIsValue(false)
    }

    if (number !== "" && dish !== "" && cake !== "" && flowerDecoration !== "" && staging !== "" && gift !== "" && value !== "" ) {
      handleNext()
    }else{
      return false,
      window.scrollTo(0, 0)
    }
  }


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
                  isDress={isDress}
                  isSnap={isSnap}
                  isMovie={isMovie}
                  isBouquet={isBouquet}
                  isMakeAndDressing={isMakeAndDressing}
                />;
      case 1:
        return <BanquetDetail
                  number={number}
                  radio={radio}
                  dish={dish}
                  cake={cake}
                  flowerDecoration={flowerDecoration}
                  staging={staging}
                  gift={gift}
                  inputNumber={inputNumber}
                  setDish={setDish}
                  setCake={setCake}
                  setFlowerDecoration={setFlowerDecoration}
                  setStaging={setStaging}
                  setGift={setGift}
                  handleChange={handleChange}
                  isValue={isValue}
                  isNumber={isNumber}
                  isDish={isDish}
                  isCake={isCake}
                  isFlowerDecoration={isFlowerDecoration}
                  isStaging={isStaging}
                  isGift={isGift}
                />;
      case 2:
        return <FixedCost />;
      default:
        return 'Unknown stepIndex';
    }
  }

  function getStepButton(activeStep) {
    switch (activeStep) {
      case 0:
        return(
          <Button 
            variant="contained" 
            color="primary"  
            onClick={() => errorMessageWedding(dress, snap, movie, bouquet, makeAndDressing)} >
            次に進む
          </Button>
        )
      case 1:
        return(
          <Button 
            variant="contained" 
            color="primary" 
            onClick={() => errorMessageBanquet(number, dish, cake, flowerDecoration, staging, gift, value)}>
            次に進む
          </Button>
        )
      case 2: 
        return(
            <Button 
              onClick={() => dispatch(costResult(product.name, image, value, dress, snap, movie, bouquet, makeAndDressing, dish, number, cake, flowerDecoration, staging, gift, weddingFee, tax, venueUsageFee))} 
              variant="contained" 
              color="primary">
              費用をチェックする
            </Button>
        )
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

            <span>{getStepButton(activeStep)}</span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
export default StepForm;

