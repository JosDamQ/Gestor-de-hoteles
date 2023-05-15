import React from "react";

export const Card = ({hotel, price, description}) => {
  return (
    <div className="card-wrapper main-card">
      <a className="card cardItemjs">
        <div className="card-image-wrapper">
          <img
            src="https://random.imagecdn.app/500/150"
            alt="Hotel"
          />
        </div>
        <div className="card-info">
          <div className="card-text big cardText-js">{hotel}</div>
          <div className="card-text small">{description}</div>
          <div className="card-text small">
            Starts from:
            <span className="card-price">{price}</span>
          </div>
        </div>
      </a>
    </div>
  );
};
