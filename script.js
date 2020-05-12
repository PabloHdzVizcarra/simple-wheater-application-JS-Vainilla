'use strict'

const form = document.querySelector('.top-banner form');
let input = document.querySelector('.container form input');
const msg = document.querySelector('.msg');
const cities = document.querySelector('.cities');

form.addEventListener('submit', event => {
    event.preventDefault();
    const inputVal = input.value;
    const apiKey = "7f6f51e9a2348ff93cea0ef22d5be41a";

    const url = `https://api.openweathermap.org/data/2.5/weather?q=${inputVal}&appid=${apiKey}&units=metric`;

    fetch(url)
      .then(response => response.json())
      .then(data => {
        console.log(data);
        const { main, name, sys, weather } = data;
        console.log(main, name, sys, weather);

        const li = document.createElement('li');
        li.classList.add('city');
        const markup = `
        <h2 class="city-name" data-name="${name},${sys.country}">
          <span>${name}</span>
          <sup>${sys.country}</sup>
        </h2>
        <div class="city-temp">${Math.round(main.temp)}<sup>C</sup>
        </div>
        <figure>
          <figcaption>${weather[0]["description"]}</figcaption>
          <figcaption>${weather[0]["main"]}</figcaption>
        </figure>
        `;

        li.innerHTML = markup;
        cities.appendChild(li);

        msg.textContent = "";
        form.reset();
        input.focus();
      })
      .catch(() => {
        msg.textContent = 'Please search for a valid city'
      })


})

