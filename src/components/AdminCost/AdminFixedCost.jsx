import React from 'react'
import { TextInput } from '../UIkit';

const AdminFixedCost = (props) => {
  return (
    <>
      <h2 className="u-text__headline u-text-center">固定費用</h2>
      <div className="c-section-container">
        <h2 className="u-text u-text-left">挙式料</h2>
        { props.isWeddingFee && <span className="error-message">挙式料を入力してください</span> }
          <TextInput
            label={ "価格を入力" }
            fullWidth={ true }
            multiline={ false }
            rows={ 1 }
            value={ props.weddingFee }
            type={ "number" }
            required={ true }
            onChange={ props.inputWeddingFee }
          />
        <h2 className="u-text u-text-left">会場使用料</h2>
        { props.isTax && <span className="error-message">会場使用料を入力してください</span> }
          <TextInput 
            label={ "価格を入力" }
            fullWidth={ true }
            multiline={ false }
            rows={ 1 }
            value={ props.tax }
            type={ "number" }
            required={ true }
            onChange={ props.inputTax }
          />
        <h2 className="u-text u-text-left">サービス料</h2>
        { props.isVenueUsageFee && <span className="error-message">サービス料を入力してください</span> }
          <TextInput 
            label={ "価格を入力(%抜き)" }
            fullWidth={ true }
            multiline={ false }
            rows={ 1 }
            value={ props.venueUsageFee }
            type={ "number" }
            required={ true }
            onChange={ props.inputVenueUsageFee }
          />
        </div>
    </>
  )
}

export default AdminFixedCost;
