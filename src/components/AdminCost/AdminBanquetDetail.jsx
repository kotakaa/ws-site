import React from 'react'
import ScrollToTopOnMount from '../../ScrollTop';
import { TextInput } from '../UIkit/index';

const AdminBanquetDetail = (props) => {

  return(
    <>
      <ScrollToTopOnMount />
      <div className="c-section-container">
      <h2 className="u-text u-text-left">お料理(お一人当たり)</h2>
      { props.isDish && <span className="error-message">お料理(お一人当たり)の全ての項目を入力してください</span> }
        <TextInput 
          label={ "豪華にしたい" }
          fullWidth={ true }
          multiline={ false }
          rows={ 1 }
          value={ props.dish1 }
          type={ "number" }
          required={ true }
          onChange={ props.inputDish1 }
        />
        <TextInput 
          label={ "こだわりたい" }
          fullWidth={ true }
          multiline={ false }
          rows={ 1 }
          value={ props.dish2 }
          type={ "number" }
          required={ true }
          onChange={ props.inputDish2 }
        />
        <TextInput 
          label={ "普通" }
          fullWidth={ true }
          multiline={ false }
          rows={ 1 }
          value={ props.dish3 }
          type={ "number" }
          required={ true }
          onChange={ props.inputDish3 }
        />
        <TextInput 
          label={ "そんなにこだわらない" }
          fullWidth={ true }
          multiline={ false }
          rows={ 1 }
          value={ props.dish4 }
          type={ "number" }
          required={ true }
          onChange={ props.inputDish4 }
        />
        <div className="module-spacer--small"></div>
        <h2 className="u-text u-text-left">ウエディングケーキ</h2>
        { props.isCake && <span className="error-message">ウエディングケーキの全ての項目を入力してください</span> }
        <TextInput 
          label={ "豪華にしたい" }
          fullWidth={ true }
          multiline={ false }
          rows={ 1 }
          value={ props.cake1 }
          type={ "number" }
          required={ true }
          onChange={ props.inputCake1 }
        />
        <TextInput 
          label={ "こだわりたい" }
          fullWidth={ true }
          multiline={ false }
          rows={ 1 }
          value={ props.cake2 }
          type={ "number" }
          required={ true }
          onChange={ props.inputCake2 }
        />
        <TextInput 
          label={ "普通" }
          fullWidth={ true }
          multiline={ false }
          rows={ 1 }
          value={ props.cake3 }
          type={ "number" }
          required={ true }
          onChange={ props.inputCake3 }
        />
        <TextInput 
          label={ "そんなにこだわらない" }
          fullWidth={ true }
          multiline={ false }
          rows={ 1 }
          value={ props.cake4 }
          type={ "number" }
          required={ true }
          onChange={ props.inputCake4 }
        />
        <div className="module-spacer--small"></div>

        <h2 className="u-text u-text-left">装花</h2>
        { props.isFlowerDecoration && <span className="error-message">装花の全ての項目を入力してください</span> }
        <TextInput 
          label={ "豪華にしたい" }
          fullWidth={ true }
          multiline={ false }
          rows={ 1 }
          value={ props.flowerDecoration1 }
          type={ "number" }
          required={ true }
          onChange={ props.inputFlowerDecoration1 }
        />
        <TextInput 
          label={ "こだわりたい" }
          fullWidth={ true }
          multiline={ false }
          rows={ 1 }
          value={ props.flowerDecoration2 }
          type={ "number" }
          required={ true }
          onChange={ props.inputFlowerDecoration2 }
        />
        <TextInput 
          label={ "普通" }
          fullWidth={ true }
          multiline={ false }
          rows={ 1 }
          value={ props.flowerDecoration3 }
          type={ "number" }
          required={ true }
          onChange={ props.inputFlowerDecoration3 }
        />
        <TextInput 
          label={ "そんなにこだわらない" }
          fullWidth={ true }
          multiline={ false }
          rows={ 1 }
          value={ props.flowerDecoration14 }
          type={ "number" }
          required={ true }
          onChange={ props.inputFlowerDecoration4 }
        />
        <div className="module-spacer--small"></div>

        <h2 className="u-text u-text-left">演出(音響含む)</h2>
        { props.isStaging && <span className="error-message">演出(音響含む)の全ての項目を入力してください</span> }
        <TextInput 
          label={ "こだわりたい" }
          fullWidth={ true }
          multiline={ false }
          rows={ 1 }
          value={ props.staging1 }
          type={ "number" }
          required={ true }
          onChange={ props.inputStaging1 }
        />
        <TextInput 
          label={ "普通" }
          fullWidth={ true }
          multiline={ false }
          rows={ 1 }
          value={ props.staging2 }
          type={ "number" }
          required={ true }
          onChange={ props.inputStaging2 }
        />
        <TextInput 
          label={ "そんなにこだわらない" }
          fullWidth={ true }
          multiline={ false }
          rows={ 1 }
          value={ props.staging3 }
          type={ "number" }
          required={ true }
          onChange={ props.inputStaging3 }
        />
        <div className="module-spacer--small"></div>

        <h2 className="u-text u-text-left">引出物(お一人当たり)</h2>
        { props.isGift && <span className="error-message">引出物(お一人当たり)の全ての項目を入力してください</span> }
        <TextInput 
          label={ "こだわりたい" }
          fullWidth={ true }
          multiline={ false }
          rows={ 1 }
          value={ props.gift1 }
          type={ "number" }
          required={ true }
          onChange={ props.inputGift1 }
        />
        <TextInput 
          label={ "普通" }
          fullWidth={ true }
          multiline={ false }
          rows={ 1 }
          value={ props.gift2 }
          type={ "number" }
          required={ true }
          onChange={ props.inputGift2 }
        />
        <TextInput 
          label={ "そんなにこだわらない" }
          fullWidth={ true }
          multiline={ false }
          rows={ 1 }
          value={ props.gift3 }
          type={ "number" }
          required={ true }
          onChange={ props.inputGift3 }
        />
        <div className="module-spacer--small"></div>

        <h2 className="u-text u-text-left">司会者</h2>
        { props.isValue && <span className="error-message">司会者の全ての項目を入力してください</span> }
        <TextInput
          label={ "呼ぶ場合" }
          fullWidth={ true }
          multiline={ false }
          rows={ 1 }
          value={ props.value1 }
          type={ "number" }
          required={ true }
          onChange={ props.inputValue1 }
        />
        <TextInput
          label={ "呼ばない場合" }
          fullWidth={ true }
          multiline={ false }
          rows={ 1 }
          value={ props.value2 }
          type={ "number" }
          required={ true }
          onChange={ props.inputValue2 }
        />
      </div>
    </>
  )
}

export default AdminBanquetDetail;

