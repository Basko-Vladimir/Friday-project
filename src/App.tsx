import React, {useEffect} from 'react';
import './App.css';
import {Header} from './main/UI/Header/Header';
import {Routes} from './main/UI/Routes/Routes';
import {useDispatch} from "react-redux";
import {getItemFromLS} from "./features/Sign-In/LS-service/localStorage";
import {setAuthMe} from "./features/Sign-In/BLL/signInReducer";

function App() {
    const dispatch = useDispatch();
    useEffect(() => {
        const token = getItemFromLS('token');
        token && dispatch(setAuthMe(token));
    }, []);
    return (
        <div className="App">
            <Header/>
            <Routes/>
        </div>
    );
}

export default App;



