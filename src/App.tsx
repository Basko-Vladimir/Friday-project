import React, {useEffect} from 'react';
import './App.css';
import {Header} from './main/UI/Header/Header';
import {Routes} from './main/UI/Routes/Routes';
import {useDispatch, useSelector} from "react-redux";
import {getItemFromLS} from "./features/Sign-In/LS-service/localStorage";
import {setAuthMe} from "./features/Sign-In/BLL/signInReducer";
import {AppStateType} from "./main/BLL/store";

function App() {
    const dispatch = useDispatch()
    const isLoading = useSelector((state: AppStateType) => state.signUp.isLoading)
    useEffect(() => {
        const token = getItemFromLS('token')
        token && dispatch(setAuthMe(token));
    }, [])
    return (
       <div className="App">
            <Header/>
            <Routes/>
        </div>
    );
}

export default App;



