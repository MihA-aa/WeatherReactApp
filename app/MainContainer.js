import React, { Component } from 'react';
import Main from './Main';
import update from 'react-addons-update';

const WEATHER_URL1 = "https://query.yahooapis.com/v1/public/yql?q=select%20*%20from%20weather.forecast%20where%20woeid%20in%20(select%20woeid%20from%20geo.places(1)%20where%20text%3D%22";
const WEATHER_URL2 = "%2C%20";
const WEATHER_URL3 = "%22)&format=json&env=store%3A%2F%2Fdatatables.org%2Falltableswithkeys";
const GOOGLE_MAP_URL1 = "https://maps.googleapis.com/maps/api/geocode/json?language=en&latlng=";
const GOOGLE_MAP_URL2 = ",";
const GOOGLE_MAP_URL3 = "&key=AIzaSyCA8ETgVvEYi1gux7q-g5KeLntW6QZouMk";

class MainContainer extends Component {
    constructor() {
        super(...arguments);
        this.setGeolocation(); 
        this.state = {
            locations: JSON.parse(localStorage.getItem("locations"))
        };
    }

    createAndSetLocation(city, country) {
        this.findWeather(city, country)
            .then((responseData) => {
                try {
                    this.setInformation(responseData);
                    if (!this.isExist(city, country)) {
                        this.createLocation(city, country);
                    }
                }
                catch (e) {
                    alert("Something was wrong: \n" + e.message)
                }
            })
            .catch((error) => {
                alert('Error fetching and parsing data', error);
            });
    }

    findWeather(city, country) {
        return fetch(WEATHER_URL1 + city + WEATHER_URL2 + country + WEATHER_URL3)
            .then(response => {
                { return response.json() };
            })
            .catch((error) => {
                alert('Error fetching and parsing data', error);
            });
    }

    createLocation(city, country) {
        let newLocation = { city: city, country: country };
        this.addToLocalStorage(newLocation);
        let nextState = update(this.state.locations, {
            $push: [newLocation]
        });
        this.setState({ locations: nextState });
    }

    isExist(city, country) {
        return this.state.locations.some(x => x.city === city && x.country === country);
    }

    setInformation(responseData) {
        let temp = Number(responseData["query"]["results"]["channel"]["item"]["condition"]["temp"]);
        this.setState({
            locationInformation: {
                city: responseData["query"]["results"]["channel"]["location"]["city"],
                state: responseData["query"]["results"]["channel"]["location"]["country"],
                country: responseData["query"]["results"]["channel"]["location"]["country"],
                region: responseData["query"]["results"]["channel"]["location"]["region"],
                date: responseData["query"]["results"]["channel"]["item"]["condition"]["date"],
                text: responseData["query"]["results"]["channel"]["item"]["condition"]["text"],
                temp: Math.round((temp - 32) / (9 / 5))
            }
        });
    }

    deleteLocation(city, country) {
        var index = this.state.locations.findIndex(x => x.city === city && x.country === country);
        if (index > -1) {
            this.removeFromLocalStorage(index);
            let nextState = update(this.state.locations, {
                $splice: [[index, 1]]
            });
            this.setState({ locations: nextState });
        }
    }

    showLocation(city, country) {
        this.findWeather(city, country)
            .then((responseData) => {
                this.setInformation(responseData);
            })
    }


    getUserInformation() {
        let url = GOOGLE_MAP_URL1 + this.state.location.latitude + GOOGLE_MAP_URL2
            + this.state.location.longitude + GOOGLE_MAP_URL3;
        return fetch(url)
            .then(response => {
                { return response.json() };
            })
            .catch((error) => {
                alert('Error fetching and parsing data', error);
            });
    }

    getUserLocation() {
        this.getUserInformation()
            .then((responseData) => {
                let city = responseData["results"][0]["address_components"][3]["long_name"];
                let state = responseData["results"][0]["address_components"][4]["long_name"];
                this.createAndSetLocation(city, state);
            })
            .catch((error) => {
                alert('Error fetching and parsing data', error);
            });
    }

    setGeolocation() {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(this.setPosition.bind(this));
        } else {
            alert("Geolocation is not supported by this browser.")
        };
    }

    setPosition(position) {
        this.setState({ location: position.coords });
    }

    addToLocalStorage(newLocation) {
        var storedLocations = JSON.parse(localStorage.getItem("locations"))
        storedLocations.push(newLocation);
        localStorage.setItem("locations", JSON.stringify(storedLocations));
    }

    removeFromLocalStorage(index) {
        var storedLocations = JSON.parse(localStorage.getItem("locations"))
        storedLocations.splice(index, 1);
        localStorage.setItem("locations", JSON.stringify(storedLocations));
    }

    render() {
        return <Main locations={this.state.locations}
            locationInformation={this.state.locationInformation}
            taskCallbacks={{
                getUserLocation: this.getUserLocation.bind(this),
                show: this.showLocation.bind(this),
                delete: this.deleteLocation.bind(this),
                add: this.createAndSetLocation.bind(this)
            }} />
    }
}
export default MainContainer;