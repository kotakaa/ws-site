import React from 'react'
import { TextInput } from '../UIkit/index';

const AdminWeddingDetail = (props) => {
  
  return(
    <>
      <div className="center">
        <p>豪華にしたい・こだわりたい・普通・そんなにこだわらないの4パターンがございますので</p>
        <p>お客様が希望された場合の予算がどの程度かを入力してください。</p>
        <p>＊ 数字のみ入力できます。
        </p>
      </div>
      <div className="c-section-container">
      <h2 className="u-text__label u-text-left">ドレス・タキシード</h2>
        <TextInput 
          label={ "豪華にしたい" }
          fullWidth={ true }
          multiline={ false }
          rows={ 1 }
          value={ props.dress1 }
          type={ "number" }
          required={ true }
          onChange={ props.inputDress1 }
        />
        <TextInput 
          label={ "こだわりたい" }
          fullWidth={ true }
          multiline={ false }
          rows={ 1 }
          value={ props.dress2 }
          type={ "number" }
          required={ true }
          onChange={ props.inputDress2 }
        />
        <TextInput 
          label={ "普通" }
          fullWidth={ true }
          multiline={ false }
          rows={ 1 }
          value={ props.dress3 }
          type={ "number" }
          required={ true }
          onChange={ props.inputDress3 }
        />
        <TextInput 
          label={ "そんなにこだわらない" }
          fullWidth={ true }
          multiline={ false }
          rows={ 1 }
          value={ props.dress4 }
          type={ "number" }
          required={ true }
          onChange={ props.inputDress4 }
        />
        <div className="module-spacer--small"></div>
        <h2 className="u-text__label u-text-left">スナップ</h2>
        <TextInput 
          label={ "こだわりたい" }
          fullWidth={ true }
          multiline={ false }
          rows={ 1 }
          value={ props.snap1 }
          type={ "number" }
          required={ true }
          onChange={ props.inputSnap1 }
        />
        <TextInput 
          label={ "普通" }
          fullWidth={ true }
          multiline={ false }
          rows={ 1 }
          value={ props.snap2 }
          type={ "number" }
          required={ true }
          onChange={ props.inputSnap2 }
        />
        <TextInput 
          label={ "そんなにこだわらない" }
          fullWidth={ true }
          multiline={ false }
          rows={ 1 }
          value={ props.snap3 }
          type={ "number" }
          required={ true }
          onChange={ props.inputSnap3 }
        />
        <div className="module-spacer--small"></div>

        <h2 className="u-text__label u-text-left">映像</h2>
        <TextInput 
          label={ "こだわりたい" }
          fullWidth={ true }
          multiline={ false }
          rows={ 1 }
          value={ props.movie1 }
          type={ "number" }
          required={ true }
          onChange={ props.inputMovie1 }
        />
        <TextInput 
          label={ "普通" }
          fullWidth={ true }
          multiline={ false }
          rows={ 1 }
          value={ props.movie2 }
          type={ "number" }
          required={ true }
          onChange={ props.inputMovie2 }
        />
        <TextInput 
          label={ "そんなにこだわらない" }
          fullWidth={ true }
          multiline={ false }
          rows={ 1 }
          value={ props.movie3 }
          type={ "number" }
          required={ true }
          onChange={ props.inputMovie3 }
        />
        <div className="module-spacer--small"></div>

        <h2 className="u-text__label u-text-left">ブーケ</h2>
        <TextInput 
          label={ "豪華にしたい" }
          fullWidth={ true }
          multiline={ false }
          rows={ 1 }
          value={ props.bouquet1 }
          type={ "number" }
          required={ true }
          onChange={ props.inputBouquet1 }
        />
        <TextInput 
          label={ "こだわりたい" }
          fullWidth={ true }
          multiline={ false }
          rows={ 1 }
          value={ props.bouquet2 }
          type={ "number" }
          required={ true }
          onChange={ props.inputBouquet2 }
        />
        <TextInput 
          label={ "普通" }
          fullWidth={ true }
          multiline={ false }
          rows={ 1 }
          value={ props.bouquet3 }
          type={ "number" }
          required={ true }
          onChange={ props.inputBouquet3 }
        />
        <TextInput 
          label={ "そんなにこだわらない" }
          fullWidth={ true }
          multiline={ false }
          rows={ 1 }
          value={ props.bouquet4 }
          type={ "number" }
          required={ true }
          onChange={ props.inputBouquet4 }
        />
        <div className="module-spacer--small"></div>

        <h2 className="u-text__label u-text-left">ヘアメイク・着付</h2>
        <TextInput 
          label={ "豪華にしたい"}
          fullWidth={ true }
          multiline={ false }
          rows={ 1 }
          value={ props.makeAndDressing1 }
          type={ "number" }
          required={ true }
          onChange={ props.inputMakeAndDressing1 }
        />
        <TextInput 
          label={ "こだわりたい" }
          fullWidth={ true }
          multiline={ false }
          rows={ 1 }
          value={ props.makeAndDressing2 }
          type={ "number" }
          required={ true }
          onChange={ props.inputMakeAndDressing2 }
        />
        <TextInput 
          label={ "普通" }
          fullWidth={ true }
          multiline={ false }
          rows={ 1 }
          value={ props.makeAndDressing3 }
          type={ "number" }
          required={ true }
          onChange={ props.inputMakeAndDressing3 }
        />
        <TextInput 
          label={ "そんなにこだわらない" }
          fullWidth={ true }
          multiline={ false }
          rows={ 1 }
          value={ props.makeAndDressing4 }
          type={ "number" }
          required={ true }
          onChange={ props.inputMakeAndDressing4 }
        />
      </div>
    </>
  )
}

export default AdminWeddingDetail;
