import React, { useEffect } from 'react'
import { SelectBox } from '../../components/UIkit/index';

const WeddingDetail = (props) => {
  // useEffect(() => {
  //   props.nextStep()
  // },[]);

  const dresses = [
    {id: "very_picky", name: "豪華にしたい", value: 1000}, 
    {id: "picky", name: "こだわりたい", value: 500},
    {id: "nomal", name: "普通", value: 100},
    {id: "no_picky", name: "そんなにこだわらない", value: 50},
  ]
  const snaps = [
    {id: "picky", name: "こだわりたい", value: 500},
    {id: "nomal", name: "普通", value: 100},
    {id: "no_picky", name: "そんなにこだわらない", value: 50},
  ]
  const movies = [
    {id: "picky", name: "こだわりたい", value: 500},
    {id: "nomal", name: "普通", value: 100},
    {id: "no_picky", name: "そんなにこだわらない", value: 50},
  ]
  const bouquets = [
    {id: "very_picky", name: "豪華にしたい", value: 1000}, 
    {id: "picky", name: "こだわりたい", value: 500},
    {id: "nomal", name: "普通", value: 100},
    {id: "no_picky", name: "そんなにこだわらない", value: 50},
  ]
  const makeAndDressings = [
    {id: "very_picky", name: "豪華にしたい", value: 1000}, 
    {id: "picky", name: "こだわりたい", value: 500},
    {id: "nomal", name: "普通", value: 100},
    {id: "no_picky", name: "そんなにこだわらない", value: 50},
  ]

  return (
    <section>
      <h2 className="u-text__headline u-text-center">費用チェック</h2>
      <div className="c-section-container">
        <SelectBox 
          label={ "ドレス・タキシード" }
          value={ props.dress }
          options={ dresses }
          required={ true }
          select={ props.setDress }
        />
        <SelectBox 
          label={ "スナップ" }
          value={ props.snap }
          options={ snaps }
          required={ true }
          select={ props.setSnap }
        />
        <SelectBox 
          label={ "映像" }
          value={ props.movie }
          options={ movies }
          required={ true }
          select={ props.setMovie }
        />
        <SelectBox 
          label={ "ブーケ" }
          value={ props.bouquet }
          options={ bouquets }
          required={ true }
          select={ props.setBouquet }
        />
        <SelectBox 
          label={ "ヘアメイク・着付" }
          value={ props.makeAndDressing }
          options={ makeAndDressings }
          required={ true }
          select={ props.setMakeAndDressing }
        />

        
      </div>
    </section>
  )
}

export default WeddingDetail;
