import React from "react";
import './Intro.css'

export default function Intro({firstMsg}){
    return (
        <div className="intro ">
            <div className="intro-cover">
                <div className="name ">{firstMsg ? firstMsg : 'Luma'},</div>
                <div className="work">{typeof firstMsg === 'string' ? 'welcome Back ' : 'Your Smart Chat Assistant'}</div>
                <div className="line"></div>
            </div>
        </div>
    )
}