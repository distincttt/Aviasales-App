import React from "react";
import Aside from "../Aside/Aside";
import Main from "../Main/Main";
import image from "../../image/Logo.svg";

import classes from "./App.module.scss";

export default function App() {
   return (
      <div className={classes.body}>
         <img src={image} alt="#" className={classes["body__image"]} />
         <div className={classes["body__container"]}>
            <Aside />
            <Main />
         </div>
      </div>
   );
}
