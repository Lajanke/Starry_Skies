import React from 'react';
import Axios from 'axios';
import styled from 'styled-components';
import { getCloudData, getDarkHours, calculateIfDarkAlready, calculateIfAstroDarkAlready } from '../utils';

class Verdict extends React.Component {
    state = {
        darkness: {},
        cloudCover: null,
        lat: 0,
        log: 0,
        darkAlready: false,
        err: '',
        loading: true,
        usingAStroTwi: false,
    }

    componentDidMount() {
        this.getLocation()
            .then((position) => {
                this.setState({ lat: position.coords.latitude, long: position.coords.longitude, loading: false })
            })
            .catch((err) => {
                this.setState({ err: err })
            });
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
                this.setState({ darkAlready: calculateIfDarkAlready(this.state.darkness, new Date().getHours(), new Date().getMinutes()) })
                this.fetchCloudData(darkStart, darkHours, lat, long);
            })
            .catch((err) => {
                this.setState({ err: err.message })
            });
    }

    fetchCloudData = (start, hours, lat, long) => {
        Axios.get(`https://weatherbit-v1-mashape.p.rapidapi.com/forecast/hourly?lang=en&hours=36&lat=${lat}&lon=${long}`, {
            "headers": {
                "x-rapidapi-host": "weatherbit-v1-mashape.p.rapidapi.com",
                "x-rapidapi-key": `${process.env.REACT_APP_MY_KEY}`
            }
        })
        .then(response => {
            this.setState({ cloudCover: getCloudData(start, hours, response.data.data) });
        })
        .catch(err => {
            this.setState(err)
        });
    }

    handleButtonClick = () => {
        const { astroTwiStart, astroTwiHours } = this.state.darkness;
        const { lat, long } = this.state;
        this.fetchCloudData(astroTwiStart, astroTwiHours, lat, long)
        this.setState({ darkAlready: calculateIfAstroDarkAlready(this.state.darkness, new Date().getHours(), new Date().getMinutes()), usingAStroTwi: true })
    }

    render() {
        const { darkHours, astroTwiHours } = this.state.darkness;
        const { cloudCover, darkAlready, usingAStroTwi } = this.state;

        const Div = styled.div`
        .clouds{
            opacity: ${cloudCover === 0 ? 0 : cloudCover / 100};
        }

        .blue {
            opacity: 0.7
        }   
        `;

        if (this.state.err) return <p>{this.state.err}</p>
        if (this.state.loading) return <p>Loading...</p>
        return (
            <React.Fragment>
                <h1>Telescope Night?</h1>
                <section className='verdict'>
                    {darkHours === 0 && cloudCover === null && !usingAStroTwi &&
                        <p>No true darkness tonight, use astronomical twilight.</p>
                    }
                    {cloudCover >= 0 && cloudCover < 10 && (darkHours > 0 || usingAStroTwi) &&
                        <p className='definitely'>DEFINITELY</p>
                    }
                    {cloudCover >= 10 && cloudCover <= 30 &&
                        <p className='lookingGood'>LOOKING GOOD</p>
                    }
                    {cloudCover > 30 && cloudCover <= 50 &&
                        <p className='maybe'>MAYBE</p>
                    }
                    {cloudCover > 50 && cloudCover <= 70 &&
                        <p className='unlikely'>UNLIKELY</p>
                    }
                    {cloudCover > 70 &&
                        <p className='no'>No</p>
                    }
                </section>
                {typeof(cloudCover) === "number" &&
                    <h3>{cloudCover}% cloud cover</h3>
                }
                {darkAlready &&
                    <p className='tomorrow'>Dark already. Showing data for tomorrow night.</p>
                }
                <br />
                <img src='milky_way2.png' alt="stars" />
                <Div>
                    {darkHours === 0 && cloudCover === null &&
                        <img src='blue.png' alt='blue sky' className='blue' />
                    }
                    {(darkHours > 0 || astroTwiHours > 0) && cloudCover >= 0 &&
                        <img src="clouds.png" alt="clouds" className='clouds' />
                    }
                </Div>
                <div className='bottomDiv'>
                    {darkHours > 0 &&
                        <h1>Hours of Darkness: {darkHours}</h1>
                    }
                    {astroTwiHours &&
                        <h2>Astronomical Twilight Hours: {astroTwiHours}</h2>
                    }
                    <button onClick={this.handleButtonClick}>INCLUDE ASTRONOMICAL TWILIGHT</button>
                </div>
            </React.Fragment>
        )
    }
}

export default Verdict;