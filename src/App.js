import React, { useState, useEffect } from "react";
import axios from "axios";
import "./styles/style.css";


function App() {
  const [formResponse, setFormResponse] = useState({})
  const [data, setData] = useState({ });
  
  const handleChange = (e) => {
    setData({
      ...data,
      [e.target.name] : e.target.value
    })
  }
  useEffect( () => {
    console.log(formResponse.success);
  },[formResponse] );
  const handleSubmit = (e) => {
    e.preventDefault();

    axios({
      method: "post",
      url: "http://localhost:8000/invoice/",
      data: data,
    })
      .then(function (res) {
        setFormResponse(res.data)
      })
      .catch(function (error) {
        setFormResponse(error.response.data)
      });
  };

  return (
    <div>
      <div className="container">
        <form onSubmit={handleSubmit}>
          <h1>Invoice</h1>
          <span className="success">{formResponse.success ? formResponse.success : ""}</span>
          <span className="error">{formResponse.invoice_number ? formResponse.invoice_number : ""}</span>
          <input
            onChange={handleChange}
            name="invoice_number"
            type="text"
            placeholder="Invoice number"
          />
          <span className="error">{formResponse.client_name ? formResponse.client_name : ""}</span>
          <input
            onChange={handleChange}
            name="client_name"
            type="text"
            placeholder="Name"
          />
          <span className="error">{formResponse.client_email ? formResponse.client_email : ""}</span>
          <input
            onChange={handleChange}
            name="client_email"
            type="email"
            placeholder="Email"
          />
          <span className="error">{formResponse.project_name ? formResponse.project_name : ""}</span>
          <input
            onChange={handleChange}
            name="project_name"
            type=" text"
            placeholder="Project name"
          />
          <span className="error">{formResponse.amount ? formResponse.amount : ""}</span>
          <input
            onChange={handleChange}
            name="amount"
            type="number"
            placeholder="Amount"
          />
          <button type="submit">Generate Link</button>
        </form>
      </div>
    </div>
  );
}

export default App;
