/* Global Variables */

let date = new Date();
let newDate = `${date.getMonth()+1}.${date.getDate()}.${date.getFullYear()}`;

// API Key from OpenWeatherMap API
const baseURL = 'http://api.openweathermap.org/data/2.5/weather?zip=';
const apiKey = '&appid=dbe6ab903e2ee41390e1e0b7fc0a7163&units=imperial';

// GET Request to retrive weather data from OpenweatherMap API 
const getData = async (baseUrl = "", zipCode = 0, apiKey = '') => {
    const response = await fetch(baseUrl + zipCode + apiKey);
    try {
        const data = await response.json();
        return data;
    } catch (error) {
        console.log("error:", error)
    }
}

// POST Request to save data to the server
const postData = async (url = "", data = {}) => {
  const response = await fetch(url, {
      method: 'POST',
      credentials: 'same-origin',
      headers: {
          'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
  });
  try {
      const newData = await response.json();
      return newData;
  } catch (error) {
      console.log("error", error);
  }
}

// Update App UI in Index HTML File
const updateAppUI = async () => {
    const request = await fetch('/gdata');
    try {
        // Transform into JSON
    const allData = await request.json()
        console.log(allData)
        // Write updated data to DOM elements
        document.getElementById('date').innerHTML = allData.date;
        document.getElementById('temp').innerHTML = Math.round(allData.temperature) + 'degrees';
        document.getElementById('content').innerHTML = allData.userResponse;
    } catch (error) {
        console.log("error", error);
        // appropriately handle the error
    }
}
document.getElementById('generate').addEventListener('click', requsetsOperation);

function requsetsOperation(e) {
    const zipCode = document.getElementById("zip");
    const feelings = document.getElementById('feelings');
    console.log("feeling:", feelings.value);
    getData(baseURL, zipCode.value, apiKey)
        .then(function (data) {
            postData('/pdata', { temperature: data?.main?.temp, date: newDate, userResponse: feelings.value });
        })
        .then(
          updateAppUI()
        )
}