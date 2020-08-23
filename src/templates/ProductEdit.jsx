import React, { useState, useCallback, useEffect } from 'react';
import { TextInput, SelectBox, PrimaryButton } from '../components/UIkit';
import { useDispatch } from 'react-redux';
import { saveProduct } from '../reducks/products/operations';
import { db } from '../firebase/index';
import { ImageArea } from '../components/Products';


const ProductEdit = () => {
  const dispatch = useDispatch();

  let id = window.location.pathname.split('/hall/edit')[1];
    if (id !== "" && typeof id !== 'undefined') {
      id = id.split('/')[1]
    }

  const [images, setImages] = useState([]),
        [name, setName] = useState(""),
        [description, setDescription] = useState(""),
        [address, setAddress] = useState(""),
        [url, setUrl] = useState(""),
        [type, setType] = useState(""),
        [style, setStyle] = useState(""),
        [number, setNumber] = useState(""),
        [price, setPrice] = useState(""),
        [area, setArea] = useState("");
  
  const inputName = useCallback((event) => {
    setName(event.target.value)
  }, [setName])

  const inputDescription = useCallback((event) => {
    setDescription(event.target.value)
  }, [setDescription])

  const inputAddress = useCallback((event) => {
    setAddress(event.target.value)
  }, [setAddress])

  const inputUrl = useCallback((event) => {
    setUrl(event.target.value)
  }, [setUrl])

  const types = [
    {id: "ceremony", name: "専門式場"},
    {id: "hotel", name: "ホテル"},
    {id: "guesthouse", name: "ゲストハウス"},
    {id: "shrine", name: "神社"},
    {id: "church", name: "教会"},
    {id: "restaurant", name: "レストラン"},
    {id: "other", name: "その他"},
  ]

  const styles = [
    {id: "churchceremony", name: "教会式"},
    {id: "publicceremony", name: "人前式"},
    {id: "deityceremony", name: "神前式"},
    {id: "buddhistCeremony", name: "仏前式"},
  ]

  const numbers = [
    {id: "twenty", name: "20"},
    {id: "forty", name: "40"},
    {id: "sixty", name: "60"},
    {id: "eighty", name: "80"},
    {id: "onehundred", name: "100"},
    {id: "overOnehundred", name: "100以上"},
  ]

  const prices = [
    {id: "lessThanOneMillion", name: "100万未満"},
    {id: "oneToTwoMillion", name: "100〜200万"},
    {id: "twoToThreeMillion", name: "200〜300万"},
    {id: "threeToFourMillion", name: "300〜400万"},
    {id: "fourToFiveMillion", name: "400〜500万"},
    {id: "overFiveMillion", name: "500万以上"},
  ]

  const areas = [
    {id: "hokkaidoRegion", name: "北海道地方"},
    {id: "tohokuRegion", name: "東北地方"},
    {id: "kanntouRegion", name: "関東地方"},
    {id: "chubuRegion", name: "中部地方"},
    {id: "kinkiRegion", name: "近畿地方"},
    {id: "chugokuRegion", name: "中国地方"},
    {id: "kyusyuRegion", name: "九州地方"},
  ]

  useEffect(() => {
    if (id !== "" && typeof id !== 'undefined') {
      db.collection('products').doc(id).get()
        .then(snapshot => {
          const data = snapshot.data();
          setImages(data.images);
          setName(data.name);
          setDescription(data.description);
          setAddress(data.address);
          setUrl(data.url);
          setType(data.type);
          setStyle(data.style);
          setNumber(data.number);
          setPrice(data.price);
          setArea(data.area);
        })
    }
  },[id]);

  return(
    <section className="main">
      <h2 className="u-text__headline u-text-center">式場の登録・編集</h2>
      <div className="c-section-container">
        <ImageArea images={ images } setImages={ setImages }/>
        <TextInput 
          label={ "式場名" }
          fullWidth={ true }
          multiline={ false }
          rows={ 1 }
          value={ name }
          type={ "text" }
          required={ true }
          onChange={ inputName }
        />
        <TextInput 
          label={ "式場説明" }
          fullWidth={ true }
          multiline={ true }
          rows={ 5 }
          value={ description }
          type={ "text" }
          required={ true }
          onChange={ inputDescription }
        />
        <TextInput 
          label={ "住所" }
          fullWidth={ true }
          multiline={ false }
          rows={ 1 }
          value={ address }
          type={ "text" }
          required={ true }
          onChange={ inputAddress }
        />
        <TextInput 
          label={ "HPのURL" }
          fullWidth={ true }
          multiline={ false }
          rows={ 1 }
          value={ url }
          type={ "text" }
          required={ true }
          onChange={ inputUrl }
        />

        <SelectBox 
          label={ "式場のタイプ" }
          value={ type }
          options={ types }
          required={ true }
          select={ setType }
        />

        <SelectBox 
          label={ "挙式スタイル" }
          value={ style }
          options={ styles }
          required={ true }
          select={ setStyle }
        />
        <SelectBox 
          label={ "招待人数" }
          value={ number }
          options={ numbers }
          required={ true }
          select={ setNumber }
        />
        <SelectBox 
          label={ "予算" }
          value={ price }
          options={ prices }
          required={ true }
          select={ setPrice }
        />
        <SelectBox 
          label={ "エリア" }
          value={ area }
          options={ areas }
          required={ true }
          select={ setArea }
        />

        <div className="module-spacer--small" />
        <div className="center">
          <PrimaryButton 
            label={ "登録する" }
            onClick={() => dispatch(saveProduct(id, images, name, description, address, url, type, style, number, price, area))}
          />
        </div>
      </div>
    </section>
  )
}


export default ProductEdit;