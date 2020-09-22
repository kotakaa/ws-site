import React, { useEffect, useState } from 'react'
import { SelectBox } from '../../components/UIkit/index';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormLabel from '@material-ui/core/FormLabel';
import { db } from '../../firebase/index';
import { useSelector } from 'react-redux';

const BanquetDetail = (props) => {
  const [cost, setCost] = useState("");
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
  const dishs = [
    {id: cost.dish1, name: "豪華にしたい"}, 
    {id: cost.dish2, name: "こだわりたい"},
    {id: cost.dish3, name: "普通"},
    {id: cost.dish4, name: "そんなにこだわらない"},
  ]
  const cakes = [
    {id: cost.cake1, name: "豪華にしたい"}, 
    {id: cost.cake2, name: "こだわりたい"},
    {id: cost.cake3, name: "普通"},
    {id: cost.cake4, name: "そんなにこだわらない"},
  ]
  const flowerDecorations = [
    {id: cost.flowerDecoration1, name: "豪華にしたい"}, 
    {id: cost.flowerDecoration2, name: "こだわりたい"},
    {id: cost.flowerDecoration3, name: "普通"},
    {id: cost.flowerDecoration4, name: "そんなにこだわらない"},
  ]
  const stagings = [
    {id: cost.staging1, name: "こだわりたい"},
    {id: cost.staging2, name: "普通"},
    {id: cost.staging3, name: "そんなにこだわらない"},
  ]
  const gifts = [
    {id: cost.gift1, name: "こだわりたい"},
    {id: cost.gift2, name: "普通"},
    {id: cost.gift3, name: "そんなにこだわらない"},
  ]

  return (
    <section>
      <h2 className="u-text__headline u-text-center">費用チェック</h2>
      <div className="c-section-container">
        <SelectBox 
          label={ "お料理" }
          value={ props.dish }
          options={ dishs }
          required={ true }
          select={ props.setDish }
        />
        <SelectBox 
          label={ "ウエディングケーキ" }
          value={ props.cake }
          options={ cakes }
          required={ true }
          select={ props.setCake }
        />
        <SelectBox 
          label={ "装花" }
          value={ props.flowerDecoration }
          options={ flowerDecorations }
          required={ true }
          select={ props.setFlowerDecoration }
        />
        <SelectBox 
          label={ "演出(音響含む)" }
          value={ props.staging }
          options={ stagings }
          required={ true }
          select={ props.setStaging }
        />
        <SelectBox 
          label={ "引出物" }
          value={ props.gift }
          options={ gifts }
          required={ true }
          select={ props.setGift }
        />
        
        <FormLabel component="legend" >司会者</FormLabel>
        <RadioGroup aria-label="chairperson" name="chairperson" value={props.value} onChange={props.handleChange} >
          <FormControlLabel value={ cost.value1 } control={<Radio color='primary'/>} label="必要" />
          <FormControlLabel value={ cost.value2 } control={<Radio color='primary'/>} label="必要じゃない" />
        </RadioGroup>
      </div>
    </section>
  )
}

export default BanquetDetail;

