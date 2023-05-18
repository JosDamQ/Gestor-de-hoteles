import React from "react";

export const CardEvent = ({name, description, price, onClick}) => {
  return (
    <div className="card-wrapper main-card" onClick={onClick}>
      <a className="card cardItemjs">
        <div className="card-image-wrapper">
          <img
            src="https://random.imagecdn.app/500/150"
            alt="Hotel"
          />
        </div>
        <div className="card-info">
          <div className="card-text big cardText-js">{name}</div>
          <div className="card-text small">
            descripcion:
            <span className="card-price">{description}</span>
          </div>
          <div className="card-text small">
            Precio:
            <span className="card-price">{price}</span>
          </div>
        </div>
      </a>
    </div>
  );
};