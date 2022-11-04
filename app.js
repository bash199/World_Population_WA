const continents = ["Africa", "Americas", "Asia", "Europe", "Oceania"]
let world = {}
const africaBtn = document.querySelector('.africa')
const fetchData = async (url) => {
   try {
     const response = await fetch(url);
     const data = await response.json();
     return data;
   } catch (error) {
     console.log(error);
   }
};

const getCountriesData = async () => {
   for (let i = 0; i < continents.length; i++) {
      const continentName = continents[i];
      const currentRegion = await fetchData(`https://restcountries.com/v3.1/region/${continents[i]}`);
      Object.assign(world, { [continentName]: [] })
      for (let j = 0; j < currentRegion.length; j++) {
         const countryName = currentRegion[j].name.common;
         const countryPopulation = currentRegion[j].population;
         const capital = currentRegion[j].capital;
         const neighbors = currentRegion[j].borders;
         const area = currentRegion[j].area;
         fillObject(world[continentName],countryName,countryPopulation,capital,neighbors,area)
     }
   }
   // console.log(world);
};

getCountriesData();

function fillObject(arr,name,pop,cap,neighbors,area){
   arr.push({
      name: name,
      population: pop,
      capital: cap,
      neighbors: neighbors,
      area: area
   })
}

africaBtn.addEventListener('click',() => {
   world[africaBtn.textContent].forEach(element => {
      console.log(element.name);
      fetchDataFromCountries(element.name)
   });
})

const fetchDataFromCountries = async (country,city) => {
   try{
      const res = await fetch('https://countriesnow.space/api/v0.1/countries/cities', {
            method: 'POST',
            headers: {
               'Content-Type': 'application/json',
            },
            body: JSON.stringify({

               city: city,
               country: country,
            }),
      });
      const data = await res.json();
      console.log(data);
   }
   catch(err){
      console.log(err);
   }
};




//? https://countriesnow.space/api/v0.1/countries/population/cities
         
//? https://countriesnow.space/api/v0.1/countries/cities Get all cities in a specified country
         
//? https://restcountries.com/v3.1/region/continent Get for countries by continent.
      