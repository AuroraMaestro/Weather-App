/* Global Variables */
const apiKey = '2b7a0173e14e1719a48aad045dc7cc18';
const baseUrl = 'https://api.openweathermap.org/data/2.5/weather?zip=';
// Create a new date instance dynamically with JS
let d = new Date();
let newDate = d.getMonth() + 1 +'.'+ d.getDate()+'.'+ d.getFullYear();

// adds an event listener to excute the data retrieval.
document.getElementById('generate').addEventListener('click',function(){

    // we get the DOM elements needed for the creation of the new data.
    let zip = document.getElementById('zip').value;
    let feelings = document.getElementById('feelings').value;

    if(zip === ""){

        // handles having an empty zip entry
        alert('Please enter zip code!');

    }else{

        //gets the required data from the OpenWeather API.
        getData(baseUrl,zip,apiKey).then(newData =>{

        //creates a new object that holds the API's retrieved info
        // including the user's input (feelings)
        let dataToBeInserted = {
            temp : newData.main.temp,
            date : newDate,
            feeling : feelings
        }

        //sends the data to the server side
        postData('/addData',dataToBeInserted);

       }).then(() => updateUI());
       // dynamically updates the UI elements with the new data. 
    }



});


/* ASYNC functions */



// we post a request to the server, to send our data.
const postData = async (url = '', data = {}) => {

   
    const res = await fetch(url,{
        method : 'POST',
        credentials : 'same-origin',
        headers : {
            'Content-Type' : 'application/json',
        },

        body : JSON.stringify(data),
    })
    
}

// Gets data from the OpenWeatherAPI.
const getData = async (baseUrl,zipCode,apiKey) => {

    const res = await fetch(baseUrl+zipCode+"&units=metric&appid="+apiKey)
    
    // gets the response's json object.
    try {
        const newData = await res.json();
        return newData;
    } catch (error) {
        console.log('An error has occured : ',error);
    }
}


// fetches the data from the server and updates UI elements using DOM.
const updateUI = async () => {

    const req = await fetch('/all');

    try {
        const allData = await req.json();

        document.getElementById('date').innerHTML =`Date: ${allData.date}`;
        document.getElementById('temp').innerHTML =`Temp: ${allData.temp} Celsius`;
        document.getElementById('content').innerHTML =`Feelings: ${allData.feeling}`;

    } catch (error) {
        console.log('An error has occured : ',error);
    }

}