import React, { useState, useCallback, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import StepLabel from '@material-ui/core/StepLabel';
import Button from '@material-ui/core/Button';
import { useDispatch, useSelector } from 'react-redux';
import { saveCost } from '../reducks/products/operations';
import { db } from '../firebase/index';
import AdminBanquetDetail from '../components/AdminCost/AdminBanquetDetail';
import AdminWeddingDetail from '../components/AdminCost/AdminWeddingDetail';
import AdminFixedCost from '../components/AdminCost/AdminFixedCost';



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

const CostEdit = () => {
  const dispatch = useDispatch();
  const classes = useStyles();
  const selector = useSelector((state) => state)
  const [activeStep, setActiveStep] = useState(0);
  const steps = getSteps();
  const path = selector.router.location.pathname
  const productId = path.split('/')[2]

  let id = window.location.pathname.split('/')[5]

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleReset = () => {
    setActiveStep(0);
  };

  const [dress1, setDress1] = useState(""),
        [dress2, setDress2] = useState(""),
        [dress3, setDress3] = useState(""),
        [dress4, setDress4] = useState(""),
        [isDress, setIsDress] = useState(false),
        [snap1, setSnap1] = useState(""),
        [snap2, setSnap2] = useState(""),
        [snap3, setSnap3] = useState(""),
        [isSnap, setIsSnap] = useState(false),
        [movie1, setMovie1] = useState(""),
        [movie2, setMovie2] = useState(""),
        [movie3, setMovie3] = useState(""),
        [isMovie, setIsMovie] = useState(false),
        [bouquet1, setBouquet1] = useState(""),
        [bouquet2, setBouquet2] = useState(""),
        [bouquet3, setBouquet3] = useState(""),
        [bouquet4, setBouquet4] = useState(""),
        [isBouquet, setIsBouquet] = useState(false),
        [makeAndDressing1, setMakeAndDressing1] = useState(""),
        [makeAndDressing2, setMakeAndDressing2] = useState(""),
        [makeAndDressing3, setMakeAndDressing3] = useState(""),
        [makeAndDressing4, setMakeAndDressing4] = useState(""),
        [isMakeAndDressing, setIsMakeAndDressing] = useState(false),
        
        [dish1, setDish1] = useState(""),
        [dish2, setDish2] = useState(""),
        [dish3, setDish3] = useState(""),
        [dish4, setDish4] = useState(""),
        [isDish, setIsDish] = useState(false),
        [cake1, setCake1] = useState(""),
        [cake2, setCake2] = useState(""),
        [cake3, setCake3] = useState(""),
        [cake4, setCake4] = useState(""),
        [isCake, setIsCake] = useState(false),
        [flowerDecoration1, setFlowerDecoration1] = useState(""),
        [flowerDecoration2, setFlowerDecoration2] = useState(""),
        [flowerDecoration3, setFlowerDecoration3] = useState(""),
        [flowerDecoration4, setFlowerDecoration4] = useState(""),
        [isFlowerDecoration, setIsFlowerDecoration] = useState(false),
        [staging1, setStaging1] = useState(""),
        [staging2, setStaging2] = useState(""),
        [staging3, setStaging3] = useState(""),
        [isStaging, setIsStaging] = useState(false),
        [gift1, setGift1] = useState(""),
        [gift2, setGift2] = useState(""),
        [gift3, setGift3] = useState(""),
        [isGift, setIsGift] = useState(false),
        [value1, setValue1] = useState(""),
        [value2, setValue2] = useState(""),
        [isValue, setIsValue] = useState(false),

        [weddingFee, setWeddingFee] = useState(""),
        [isWeddingFee, setIsWeddingFee] = useState(false),
        [tax, setTax] = useState(""),
        [isTax, setIsTax] = useState(false),
        [venueUsageFee, setVenueUsageFee] = useState(""),
        [isVenueUsageFee, setIsVenueUsageFee] = useState(false);

  // 固定費
  const inputWeddingFee = useCallback((event) => {
    setWeddingFee(event.target.value)
  }, [setWeddingFee])
  const inputTax = useCallback((event) => {
    setTax(event.target.value)
  }, [setTax])
  const inputVenueUsageFee = useCallback((event) => {
    setVenueUsageFee(event.target.value)
  }, [setVenueUsageFee])

  const inputDress1 = useCallback((event) => {
    setDress1(event.target.value)
  }, [setDress1])
  const inputDress2 = useCallback((event) => {
    setDress2(event.target.value)
  }, [setDress2])
  const inputDress3 = useCallback((event) => {
    setDress3(event.target.value)
  }, [setDress3])
  const inputDress4 = useCallback((event) => {
    setDress4(event.target.value)
  }, [setDress4])

  const inputSnap1 = useCallback((event) => {
    setSnap1(event.target.value)
  }, [setSnap1])
  const inputSnap2 = useCallback((event) => {
    setSnap2(event.target.value)
  }, [setSnap2])
  const inputSnap3 = useCallback((event) => {
    setSnap3(event.target.value)
  }, [setSnap3])

  const inputMovie1 = useCallback((event) => {
    setMovie1(event.target.value)
  }, [setMovie1])
  const inputMovie2 = useCallback((event) => {
    setMovie2(event.target.value)
  }, [setMovie2])
  const inputMovie3 = useCallback((event) => {
    setMovie3(event.target.value)
  }, [setMovie3])

  const inputBouquet1 = useCallback((event) => {
    setBouquet1(event.target.value)
  }, [setBouquet1])
  const inputBouquet2 = useCallback((event) => {
    setBouquet2(event.target.value)
  }, [setBouquet2])
  const inputBouquet3 = useCallback((event) => {
    setBouquet3(event.target.value)
  }, [setBouquet3])
  const inputBouquet4 = useCallback((event) => {
    setBouquet4(event.target.value)
  }, [setBouquet4])

  const inputMakeAndDressing1 = useCallback((event) => {
    setMakeAndDressing1(event.target.value)
  }, [setMakeAndDressing1])
  const inputMakeAndDressing2 = useCallback((event) => {
    setMakeAndDressing2(event.target.value)
  }, [setMakeAndDressing2])
  const inputMakeAndDressing3 = useCallback((event) => {
    setMakeAndDressing3(event.target.value)
  }, [setMakeAndDressing3])
  const inputMakeAndDressing4 = useCallback((event) => {
    setMakeAndDressing4(event.target.value)
  }, [setMakeAndDressing4])


  const inputDish1 = useCallback((event) => {
    setDish1(event.target.value)
  }, [setDish1])
  const inputDish2 = useCallback((event) => {
    setDish2(event.target.value)
  }, [setDish2])
  const inputDish3 = useCallback((event) => {
    setDish3(event.target.value)
  }, [setDish3])
  const inputDish4 = useCallback((event) => {
    setDish4(event.target.value)
  }, [setDish4])

  const inputCake1 = useCallback((event) => {
    setCake1(event.target.value)
  }, [setCake1])
  const inputCake2 = useCallback((event) => {
    setCake2(event.target.value)
  }, [setCake2])
  const inputCake3 = useCallback((event) => {
    setCake3(event.target.value)
  }, [setCake3])
  const inputCake4 = useCallback((event) => {
    setCake4(event.target.value)
  }, [setCake4])

  const inputFlowerDecoration1 = useCallback((event) => {
    setFlowerDecoration1(event.target.value)
  }, [setFlowerDecoration1])
  const inputFlowerDecoration2 = useCallback((event) => {
    setFlowerDecoration2(event.target.value)
  }, [setFlowerDecoration2])
  const inputFlowerDecoration3 = useCallback((event) => {
    setFlowerDecoration3(event.target.value)
  }, [setFlowerDecoration3])
  const inputFlowerDecoration4 = useCallback((event) => {
    setFlowerDecoration4(event.target.value)
  }, [setFlowerDecoration4])

  const inputStaging1 = useCallback((event) => {
    setStaging1(event.target.value)
  }, [setStaging1])
  const inputStaging2 = useCallback((event) => {
    setStaging2(event.target.value)
  }, [setStaging2])
  const inputStaging3 = useCallback((event) => {
    setStaging3(event.target.value)
  }, [setStaging3])

  const inputGift1 = useCallback((event) => {
    setGift1(event.target.value)
  }, [setGift1])
  const inputGift2 = useCallback((event) => {
    setGift2(event.target.value)
  }, [setGift2])
  const inputGift3 = useCallback((event) => {
    setGift3(event.target.value)
  }, [setGift3])

  const inputValue1 = useCallback((event) => {
    setValue1(event.target.value)
  }, [setValue1])
  const inputValue2 = useCallback((event) => {
    setValue2(event.target.value)
  }, [setValue2])

  const errorMessageWedding = (dress1, dress2, dress3, dress4, snap1, snap2, snap3, 
    movie1, movie2, movie3, bouquet1, bouquet2, bouquet3, bouquet4, 
    makeAndDressing1, makeAndDressing2, makeAndDressing3, makeAndDressing4,
    ) => {
    // AdminWeddingDetail
    if (dress1 === "" || dress2 === "" || dress3 === "" || dress4 === "") {
      setIsDress(true)
    }else{
      setIsDress(false)
    }
    if (snap1 === "" || snap2 === "" || snap3 === "") {
      setIsSnap(true)
    }else{
      setIsSnap(false)
    }
    if (movie1 === "" || movie2 === "" || movie3 === "") {
      setIsMovie(true)
    }else{
      setIsMovie(false)
    }
    if (bouquet1 === "" || bouquet2 === "" || bouquet3 === "" || bouquet4 === "") {
      setIsBouquet(true)
    }else{
      setIsBouquet(false)
    }
    if (makeAndDressing1 === "" || makeAndDressing2 === "" || makeAndDressing3 === "" || makeAndDressing4 === "") {
      setIsMakeAndDressing(true)
    }else{
      setIsMakeAndDressing(false)
    }


    if (dress1 !== "" && dress2 !== "" && dress3 !== "" && dress4 !== "" && snap1 !== "" && snap2 !== "" && snap3 !== ""
    && movie1 !== "" && movie2 !== "" && movie3 !== "" && bouquet1 !== "" && bouquet2 !== "" && bouquet3 !== "" && bouquet4 !== ""
    && makeAndDressing1 !== "" && makeAndDressing2 !== "" && makeAndDressing3 !== "" && makeAndDressing4 !== "") {
      handleNext()
    }else{
      return false,
      window.scrollTo(0, 0)
    }
  }

  const errorMessageBanquet = (
    dish1, dish2, dish3, dish4, cake1, cake2, cake3, cake4,
    flowerDecoration1, flowerDecoration2, flowerDecoration3, flowerDecoration4,
    staging1, staging2, staging3, gift1, gift2, gift3, value1, value2
  ) => {
    // AdminBanquetDetail
    if (dish1 === "" || dish2 === "" || dish3 === "" || dish4 === "") {
      setIsDish(true)
    }else{
      setIsDish(false)
    }
    if (cake1 === "" || cake2 === "" || cake3 === "" || cake4 === "") {
      setIsCake(true)
    }else{
      setIsCake(false)
    }
    if (cake1 === "" || cake2 === "" || cake3 === "" || cake4 === "") {
      setIsCake(true)
    }else{
      setIsCake(false)
    }
    if (flowerDecoration1 === "" || flowerDecoration2 === "" || flowerDecoration3 === "" || flowerDecoration4 === "") {
      setIsFlowerDecoration(true)
    }else{
      setIsFlowerDecoration(false)
    }
    if (staging1 === "" || staging2 === "" || staging3 === "") {
      setIsStaging(true)
    }else{
      setIsStaging(false)
    }
    if (gift1 === "" || gift2 === "" || gift3 === "") {
      setIsGift(true)
    }else{
      setIsGift(false)
    }
    if (value1 === "" || value2 === "") {
      setIsValue(true)
    }else{
      setIsValue(false)
    }

    if(dish1 !== "" && dish2 !== "" && dish3 !== "" && dish4 !== "" && cake1 !== "" && cake2 !== "" && cake3 !== "" && cake4 !== ""
    && flowerDecoration1 !== "" && flowerDecoration2 !== "" && flowerDecoration3 !== "" && flowerDecoration4 !== "" 
    && staging1 !== "" && staging2 !== "" && staging3 !== "" && gift1 !== "" && gift2 !== "" && gift3 !== "" 
    && value1 !== "" && value2 !== ""){
      handleNext()
    }else{
      return false,
      window.scrollTo(0, 0)
    }
  }
  const errorMessageFixed = (weddingFee, tax, venueUsageFee) => {
    if (weddingFee === "") {
      setIsWeddingFee(true)
    }else{
      setIsWeddingFee(false)
    }
    if (tax === "") {
      setIsTax(true)
    }else{
      setIsTax(false)
    }
    if (venueUsageFee === "") {
      setIsVenueUsageFee(true)
    }else{
      setIsVenueUsageFee(false)
    }

    if(weddingFee !== "" && tax !== "" && venueUsageFee !== "" ){
      dispatch(saveCost(
        id,
        dress1, dress2, dress3, dress4, 
        snap1, snap2, snap3, 
        movie1, movie2, movie3,
        bouquet1 ,bouquet2, bouquet3, bouquet4,
        makeAndDressing1, makeAndDressing2, makeAndDressing3, makeAndDressing4,
        dish1, dish2, dish3, dish4,
        cake1, cake2, cake3, cake4,
        flowerDecoration1, flowerDecoration2, flowerDecoration3, flowerDecoration4,
        staging1, staging2, staging3,
        gift1, gift2, gift3,
        value1, value1,
        productId,
        weddingFee,
        tax,
        venueUsageFee
      ))
    }else{
      return false
    }
  }

  useEffect(() => {
    if (id !== "" && typeof id !== 'undefined') {
      db.collection('products').doc(productId).collection('cost').doc(id).get()
        .then(snapshot => {
          const data = snapshot.data();
          const dress1 = data.dress1.substring(5),
                dress2 = data.dress2.substring(5),
                dress3 = data.dress3.substring(5),
                dress4 = data.dress4.substring(5),
                snap1 = data.snap1.substring(4),
                snap2 = data.snap2.substring(4),
                snap3 = data.snap3.substring(4),
                movie1 = data.movie1.substring(5),
                movie2 = data.movie2.substring(5),
                movie3 = data.movie3.substring(5),
                bouquet1 = data.bouquet1.substring(7),
                bouquet2 = data.bouquet2.substring(7),
                bouquet3 = data.bouquet3.substring(7),
                bouquet4 = data.bouquet4.substring(7),
                makeAndDressing1 = data.makeAndDressing1.substring(15),
                makeAndDressing2 = data.makeAndDressing2.substring(15),
                makeAndDressing3 = data.makeAndDressing3.substring(15),
                makeAndDressing4 = data.makeAndDressing4.substring(15),
                dish1 = data.dish1.substring(4),
                dish2 = data.dish2.substring(4),
                dish3 = data.dish3.substring(4),
                dish4 = data.dish4.substring(4),
                cake1 = data.cake1.substring(4),
                cake2 = data.cake2.substring(4),
                cake3 = data.cake3.substring(4),
                cake4 = data.cake4.substring(4),
                flowerDecoration1 = data.flowerDecoration1.substring(16),
                flowerDecoration2 = data.flowerDecoration2.substring(16),
                flowerDecoration3 = data.flowerDecoration3.substring(16),
                flowerDecoration4 = data.flowerDecoration4.substring(16),
                staging1 = data.staging1.substring(7),
                staging2 = data.staging2.substring(7),
                staging3 = data.staging3.substring(7),
                gift1 = data.gift1.substring(4),
                gift2 = data.gift2.substring(4),
                gift3 = data.gift3.substring(4),
                value1 = data.value1.substring(5),
                value2 = data.value2.substring(5);

          setDress1(Number(dress1));
          setDress2(Number(dress2));
          setDress3(Number(dress3));
          setDress4(Number(dress4));
          setSnap1(Number(snap1));
          setSnap2(Number(snap2));
          setSnap3(Number(snap3));
          setMovie1(Number(movie1));
          setMovie2(Number(movie2));
          setMovie3(Number(movie3));
          setBouquet1(Number(bouquet1));
          setBouquet2(Number(bouquet2));
          setBouquet3(Number(bouquet3));
          setBouquet4(Number(bouquet4));
          setMakeAndDressing1(Number(makeAndDressing1));
          setMakeAndDressing2(Number(makeAndDressing2));
          setMakeAndDressing3(Number(makeAndDressing3));
          setMakeAndDressing4(Number(makeAndDressing4));
          setDish1(Number(dish1));
          setDish2(Number(dish2));
          setDish3(Number(dish3));
          setDish4(Number(dish4));
          setCake1(Number(cake1));
          setCake2(Number(cake2));
          setCake3(Number(cake3));
          setCake4(Number(cake4));
          setFlowerDecoration1(Number(flowerDecoration1));
          setFlowerDecoration2(Number(flowerDecoration2));
          setFlowerDecoration3(Number(flowerDecoration3));
          setFlowerDecoration4(Number(flowerDecoration4));
          setStaging1(Number(staging1));
          setStaging2(Number(staging2));
          setStaging3(Number(staging3));
          setGift1(Number(gift1));
          setGift2(Number(gift2));
          setGift3(Number(gift3));
          setValue1(Number(value1));
          setValue2(Number(value2));
          setWeddingFee(data.weddingFee);
          setTax(data.tax);
          setVenueUsageFee(data.venueUsageFee);
        })
    }
  },[id]);

  function getStepButton(activeStep) {
    switch (activeStep) {
      case 0:
        return(
          <Button 
            variant="contained" 
            color="primary"  
            onClick={() => errorMessageWedding(dress1, dress2, dress3, dress4, snap1, snap2, snap3, movie1, movie2, movie3, bouquet1, bouquet2, bouquet3, bouquet4, makeAndDressing1, makeAndDressing2, makeAndDressing3, makeAndDressing4)} >
            次に進む
          </Button>
        )
      case 1:
        return(
          <Button 
            variant="contained" 
            color="primary" 
            onClick={() => errorMessageBanquet(dish1, dish2, dish3, dish4, cake1, cake2, cake3, cake4, flowerDecoration1, flowerDecoration2, flowerDecoration3, flowerDecoration4, staging1, staging2, staging3, gift1, gift2, gift3, value1, value2)}>
            次に進む
          </Button>
        )
      case 2: 
        return(
            <Button 
              onClick={() => errorMessageFixed(weddingFee, tax, venueUsageFee)} 
              variant="contained" 
              color="primary">
              保存する
            </Button>
        )
      default:
        return 'Unknown stepIndex';
    }
  }


  function getStepContent(stepIndex) {
    switch (stepIndex) {
      case 0:
        return <AdminWeddingDetail
                  dress1 = {dress1}
                  dress2 = {dress2}
                  dress3 = {dress3}
                  dress4 = {dress4}
                  inputDress1={inputDress1}
                  inputDress2={inputDress2}
                  inputDress3={inputDress3}
                  inputDress4={inputDress4}
                  isDress={isDress}
                  snap1={snap1}
                  snap2={snap2}
                  snap3={snap3}
                  inputSnap1={inputSnap1}
                  inputSnap2={inputSnap2}
                  inputSnap3={inputSnap3}
                  isSnap={isSnap}
                  movie1={movie1}
                  movie2={movie2}
                  movie3={movie3}
                  inputMovie1={inputMovie1}
                  inputMovie2={inputMovie2}
                  inputMovie3={inputMovie3}
                  isMovie={isMovie}
                  bouquet1={bouquet1}
                  bouquet2={bouquet2}
                  bouquet3={bouquet3}
                  bouquet4={bouquet4}
                  inputBouquet1={inputBouquet1}
                  inputBouquet2={inputBouquet2}
                  inputBouquet3={inputBouquet3}
                  inputBouquet4={inputBouquet4}
                  isBouquet={isBouquet}
                  makeAndDressing1={makeAndDressing1}
                  makeAndDressing2={makeAndDressing2}
                  makeAndDressing3={makeAndDressing3}
                  makeAndDressing4={makeAndDressing4}
                  inputMakeAndDressing1={inputMakeAndDressing1}
                  inputMakeAndDressing2={inputMakeAndDressing2}
                  inputMakeAndDressing3={inputMakeAndDressing3}
                  inputMakeAndDressing4={inputMakeAndDressing4}
                  isMakeAndDressing={isMakeAndDressing}
                />;
      case 1:
        return <AdminBanquetDetail
                  dish1={dish1}
                  dish2={dish2}
                  dish3={dish3}
                  dish4={dish4}
                  inputDish1={inputDish1}
                  inputDish2={inputDish2}
                  inputDish3={inputDish3}
                  inputDish4={inputDish4}
                  isDish={isDish}
                  cake1={cake1}
                  cake2={cake2}
                  cake3={cake3}
                  cake4={cake4}
                  inputCake1={inputCake1}
                  inputCake2={inputCake2}
                  inputCake3={inputCake3}
                  inputCake4={inputCake4}
                  isCake={isCake}
                  flowerDecoration1={flowerDecoration1}
                  flowerDecoration2={flowerDecoration2}
                  flowerDecoration3={flowerDecoration3}
                  flowerDecoration4={flowerDecoration4}
                  inputFlowerDecoration1={inputFlowerDecoration1}
                  inputFlowerDecoration2={inputFlowerDecoration2}
                  inputFlowerDecoration3={inputFlowerDecoration3}
                  inputFlowerDecoration4={inputFlowerDecoration4}
                  isFlowerDecoration={isFlowerDecoration}
                  staging1={staging1}
                  staging2={staging2}
                  staging3={staging3}
                  inputStaging1={inputStaging1}
                  inputStaging2={inputStaging2}
                  inputStaging3={inputStaging3}
                  isStaging={isStaging}
                  gift1={gift1}
                  gift2={gift2}
                  gift3={gift3}
                  inputGift1={inputGift1}
                  inputGift2={inputGift2}
                  inputGift3={inputGift3}
                  isGift={isGift}
                  value1={value1}
                  value2={value2}
                  inputValue1={inputValue1}
                  inputValue2={inputValue2}
                  isValue={isValue}
                />;
      case 2:
        return <AdminFixedCost
                  weddingFee={weddingFee}
                  inputWeddingFee={inputWeddingFee}
                  isWeddingFee={isWeddingFee}
                  tax={tax}
                  inputTax={inputTax}
                  isTax={isTax}
                  venueUsageFee={venueUsageFee}
                  inputVenueUsageFee={inputVenueUsageFee}
                  isVenueUsageFee={isVenueUsageFee}
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

              <span>{getStepButton(activeStep)}</span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
export default CostEdit;
