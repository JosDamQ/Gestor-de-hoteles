import React from "react";

export const Card = ({_id, name, address, email, phone, onClick}) => {
  return (
    <div className="card-wrapper main-card " onClick={onClick}>
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
            Starts from:
            <span className="card-price">{address}</span>
          </div>
          <div className="card-text small">
            Starts from:
            <span className="card-price">{email}</span>
          </div>
          <div className="card-text small">
            Starts from:
            <span className="card-price">{phone}</span>
          </div>
        </div>
      </a>
    </div>
  );
};
