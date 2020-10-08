import React, { useState, useCallback, useEffect, useRef } from 'react';
import { TextInput, SelectBox, PrimaryButton } from '../components/UIkit';
import { useDispatch, useSelector } from 'react-redux';
import { saveProduct } from '../reducks/products/operations';
import { db } from '../firebase/index';
import { ImageArea } from '../components/Products';
import { makeStyles } from '@material-ui/core';
import { getUserId } from '../reducks/users/selectors';

const useStyles = makeStyles({
  formControl: {
    marginBottom: 8,
    minWidth: 128,
    width: "100%"
  }
})

const ProductEdit = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const selector = useSelector((state) => state)
  const uid = getUserId(selector)

  const errorMessage = (images, name, description, address, url, type, style, number, price, area) => {
  // imagearea
  if (images.length === 0) {
    setIsImages(true)}
  else{
    setIsImages(false)}

  // textInput
  if (name === "") {
    setIsName(true)}
  else{
    setIsName(false)}

  if (description === "") {
    setIsDescription(true)}
  else{
    setIsDescription(false)}

  if (address === "") {
    setIsAddress(true)}
  else{
    setIsAddress(false)}

  if (url === "") {
    setIsUrl(true)}
  else{
    setIsUrl(false)}

  // selectbox
  if (type === "") {
    setIsType(true)}
  else{
    setIsType(false)}

  if(style === "") {
    setIsStyle(true)
  }else{
    setIsStyle(false)}

  if(number === "") {
    setIsNumber(true)
  }else{
    setIsNumber(false)} 
  
  if(price === "") {
    setIsPrice(true)
  }else{
    setIsPrice(false)} 

  if(area === "") {
    setIsArea(true)
  }else{
    setIsArea(false)} 
  
  // 全部入力されたら
  if (images.length > 0 && name !== "" && description !== "" && address !== "" && url !== "" && type !== "" && style !== "" && number !== "" && price !== "" && area !== ""){
    dispatch(saveProduct(id, images, name, description, address, url, type, style, number, price, area, uid))
  }
}

  let id = window.location.pathname.split('/product/edit')[1];
    if (id !== "" && typeof id !== 'undefined') {
      id = id.split('/')[1]
    }

  const [images, setImages] = useState([]),
        [isImages, setIsImages] = useState(false),
        [name, setName] = useState(""),
        [isName, setIsName] = useState(false),
        [description, setDescription] = useState(""),
        [isDescription, setIsDescription] = useState(false),
        [address, setAddress] = useState(""),
        [isAddress, setIsAddress] = useState(false),
        [url, setUrl] = useState(""),
        [isUrl, setIsUrl] = useState(false),
        [type, setType] = useState(""),
        [types, setTypes] = useState([]),
        [isType, setIsType] = useState(false),
        [style, setStyle] = useState(""),
        [styles, setStyles] = useState([]),
        [isStyle, setIsStyle] = useState(false),
        [number, setNumber] = useState(""),
        [isNumber, setIsNumber] = useState(false),
        [price, setPrice] = useState(""),
        [isPrice, setIsPrice] = useState(false),
        [area, setArea] = useState(""),
        [isArea, setIsArea] = useState(false);
  
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
    {id: "北海道地方", name: "北海道地方"},
    {id: "東北地方", name: "東北地方"},
    {id: "関東地方", name: "関東地方"},
    {id: "中部地方", name: "中部地方"},
    {id: "近畿地方", name: "近畿地方"},
    {id: "中国地方", name: "中国地方"},
    {id: "九州地方", name: "九州地方"},
  ]

  useEffect(() => {
    db.collection('styles').orderBy('order', 'asc').get()
      .then(snapshots => {
        const list = [];
        snapshots.forEach(snapshot => {
          const data = snapshot.data()
          list.push({
            id: data.id,
            name: data.name
          })
        })
        setStyles(list)
      })

    db.collection('types').orderBy('order', 'asc').get()
    .then(snapshots => {
      const list = [];
      snapshots.forEach(snapshot => {
        const data = snapshot.data()
        list.push({
          id: data.id,
          name: data.name
        })
      })
      setTypes(list)
    })
  },[])

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
      <form className="c-section-container">
        <ImageArea images={ images } setImages={ setImages }/>
        { isImages && <span className="error-message">写真を入れてください</span> }
        
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
          { isName && <span className="error-message">式場名を入力してください</span> }

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
          { isDescription && <span className="error-message">式場説明を入力してください</span> }

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
          { isAddress && <span className="error-message">住所を入力してください</span> }

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
          { isUrl && <span className="error-message">HPのURLを入力してください</span> }

        <SelectBox 
          label={ "式場のタイプ" }
          value={ type }
          options={ types }
          required={ true }
          select={ setType }
        />
        { isType && <span className="error-message">式場のタイプを選択してください</span> }

        <SelectBox 
          label={ "挙式スタイル" }
          value={ style }
          options={ styles }
          required={ true }
          select={ setStyle }
        />
        { isStyle && <span className="error-message">挙式スタイルを選択してください</span> }

        <SelectBox 
          label={ "招待人数" }
          value={ number }
          options={ numbers }
          required={ true }
          select={ setNumber }
        />
        { isNumber && <span className="error-message">招待人数を選択してください</span> }

        <SelectBox 
          label={ "予算" }
          value={ price }
          options={ prices }
          required={ true }
          select={ setPrice }
        />
        { isPrice && <span className="error-message">予算を選択してください</span> }

        <SelectBox 
          label={ "エリア" }
          value={ area }
          options={ areas }
          required={ true }
          select={ setArea }
        />
        { isArea && <span className="error-message">エリアを選択してください</span> }

        <div className="module-spacer--small" />
        <div className="center">
          <PrimaryButton label={ "登録する" } onClick={() => errorMessage(images, name, description, address, url, type, style, number, price, area)}/>
        </div>
      </form>
    </section>
  )
}


export default ProductEdit;