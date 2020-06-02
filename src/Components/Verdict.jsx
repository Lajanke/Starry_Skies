import React from 'react';
import Axios from 'axios';
import styled from 'styled-components';
const { getDarkHours, getCloudData } = require('../utils');


class Verdict extends React.Component {
    state = {
        darkness: {},
        cloudCover: 0,
        lat: 0,
        log: 0,
    }

    componentDidMount() {
        this.getLocation()
            .then((position) => {
                this.setState({ lat: position.coords.latitude, long: position.coords.longitude })
            })
            .catch((err) => console.log(err.message));
    }

    componentDidUpdate(prevProps, prevState) {
        const { lat, long } = this.state;
        if (prevState.lat !== lat) {
            this.fetchDarkHours(lat, long);
        }
    }

    getLocation = () => {
        return new Promise(function (resolve, reject) {
            navigator.geolocation.getCurrentPosition(resolve, reject);
        });
    }

    fetchDarkHours = (lat, long) => {
        Axios.get(`https://api.sunrise-sunset.org/json?lat=${lat}&lng=${long}&formatted=0`)
            .then((response) => {
                this.setState({ darkness: getDarkHours(response.data.results) });
            })
            .then(() => {
                const { darkStart, darkHours } = this.state.darkness
                this.fetchCloudData(darkStart, darkHours, lat, long);
            })
    }

    fetchCloudData = (start, hours, lat, long) => {
        console.log(start, hours, lat, long)
        Axios.get(`https://api.weatherbit.io/v2.0/forecast/hourly?lat=${lat}&lon=${long}&key=[APIKEY]`)
            .then((response) => {
                this.setState({ cloudCover: getCloudData(start, hours, response.data.data) });
            })
    }

    handleButtonClick = () => {
        const { astroTwiStart, astroTwiHours } = this.state.darkness;
        const { lat, long } = this.state;
        this.fetchCloudData(astroTwiStart, astroTwiHours, lat, long)
    }

    render() {
        const { darkHours, astroTwiHours, darkStart } = this.state.darkness
        const { cloudCover } = this.state

        const Div = styled.div`
            opacity: ${cloudCover}%;
        `
        return (
            <React.Fragment>
                {darkHours <= 0 &&
                    <h1>No True Darkness Tonight</h1>
                }
                {darkHours > 0 &&
                    <h1>Hours of Darkness: {darkHours}</h1>
                }
                {astroTwiHours &&
                    <h2>Astronomical Twilight Hours: {astroTwiHours}</h2>
                }
                {(new Date().getHours() > darkStart || new Date().getHours() < 3) &&
                    <p className='tomorrow'>Dark already. Showing data for tomorrow night.</p>
                }
                <br />
                <img src="stars._crop.png" alt="stars" />
                <Div>
                    <img src="clouds_repeat2.png" alt="clouds" className='clouds' />
                </Div>

                <div className='bottomDiv'>
                    <h3>{this.state.cloudCover}% cloud cover</h3>
                    <p>Should I get the telescope out?</p>
                    {(cloudCover < 10 && darkHours > 0) &&
                        <p>DEFINITELY</p>
                    }
                    {(cloudCover >= 10 && cloudCover && cloudCover < 30 && darkHours > 0) &&
                        <p>LOOKING GOOD</p>
                    }
                    {(cloudCover >= 30 && cloudCover <= 70) &&
                        <p>MAYBE</p>
                    }
                    {cloudCover > 70 &&
                        <p>DON'T BOTHER</p>
                    }
                    <br />
                    <button onClick={this.handleButtonClick}>INCLUDE ASTRONOMICAL DARKNESS</button>
                </div>
            </React.Fragment>
        )
    }
}

export default Verdict;