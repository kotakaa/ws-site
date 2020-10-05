import { signInAction, signOutAction, fetchProductsInFavoriteAction } from './actions';
import { push } from 'connected-react-router';
import { auth, db, FirebaseTimestamp } from '../../firebase/index';


export const addProductToFavorite = (addedProduct) => {
  return async (dispatch, getState) => {
    const uid = getState().users.uid
    const favoriteRef = db.collection('users').doc(uid).collection('favorite').doc()
    addedProduct['favoriteId'] = favoriteRef.id
      await favoriteRef.set(addedProduct)
    dispatch(push('/favorite'))
  }
}

export const fetchProductsInFavorite = (products) => {
  return async (dispatch) => {
    dispatch(fetchProductsInFavoriteAction(products))
  }
}

export const listenAuthState = () => {
  return async (dispatch) => {
    return auth.onAuthStateChanged(user => {
      if (user) {
        const uid = user.uid

          db.collection('users').doc(uid).get()
            .then(snapshot =>{
              const data = snapshot.data()

              dispatch(signInAction({
                isSignedIn: true,
                role: data.role,
                uid: uid,
                username: data.username
              }))
            })
      } else {
        dispatch(push("/signin"))
      }
    })
  }
}

export const signIn = (email, password) => {
  return async (dispatch) => {
    if ( email === "" || password === "") {
      alert("必須項目が未入力です")
      return false
    }

    auth.signInWithEmailAndPassword(email, password)
      .then (result => {
        const user = result.user
        
        if (user) {
          const uid = user.uid

          db.collection('users').doc(uid).get()
            .then(snapshot =>{
              const data = snapshot.data()

              dispatch(signInAction({
                isSignedIn: true,
                role: data.role,
                uid: uid,
                username: data.username
              }))

              dispatch(push('/'))
            })
        }
      })
  }
}

export const signUp = (username, email, password, confirmPassword) => {
  return async (dispatch) => {
    console.log("sign in");

    if (password !== confirmPassword) {
      alert("パスワードが一致しません。もう一度お試しください。")
      return false
    }

    if (!email.match(/[\w\-._]+@[\w\-._]+\.[A-Za-z]+/u)) {
      alert("メールアドレスの形式が正しくありません。")
      return false
    }
    return auth.createUserWithEmailAndPassword(email, password)
      .then(result => {
        const user = result.user

        if (user) {
          const uid = user.uid
          const timestamp = FirebaseTimestamp.now()
          const userInitialData = {
            created_at: timestamp,
            email: email,
            role: "customer",
            uid: uid,
            updated_at: timestamp,
            username: username
          }

          db.collection('users').doc(uid).set(userInitialData)
          .then(()=> {
            dispatch(push('/'))
          })
        }
      })
    
  }
}

export const signOut = () => {
  return async (dispatch) => {
    auth.signOut()
      .then(()=>{
        dispatch(signOutAction());
        dispatch(push('/signin'))
      })
  }
}

export const resetPassword = (email) => {
  return async (dispatch) => {
    if (email === "" ) {
      alert("メールアドレスが未入力です")
      return false
    }else{
      auth.sendPasswordResetEmail(email)
        .then(() => {
          alert("入力されたメールアドレスにメッセージを送信しました。")
          dispatch(push("/signin"))
        }).catch("パスワードのリセットに失敗しました。再度送り直してください。")
    }
  }
}

export const adminSignUp = (username, email, password, confirmPassword) => {
  return async (dispatch) => {
    if (username === "" || email === "" || password === "" || confirmPassword === "") {
      alert("必須項目が未入力です")
      return false
    }

    if (password !== confirmPassword) {
      alert("パスワードが一致しません。もう一度お試しください。")
      return false
    }

    if (password.length < 6) {
      alert('パスワードは6文字以上で入力してください。')
      return false
    }

    return auth.createUserWithEmailAndPassword(email, password)
      .then(result => {
        const user = result.user

        if (user) {
          const uid = user.uid
          const timestamp = FirebaseTimestamp.now()
          const userInitialData = {
            created_at: timestamp,
            email: email,
            role: "admin",
            uid: uid,
            updated_at: timestamp,
            username: username
          }

          db.collection('users').doc(uid).set(userInitialData)
          .then(()=> {
            dispatch(push('/'))
          })
        }
      })
    
  }
}

export const costResult = (value, dress, snap, movie, bouquet, makeAndDressing, dish, number, cake, flowerDecoration, staging, gift, weddingFee, tax, venueUsageFee) => {
  return async (dispatch, getState) => {
    const timestamp = FirebaseTimestamp.now()
    const Value = value.substring(5)
    const Dress = dress.substring(5)
    const Snap = snap.substring(4)
    const Movie = movie.substring(5)
    const Bouquet = bouquet.substring(7)
    const MakeAndDressing = makeAndDressing.substring(15)
    const Dish = dish.substring(4)
    const Cake = cake.substring(4)
    const FlowerDecoration = flowerDecoration.substring(16)
    const Staging = staging.substring(7)
    const Gift = gift.substring(4)
    console.log(Value, Dress,Snap, Movie, Bouquet, MakeAndDressing, Dish, Cake, FlowerDecoration, Staging, Gift);
    const uid = getState().users.uid
    const costsRef = db.collection('users').doc(uid).collection('costs').doc()
    const numberResult = number * (Number(Dish) + Number(Gift))
    const total = numberResult + Number(Value) + Number(Dress) + Number(Snap) + Number(Movie) + Number(Bouquet) + Number(MakeAndDressing)  + Number(Cake) + Number(FlowerDecoration) + Number(Staging) + weddingFee + venueUsageFee
    // 税の計算
    const taxResult = tax * 0.01
    const totalTax = total * taxResult
    const totalResult = totalTax + total

    console.log(numberResult);
    console.log(totalResult);
    const addResult = {
      result: totalResult,
      updated_at: timestamp,
      value: Number(Value),
      dress: Number(Dress),
      snap: Number(Snap),
      movie: Number(Movie),
      bouquet: Number(Bouquet),
      makeAndDressing:  Number(MakeAndDressing),
      number: number,
      dish: Number(Dish), 
      cake: Number(Cake), 
      flowerDecoration: Number(FlowerDecoration), 
      staging: Number(Staging), 
      gift: Number(Gift),
      weddingFee: weddingFee, 
      tax: tax, 
      venueUsageFee: venueUsageFee,
      costsId: costsRef.id
    }

      await costsRef.set(addResult)
      dispatch(push('/result/' + costsRef.id))
  }
}