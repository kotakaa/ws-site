import React, { useEffect, useState } from 'react'
import { SelectBox } from '../../components/UIkit/index';
import { db } from '../../firebase/index';
import { useSelector } from 'react-redux';

const WeddingDetail = (props) => {
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

  const dresses = [
    {id: cost.dress1, name: "豪華にしたい"}, 
    {id: cost.dress2, name: "こだわりたい"},
    {id: cost.dress3, name: "普通"},
    {id: cost.dress4, name: "そんなにこだわらない"},
  ]
  const snaps = [
    {id: cost.snap1, name: "こだわりたい"},
    {id: cost.snap2, name: "普通"},
    {id: cost.snap3, name: "そんなにこだわらない"},
  ]
  const movies = [
    {id: cost.movie1, name: "こだわりたい"},
    {id: cost.movie2, name: "普通"},
    {id: cost.movie3, name: "そんなにこだわらない"},
  ]
  const bouquets = [
    {id: cost.bouquet1, name: "豪華にしたい"}, 
    {id: cost.bouquet2, name: "こだわりたい"},
    {id: cost.bouquet3, name: "普通"},
    {id: cost.bouquet4, name: "そんなにこだわらない"},
  ]
  const makeAndDressings = [
    {id: cost.makeAndDressing1, name: "豪華にしたい"}, 
    {id: cost.makeAndDressing2, name: "こだわりたい"},
    {id: cost.makeAndDressing3, name: "普通"},
    {id: cost.makeAndDressing4, name: "そんなにこだわらない"},
  ]

  return (
    <>
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
    </>
  )
}

export default WeddingDetail;
