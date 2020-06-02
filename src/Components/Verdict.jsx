import React from 'react';
import Axios from 'axios';
import styled from 'styled-components';
const { getDarkHours, getCloudData } = require('../utils');


class Verdict extends React.Component {
    state = {
        darkness: {},
        cloudCover: 0,
    }

    componentDidMount() {
        this.fetchDarkHours()
    }

    fetchDarkHours = () => {
        Axios.get('https://api.sunrise-sunset.org/json?formatted=0')
            .then((response) => {
                this.setState({ darkness: getDarkHours(response.data.results) })
            })
            .then(() => {
                const { darkStart, darkHours } = this.state.darkness
                this.fetchCloudData(darkStart, darkHours)
            })

    }

    fetchCloudData = (start, hours) => {
        Axios.get('https://api.weatherbit.io/v2.0/forecast/hourly')
            .then((response) => {
                this.setState({ cloudCover: getCloudData(start, hours, response.data.data) })
            })
    }

    handleButtonClick = () => {
        const { astroTwiStart, astroTwiHours } = this.state.darkness
        this.fetchCloudData(astroTwiStart, astroTwiHours)
    }

    render() {
        const { darkHours, astroTwiHours, darkStart } = this.state.darkness
        const { cloudCover } = this.state

        const Div = styled.div`
            opacity: ${this.state.cloudCover}%;
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