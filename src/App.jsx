import React, { useState } from 'react';
import image from './assets/AI_image.png';
import loadgif from './assets/load-1110_256.gif'
import './App.css';

const App = () => {
  const token = "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"; 
  const [inputTxt, setInputTxt] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [loading,setLoading]=useState(false);

  async function query(data) {
    const response = await fetch(
      "https://api-inference.huggingface.co/models/ZB-Tech/Text-to-Image",
      {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        method: "POST",
        body: JSON.stringify({ "inputs": data }), 
      }
    );
    if (!response.ok) {
      throw new Error("Failed to fetch the image");
    }
    const result = await response.blob();
    return result;
  }

  const handleInput = () => {
    setLoading(true);
    query(inputTxt)
      .then((response) => {
        const objectURL = URL.createObjectURL(response);
        setImageUrl(objectURL);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching the image:", error);
      });
  };

  const handleEnter= async (e)=>{
    if(e.key=='Enter'){
      await handleInput();
    }
  }

  return (
    <div className="ai-image-generator">
      <div className="header">
        AI image <span>Generator</span>
      </div>
      <div className="image-loading">
        {loading?<img src={loadgif} alt="Generated" />:<img src={imageUrl !== "" ? imageUrl : image} alt="Generated" />}
      </div>
      <div onKeyDown={handleEnter} className="search-box">
        <input
          onChange={(e) => setInputTxt(e.target.value)}
          value={inputTxt}
          type="text"
          className="search-input"
          placeholder="Describe the image to generate"
        />
        <div  className="generate-btn" onClick={handleInput}>
          Generate
        </div>
      </div>
    </div>
  );
};

export default App;
