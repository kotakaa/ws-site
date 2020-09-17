import React, { useEffect, useState, useCallback } from 'react'
import { SelectBox, TextInput } from '../../components/UIkit/index';

const WeddingDetail = (props) => {

  const  [url, setUrl] = useState();
  const inputUrl = useCallback((event) => {
    setUrl(event.target.value)
  }, [setUrl])
  const dresses = [
    {id: Number(url), name: "豪華にしたい"}, 
    {id: 500, name: "こだわりたい"},
    {id: 100, name: "普通"},
    {id: 50, name: "そんなにこだわらない"},
  ]
  const snaps = [
    {id: 500, name: "こだわりたい"},
    {id: 100, name: "普通"},
    {id: 50, name: "そんなにこだわらない"},
  ]
  const movies = [
    {id: 500, name: "こだわりたい"},
    {id: 100, name: "普通"},
    {id: 50, name: "そんなにこだわらない"},
  ]
  const bouquets = [
    {id: 1000, name: "豪華にしたい"}, 
    {id: 500, name: "こだわりたい"},
    {id: 100, name: "普通"},
    {id: 50, name: "そんなにこだわらない"},
  ]
  const makeAndDressings = [
    {id: 1000, name: "豪華にしたい"}, 
    {id: 500, name: "こだわりたい"},
    {id: 100, name: "普通"},
    {id: 50, name: "そんなにこだわらない"},
  ]

  return (
    <>
      <h2 className="u-text__headline u-text-center">費用チェック</h2>
      <div className="c-section-container">
      <TextInput 
        label={ "input" }
        fullWidth={ true }
        multiline={ false }
        rows={ 1 }
        value={ url }
        type={ "text" }
        required={ true }
        onChange={ inputUrl }
      />  

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
