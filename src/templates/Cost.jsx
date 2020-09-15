import React, { useState } from 'react';
import { SelectBox, PrimaryButton } from '../components/UIkit';
import { useDispatch } from 'react-redux';
import { db } from '../firebase/index';
import WeddingDetail from '../components/Cost/WeddingDetail';
import BanquetDetail from '../components/Cost/BanquetDetail';



const Cost = () => {
  const dispatch = useDispatch();
  const [value, setValue] = useState('yes'),
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

  const handleChange = (event) => {
    setValue(event.target.value);
  };

  return(
    <>
      <WeddingDetail
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
        />
        <BanquetDetail
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
        />
    </>
  )
}


export default Cost;