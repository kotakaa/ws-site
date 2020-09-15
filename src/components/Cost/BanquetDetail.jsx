import React from 'react'
import { SelectBox } from '../../components/UIkit/index';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormLabel from '@material-ui/core/FormLabel';

const BanquetDetail = (props) => {

  const dishs = [
    {id: "very_picky", name: "豪華にしたい", value: 1000}, 
    {id: "picky", name: "こだわりたい", value: 500},
    {id: "nomal", name: "普通", value: 100},
    {id: "no_picky", name: "そんなにこだわらない", value: 50},
  ]
  const cakes = [
    {id: "very_picky", name: "豪華にしたい", value: 1000}, 
    {id: "picky", name: "こだわりたい", value: 500},
    {id: "nomal", name: "普通", value: 100},
    {id: "no_picky", name: "そんなにこだわらない", value: 50},
  ]
  const flowerDecorations = [
    {id: "very_picky", name: "豪華にしたい", value: 1000}, 
    {id: "picky", name: "こだわりたい", value: 500},
    {id: "nomal", name: "普通", value: 100},
    {id: "no_picky", name: "そんなにこだわらない", value: 50},
  ]
  const stagings = [
    {id: "picky", name: "こだわりたい", value: 500},
    {id: "nomal", name: "普通", value: 100},
    {id: "no_picky", name: "そんなにこだわらない", value: 50},
  ]
  const gifts = [
    {id: "picky", name: "こだわりたい", value: 500},
    {id: "nomal", name: "普通", value: 100},
    {id: "no_picky", name: "そんなにこだわらない", value: 50},
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
          <FormControlLabel value="yes" control={<Radio color='primary'/>} label="必要" />
          <FormControlLabel value="no" control={<Radio color='primary'/>} label="必要じゃない" />
        </RadioGroup>
      </div>
    </section>
  )
}

export default BanquetDetail;

