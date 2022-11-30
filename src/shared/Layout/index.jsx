import React from "react";
import './layout.css'
import { Image } from "react-bootstrap";

const Layout = ({children , backgroundImage , backgroundColor}) => {
    return(
        <>
          <div className="layout__background" style={{background : backgroundColor}}>
            <div className="layout__title">
              <div className="layout__head-cont">
                <h1 className="layout__head">HOOKED</h1>
              </div>
              <Image className="layout__banner_img" src={backgroundImage} alt="image" />
            </div>
            <div className="layout__card">
              {children}
            </div>
          </div>
        </>
      );
}

export default Layout