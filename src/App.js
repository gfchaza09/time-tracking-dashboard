import { useEffect, useState } from 'react'
import { Footer } from './components/Footer/Footer'

import './App.css';
import { Card } from './components/Card/Card';

 export const App = () => {

  const [data, setData] = useState([]);

  const [option, setOption] = useState("weekly");

  const getData = () => {
    fetch('./data.json', {
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      }
    })
      .then(res => res.json())
      .then(data => {
        setData(data);
      })
  }

  const handleOption = e => {
    setOption(e.target.textContent.toLowerCase());
  }

  const optionData = (option, data) => {
    switch (option) {
      case "weekly":
        return data.timeframes.weekly;
      case "monthly":
        return data.timeframes.monthly;
      case "daily":
        return data.timeframes.daily;
      default:
        return {};
    }
  }

  useEffect(() => {
    getData();
  }, [])

  return (
    <>
      <main className="main">
          <div className="container-grid">
            <div className="grid">
              <div className="grid-item">
                <div className="report">
                  <div id="user-photo-frame">
                    <img src="time-tracking-dashboard-main/assets/image-jeremy.png" alt="jeremy-profile" id="user-photo"/>
                  </div>
                  <div className="report-user">
                    <span id="report-title">Report for</span>
                    <h1 id="name-user">Jeremy Robson</h1>
                  </div>
                </div>
                <ul>
                  <li id="button-daily" className={option === "daily" ? "active" : ""} onClick={handleOption}>Daily</li>
                  <li id="button-weekly" className={option === "weekly" ? "active" : ""} onClick={handleOption}>Weekly</li>
                  <li id="button-monthly" className={option === "monthly" ? "active" : ""} onClick={handleOption}>Monthly</li>
                </ul>
              </div>
        
              {/* <!-- -------------------------CARDS-------------------------------- --> */}

              {
                data.map(card => {
                  return <Card title={card.title} key={card.title} time={optionData(option, card)}/>
                })
              }
            </div>
          </div>
        </main>
      <Footer />
    </>
  )
}
