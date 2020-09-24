import React, { useState, useCallback, useEffect } from 'react';
import { TextInput, SelectBox, PrimaryButton } from '../components/UIkit';
import { useDispatch } from 'react-redux';
import { saveProduct } from '../reducks/products/operations';
import { db } from '../firebase/index';
import { ImageArea } from '../components/Products';
import { useForm, Controller } from 'react-hook-form';



const ProductEdit = () => {
  const dispatch = useDispatch();
  const { register, handleSubmit, errors , control} = useForm();

  const onSubmit = () => {
    return (
      dispatch(saveProduct(id, images, name, description, address, url, type, style, number, price, area))
    )
  }

  let id = window.location.pathname.split('/product/edit')[1];
    if (id !== "" && typeof id !== 'undefined') {
      id = id.split('/')[1]
    }

  const [images, setImages] = useState([]),
        [name, setName] = useState(""),
        [description, setDescription] = useState(""),
        [address, setAddress] = useState(""),
        [url, setUrl] = useState(""),
        [type, setType] = useState(""),
        [types, setTypes] = useState([]),
        [style, setStyle] = useState(""),
        [styles, setStyles] = useState([]),
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
        
        <TextInput 
          label={ "式場名" }
          fullWidth={ true }
          multiline={ false }
          rows={ 1 }
          value={ name }
          type={ "text" }
          required={ true }
          onChange={ inputName }
          name={"式場名"}
          inputRef={register({
            required: "必須項目です！",
            maxLength : {
              value: 30,
              message: '30文字以内で入力してください'
            }
          })}
        />
          {errors.式場名 && "式場名を入力してください"}
        <TextInput 
          label={ "式場説明" }
          fullWidth={ true }
          multiline={ true }
          rows={ 5 }
          value={ description }
          type={ "text" }
          required={ true }
          onChange={ inputDescription }
          name={"式場説明"}
          inputRef={register({
            required: "必須項目です！",
          })}
        />
          {errors.式場説明 && "式場説明を入力してください"}
        <TextInput 
          label={ "住所" }
          fullWidth={ true }
          multiline={ false }
          rows={ 1 }
          value={ address }
          type={ "text" }
          required={ true }
          onChange={ inputAddress }
          name={"住所"}
          inputRef={register({
            required: "必須項目です！"
          })}
        />
          {errors.住所 && "住所を入力してください"}
        <TextInput 
          label={ "HPのURL" }
          fullWidth={ true }
          multiline={ false }
          rows={ 1 }
          value={ url }
          type={ "text" }
          required={ true }
          onChange={ inputUrl }
          name={"HPのURL"}
          inputRef={register({
            required: "必須項目です！",
          })}
        />
          {errors.HPのURL && "HPのURLを入力してください"}

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
          />
          <Controller
          as={<PrimaryButton label={ "登録する" }/>}
          name="submit"
          control={control}
          defaultValue=""
          onClick={handleSubmit(onSubmit)}
        />
        </div>
      </form>
    </section>
  )
}


export default ProductEdit;