import React from 'react';
import Axios from 'axios';

class Verdict extends React.Component {
    state = {
        darkHours: 1,
    }

    componentDidMount() {
        fetchDarkHours()
    }

   /* fetchDarkHours() {
        Axios.get('https://api.sunrise-sunset.org/json?lat=53.319595&lng=-1.926144&formatted=1')
    }*/

    /*{
  "results": {
    "sunrise": "3:54:40 AM",
    "sunset": "8:14:25 PM",
    "solar_noon": "12:04:33 PM",
    "day_length": "16:19:45",
    "civil_twilight_begin": "3:07:36 AM",
    "civil_twilight_end": "9:01:29 PM",
    "nautical_twilight_begin": "1:56:39 AM",
    "nautical_twilight_end": "10:12:27 PM",
    "astronomical_twilight_begin": "12:00:01 AM",
    "astronomical_twilight_end": "12:00:01 AM"
  },
  "status": "OK"
}*/

    render() {
        const { darkHours } = this.state
        return (
            <div>
            { darkHours <= 0 && 
                <h1>No darkness tonight</h1>
            }
            {darkHours > 0 && 
                <h1>Verdict</h1>
            }
        </div>
        )
    }
}

export default Verdict;