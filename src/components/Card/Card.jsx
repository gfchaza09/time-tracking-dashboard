import React from 'react';

import './Card.styles.css';

export const Card = ({title, time}) => {

  return (
    <div className={`grid-item ${title.toLowerCase().replace(' ', '-')}`}>
        <div className="data-card">
            <div className="title"> 
                <h2 className="card-title">{title}</h2>
                <img className="options" src="/assets/icon-ellipsis.svg" alt="options" />
            </div>
            <div className="card-data-time">
                <h3 className="data-time">{time.current}hrs</h3>
                <h4 className="previous-time">Last Week - {time.previous}hrs</h4>
            </div>
        </div>
    </div>
  )
}
