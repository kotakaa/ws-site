import React, {useEffect} from 'react';
import {useSelector} from "react-redux";
import {TextDetail} from "../components/UIkit";
import { getUserId } from "../reducks/users/selectors";
import { db } from '../firebase';
import { useState } from 'react';

const MyPage = () => {
    const selector = useSelector((state) => state);
    const uid = getUserId(selector);

    const [data, setData] = useState("");

    useEffect(() => {
        db.collection("users").doc(uid).get()
            .then(doc => {
                const data = doc.data()
                setData(data)
            })
    },[])

    return (
    <>
        {(data.role === 'admin') ? 
            <section className="c-section-container">
                <h2 className="u-text__headline u-text-center">式場プロフィール</h2>
                <div className="module-spacer--medium" />
                <TextDetail label="会員ステータス" value="管理者" />
                <TextDetail label="会社名" value={data.username} />
                <TextDetail label="メールアドレス" value={data.email} />
                <div className="module-spacer--small" />
            </section>
        :
            <section className="c-section-container">
                <h2 className="u-text__headline u-text-center">ユーザープロフィール</h2>
                <div className="module-spacer--medium" />
                <TextDetail label="会員ステータス" value="会員ユーザー" />
                <TextDetail label="ユーザー名" value={data.username} />
                <TextDetail label="メールアドレス" value={data.email} />
                <div className="module-spacer--small" />
            </section>
        }
    </>
    );
};

export default MyPage;