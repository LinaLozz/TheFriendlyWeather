const api = {
    key: 'd60c970bfd0ef3c2e80ad4455999e495',
    url: `https://api.openweathermap.org/data/2.5/weather`
  }

  const card = document.getElementById('card');

  const city = document.getElementById('city');
  const date = document.getElementById('date');
  const tempImg = document.getElementById('temp-img');
  const temp = document.getElementById('temp');
  const weather = document.getElementById('weather');
  const range = document.getElementById('range');

  function updateImage(data) {
      const temp = toCelsius(data.main.temp);
      let src = 'images-weather/calentar.png';
      if (temp > 26) {
          src = 'images-weather/temperatura-alta.png';
      } else if (temp < 10) {
          src = 'images-weather/frio.png';
      }
      tempImg.src = src; 
  }

  //funcion asincrona para obtener la informacion de la API
  async function search(query) {
      try {
        const response = await fetch(`${api.url}?q=${query}&appid=${api.key}&lang=en`);
        const data = await response.json();
        card.style.display = 'block';
        city.innerHTML = `${data.name}, ${data.sys.country}`;
        date.innerHTML = (new Date()).toLocaleDateString();
        temp.innerHTML = `${toCelsius(data.main.temp)}c`;
        weather.innerHTML = data.weather[0].description;
        range.innerHTML = `${toCelsius(data.main.temp_min)}ºc / ${toCelsius(data.main.temp_max)}ºc`;
        updateImage(data);
        clearField();
      } catch (error) {
          console.log(error);
          alert('Ups...I did it again!');
          
      }
    }
    
    //Funcion para convertir las temperaturas de kelvin a celsius
    function toCelsius(kelvin){
        return Math.round(kelvin - 273.15);
    }

  function onsubmit(event) {
      event.preventDefault();
      search(searchBox.value);
  }

  const clearField = () => {
    searchBox.value = "" ;
}

  const form = document.getElementById('searchForm');
  const searchBox = document.getElementById('searchBox');
  form.addEventListener('submit', onsubmit, true);