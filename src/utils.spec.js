const { getDarkHours, getCloudData, calculateIfDarkAlready } = require('./utils');

const weatherbit =
    [
        {
            "wind_cdir": "W",
            "rh": 92,
            "pod": "d",
            "timestamp_utc": "2020-05-24T08:00:00",
            "pres": 989.913,
            "solar_rad": 52.948,
            "ozone": 347.063,
            "weather": {
                "icon": "d03d",
                "code": 302,
                "description": "Heavy drizzle"
            },
            "wind_gust_spd": 15.5141,
            "timestamp_local": "2020-05-24T09:00:00",
            "snow_depth": 0,
            "clouds": 100,
            "ts": 1590307200,
            "wind_spd": 7.87068,
            "pop": 10,
            "wind_cdir_full": "west",
            "slp": 1027.49,
            "dni": 792.49,
            "dewpt": 8.7,
            "snow": 0,
            "uv": 1.19705,
            "wind_dir": 268,
            "clouds_hi": 100,
            "precip": 0.1015625,
            "vis": 24.1352,
            "dhi": 95.81,
            "app_temp": 9.9,
            "datetime": "2020-05-24:08",
            "temp": 9.9,
            "ghi": 529.48,
            "clouds_mid": 65,
            "clouds_low": 97
        },
        {
            "wind_cdir": "W",
            "rh": 91,
            "pod": "d",
            "timestamp_utc": "2020-05-24T09:00:00",
            "pres": 990.336,
            "solar_rad": 66.618,
            "ozone": 344.915,
            "weather": {
                "icon": "c04d",
                "code": 803,
                "description": "Overcast clouds"
            },
            "wind_gust_spd": 15.8681,
            "timestamp_local": "2020-05-24T10:00:00",
            "snow_depth": 0,
            "clouds": 100,
            "ts": 1590310800,
            "wind_spd": 8.37291,
            "pop": 15,
            "wind_cdir_full": "west",
            "slp": 1027.88,
            "dni": 843.4,
            "dewpt": 8.8,
            "snow": 0,
            "uv": 1.60272,
            "wind_dir": 278,
            "clouds_hi": 100,
            "precip": 0.01171875,
            "vis": 24.1353,
            "dhi": 105.07,
            "app_temp": 10.3,
            "datetime": "2020-05-24:09",
            "temp": 10.3,
            "ghi": 666.18,
            "clouds_mid": 63,
            "clouds_low": 100
        },
        {
            "wind_cdir": "W",
            "rh": 89,
            "pod": "d",
            "timestamp_utc": "2020-05-24T10:00:00",
            "pres": 990.964,
            "solar_rad": 147.126,
            "ozone": 344.171,
            "weather": {
                "icon": "c04d",
                "code": 803,
                "description": "Overcast clouds"
            },
            "wind_gust_spd": 15.9462,
            "timestamp_local": "2020-05-24T11:00:00",
            "snow_depth": 0,
            "clouds": 100,
            "ts": 1590314400,
            "wind_spd": 8.47362,
            "pop": 15,
            "wind_cdir_full": "west",
            "slp": 1028.49,
            "dni": 876.1,
            "dewpt": 8.9,
            "snow": 0,
            "uv": 2.01798,
            "wind_dir": 280,
            "clouds_hi": 100,
            "precip": 0.0009765625,
            "vis": 24.135,
            "dhi": 111.51,
            "app_temp": 10.7,
            "datetime": "2020-05-24:10",
            "temp": 10.7,
            "ghi": 774.35,
            "clouds_mid": 64,
            "clouds_low": 98
        },
        {
            "wind_cdir": "W",
            "rh": 88,
            "pod": "d",
            "timestamp_utc": "2020-05-24T11:00:00",
            "pres": 991.633,
            "solar_rad": 160.501,
            "ozone": 342.933,
            "weather": {
                "icon": "c04d",
                "code": 803,
                "description": "Overcast clouds"
            },
            "wind_gust_spd": 16.5446,
            "timestamp_local": "2020-05-24T12:00:00",
            "snow_depth": 0,
            "clouds": 100,
            "ts": 1590318000,
            "wind_spd": 8.42323,
            "pop": 0,
            "wind_cdir_full": "west",
            "slp": 1029.16,
            "dni": 894.73,
            "dewpt": 9.1,
            "snow": 0,
            "uv": 2.34274,
            "wind_dir": 278,
            "clouds_hi": 95,
            "precip": 0,
            "vis": 24.1349,
            "dhi": 115.36,
            "app_temp": 10.9,
            "datetime": "2020-05-24:11",
            "temp": 10.9,
            "ghi": 844.74,
            "clouds_mid": 64,
            "clouds_low": 92
        },
        {
            "wind_cdir": "W",
            "rh": 86,
            "pod": "d",
            "timestamp_utc": "2020-05-24T12:00:00",
            "pres": 992.427,
            "solar_rad": 189.282,
            "ozone": 340.82,
            "weather": {
                "icon": "c04d",
                "code": 803,
                "description": "Overcast clouds"
            },
            "wind_gust_spd": 16.2389,
            "timestamp_local": "2020-05-24T13:00:00",
            "snow_depth": 0,
            "clouds": 99,
            "ts": 1590321600,
            "wind_spd": 8.47268,
            "pop": 15,
            "wind_cdir_full": "west",
            "slp": 1029.96,
            "dni": 901.34,
            "dewpt": 9,
            "snow": 0,
            "uv": 2.52199,
            "wind_dir": 280,
            "clouds_hi": 56,
            "precip": 0.00390625,
            "vis": 24.1351,
            "dhi": 116.76,
            "app_temp": 11.2,
            "datetime": "2020-05-24:12",
            "temp": 11.2,
            "ghi": 871.42,
            "clouds_mid": 72,
            "clouds_low": 92
        },
        {
            "wind_cdir": "WNW",
            "rh": 84,
            "pod": "d",
            "timestamp_utc": "2020-05-24T13:00:00",
            "pres": 992.473,
            "solar_rad": 161.918,
            "ozone": 340,
            "weather": {
                "icon": "c04d",
                "code": 803,
                "description": "Overcast clouds"
            },
            "wind_gust_spd": 16.1038,
            "timestamp_local": "2020-05-24T14:00:00",
            "snow_depth": 0,
            "clouds": 100,
            "ts": 1590325200,
            "wind_spd": 8.23644,
            "pop": 0,
            "wind_cdir_full": "west-northwest",
            "slp": 1029.96,
            "dni": 896.6,
            "dewpt": 8.6,
            "snow": 0,
            "uv": 2.37463,
            "wind_dir": 286,
            "clouds_hi": 0,
            "precip": 0,
            "vis": 24.1349,
            "dhi": 115.75,
            "app_temp": 11.2,
            "datetime": "2020-05-24:13",
            "temp": 11.2,
            "ghi": 852.2,
            "clouds_mid": 48,
            "clouds_low": 100
        },
        {
            "wind_cdir": "WNW",
            "rh": 80,
            "pod": "d",
            "timestamp_utc": "2020-05-24T14:00:00",
            "pres": 993.065,
            "solar_rad": 197.17,
            "ozone": 340.327,
            "weather": {
                "icon": "c04d",
                "code": 803,
                "description": "Overcast clouds"
            },
            "wind_gust_spd": 15.9744,
            "timestamp_local": "2020-05-24T15:00:00",
            "snow_depth": 0,
            "clouds": 100,
            "ts": 1590328800,
            "wind_spd": 8.1467,
            "pop": 0,
            "wind_cdir_full": "west-northwest",
            "slp": 1030.51,
            "dni": 880.04,
            "dewpt": 8.3,
            "snow": 0,
            "uv": 2.08861,
            "wind_dir": 289,
            "clouds_hi": 0,
            "precip": 0,
            "vis": 24.1349,
            "dhi": 112.31,
            "app_temp": 11.7,
            "datetime": "2020-05-24:14",
            "temp": 11.7,
            "ghi": 788.68,
            "clouds_mid": 58,
            "clouds_low": 100
        },
        {
            "wind_cdir": "WNW",
            "rh": 74,
            "pod": "d",
            "timestamp_utc": "2020-05-24T15:00:00",
            "pres": 993.131,
            "solar_rad": 222.184,
            "ozone": 339.837,
            "weather": {
                "icon": "c04d",
                "code": 803,
                "description": "Overcast clouds"
            },
            "wind_gust_spd": 16.0797,
            "timestamp_local": "2020-05-24T16:00:00",
            "snow_depth": 0,
            "clouds": 97,
            "ts": 1590332400,
            "wind_spd": 8.00518,
            "pop": 0,
            "wind_cdir_full": "west-northwest",
            "slp": 1030.45,
            "dni": 849.88,
            "dewpt": 8.3,
            "snow": 0,
            "uv": 1.78586,
            "wind_dir": 293,
            "clouds_hi": 0,
            "precip": 0,
            "vis": 24.1349,
            "dhi": 106.32,
            "app_temp": 12.7,
            "datetime": "2020-05-24:15",
            "temp": 12.7,
            "ghi": 686.21,
            "clouds_mid": 54,
            "clouds_low": 93
        },
        {
            "wind_cdir": "WNW",
            "rh": 70,
            "pod": "d",
            "timestamp_utc": "2020-05-24T16:00:00",
            "pres": 993.524,
            "solar_rad": 375.166,
            "ozone": 337.516,
            "weather": {
                "icon": "c04d",
                "code": 803,
                "description": "Overcast clouds"
            },
            "wind_gust_spd": 15.1409,
            "timestamp_local": "2020-05-24T17:00:00",
            "snow_depth": 0,
            "clouds": 78,
            "ts": 1590336000,
            "wind_spd": 7.10115,
            "pop": 0,
            "wind_cdir_full": "west-northwest",
            "slp": 1030.75,
            "dni": 802.42,
            "dewpt": 8.3,
            "snow": 0,
            "uv": 1.87439,
            "wind_dir": 299,
            "clouds_hi": 0,
            "precip": 0,
            "vis": 24.1352,
            "dhi": 97.55,
            "app_temp": 13.6,
            "datetime": "2020-05-24:16",
            "temp": 13.6,
            "ghi": 553.54,
            "clouds_mid": 42,
            "clouds_low": 60
        },
        {
            "wind_cdir": "WNW",
            "rh": 70,
            "pod": "d",
            "timestamp_utc": "2020-05-24T17:00:00",
            "pres": 993.694,
            "solar_rad": 266.977,
            "ozone": 334.72,
            "weather": {
                "icon": "c02d",
                "code": 802,
                "description": "Scattered clouds"
            },
            "wind_gust_spd": 13.5267,
            "timestamp_local": "2020-05-24T18:00:00",
            "snow_depth": 0,
            "clouds": 79,
            "ts": 1590339600,
            "wind_spd": 6.41843,
            "pop": 0,
            "wind_cdir_full": "west-northwest",
            "slp": 1030.86,
            "dni": 730.5,
            "dewpt": 8.4,
            "snow": 0,
            "uv": 1.36762,
            "wind_dir": 297,
            "clouds_hi": 0,
            "precip": 0,
            "vis": 24.1352,
            "dhi": 85.59,
            "app_temp": 13.8,
            "datetime": "2020-05-24:17",
            "temp": 13.8,
            "ghi": 402.38,
            "clouds_mid": 34,
            "clouds_low": 70
        },
        {
            "wind_cdir": "WNW",
            "rh": 71,
            "pod": "d",
            "timestamp_utc": "2020-05-24T18:00:00",
            "pres": 993.995,
            "solar_rad": 208.495,
            "ozone": 333.027,
            "weather": {
                "icon": "c02d",
                "code": 802,
                "description": "Scattered clouds"
            },
            "wind_gust_spd": 12.1438,
            "timestamp_local": "2020-05-24T19:00:00",
            "snow_depth": 0,
            "clouds": 63,
            "ts": 1590343200,
            "wind_spd": 5.7564,
            "pop": 0,
            "wind_cdir_full": "west-northwest",
            "slp": 1031.2,
            "dni": 619.16,
            "dewpt": 8.4,
            "snow": 0,
            "uv": 1.35423,
            "wind_dir": 297,
            "clouds_hi": 0,
            "precip": 0,
            "vis": 24.1348,
            "dhi": 69.59,
            "app_temp": 13.5,
            "datetime": "2020-05-24:18",
            "temp": 13.5,
            "ghi": 247,
            "clouds_mid": 1,
            "clouds_low": 62
        },
        {
            "wind_cdir": "WNW",
            "rh": 77,
            "pod": "d",
            "timestamp_utc": "2020-05-24T19:00:00",
            "pres": 994.573,
            "solar_rad": 103.903,
            "ozone": 331.473,
            "weather": {
                "icon": "c01d",
                "code": 800,
                "description": "Clear sky"
            },
            "wind_gust_spd": 10.824,
            "timestamp_local": "2020-05-24T20:00:00",
            "snow_depth": 0,
            "clouds": 27,
            "ts": 1590346800,
            "wind_spd": 4.183,
            "pop": 0,
            "wind_cdir_full": "west-northwest",
            "slp": 1031.89,
            "dni": 431.02,
            "dewpt": 8.6,
            "snow": 0,
            "uv": 1.7279,
            "wind_dir": 295,
            "clouds_hi": 2,
            "precip": 0,
            "vis": 24.1351,
            "dhi": 47.54,
            "app_temp": 12.6,
            "datetime": "2020-05-24:19",
            "temp": 12.6,
            "ghi": 104.82,
            "clouds_mid": 0,
            "clouds_low": 25
        },
        {
            "wind_cdir": "WNW",
            "rh": 85,
            "pod": "d",
            "timestamp_utc": "2020-05-24T20:00:00",
            "pres": 994.859,
            "solar_rad": 5.43809,
            "ozone": 330.11,
            "weather": {
                "icon": "c02d",
                "code": 801,
                "description": "Few clouds"
            },
            "wind_gust_spd": 6.91549,
            "timestamp_local": "2020-05-24T21:00:00",
            "snow_depth": 0,
            "clouds": 43,
            "ts": 1590350400,
            "wind_spd": 2.77934,
            "pop": 0,
            "wind_cdir_full": "west-northwest",
            "slp": 1032.34,
            "dni": 53.78,
            "dewpt": 8.8,
            "snow": 0,
            "uv": 1.46896,
            "wind_dir": 298,
            "clouds_hi": 43,
            "precip": 0,
            "vis": 24.1352,
            "dhi": 11.75,
            "app_temp": 11.4,
            "datetime": "2020-05-24:20",
            "temp": 11.4,
            "ghi": 5.7,
            "clouds_mid": 0,
            "clouds_low": 0
        },
        {
            "wind_cdir": "WNW",
            "rh": 88,
            "pod": "n",
            "timestamp_utc": "2020-05-24T21:00:00",
            "pres": 995.234,
            "solar_rad": 0,
            "ozone": 328.758,
            "weather": {
                "icon": "c04n",
                "code": 803,
                "description": "Overcast clouds"
            },
            "wind_gust_spd": 6.10242,
            "timestamp_local": "2020-05-24T22:00:00",
            "snow_depth": 0,
            "clouds": 95,
            "ts": 1590354000,
            "wind_spd": 1.52885,
            "pop": 0,
            "wind_cdir_full": "west-northwest",
            "slp": 1032.86,
            "dni": 0,
            "dewpt": 8.1,
            "snow": 0,
            "uv": 0,
            "wind_dir": 291,
            "clouds_hi": 95,
            "precip": 0,
            "vis": 24.1352,
            "dhi": 0,
            "app_temp": 10.3,
            "datetime": "2020-05-24:21",
            "temp": 10.3,
            "ghi": 0,
            "clouds_mid": 0,
            "clouds_low": 0
        },
        { //79 43 12
            "wind_cdir": "WSW",
            "rh": 88,
            "pod": "n",
            "timestamp_utc": "2020-05-24T22:00:00",
            "pres": 995.667,
            "solar_rad": 0,
            "ozone": 328.35,
            "weather": {
                "icon": "c04n",
                "code": 803,
                "description": "Overcast clouds"
            },
            "wind_gust_spd": 3.97121,
            "timestamp_local": "2020-05-24T23:00:00",
            "snow_depth": 0,
            "clouds": 79,
            "ts": 1590357600,
            "wind_spd": 1.21062,
            "pop": 0,
            "wind_cdir_full": "west-southwest",
            "slp": 1033.35,
            "dni": 0,
            "dewpt": 7.2,
            "snow": 0,
            "uv": 0,
            "wind_dir": 257,
            "clouds_hi": 79,
            "precip": 0,
            "vis": 24.135,
            "dhi": 0,
            "app_temp": 9.6,
            "datetime": "2020-05-24:22",
            "temp": 9.6,
            "ghi": 0,
            "clouds_mid": 0,
            "clouds_low": 0
        },
        {
            "wind_cdir": "W",
            "rh": 86,
            "pod": "n",
            "timestamp_utc": "2020-05-24T23:00:00",
            "pres": 996.02,
            "solar_rad": 0,
            "ozone": 328.136,
            "weather": {
                "icon": "c02n",
                "code": 802,
                "description": "Scattered clouds"
            },
            "wind_gust_spd": 2.73865,
            "timestamp_local": "2020-05-25T00:00:00",
            "snow_depth": 0,
            "clouds": 43,
            "ts": 1590361200,
            "wind_spd": 1.13193,
            "pop": 0,
            "wind_cdir_full": "west",
            "slp": 1033.77,
            "dni": 0,
            "dewpt": 6.5,
            "snow": 0,
            "uv": 0,
            "wind_dir": 267,
            "clouds_hi": 43,
            "precip": 0,
            "vis": 24.135,
            "dhi": 0,
            "app_temp": 8.8,
            "datetime": "2020-05-24:23",
            "temp": 8.8,
            "ghi": 0,
            "clouds_mid": 0,
            "clouds_low": 0
        },
        {
            "wind_cdir": "W",
            "rh": 85,
            "pod": "n",
            "timestamp_utc": "2020-05-25T00:00:00",
            "pres": 996.238,
            "solar_rad": 0,
            "ozone": 327.425,
            "weather": {
                "icon": "c01n",
                "code": 800,
                "description": "Clear sky"
            },
            "wind_gust_spd": 2.87423,
            "timestamp_local": "2020-05-25T01:00:00",
            "snow_depth": 0,
            "clouds": 12,
            "ts": 1590364800,
            "wind_spd": 1.00662,
            "pop": 0,
            "wind_cdir_full": "west",
            "slp": 1034,
            "dni": 0,
            "dewpt": 6.1,
            "snow": 0,
            "uv": 0,
            "wind_dir": 266,
            "clouds_hi": 5,
            "precip": 0,
            "vis": 24.1349,
            "dhi": 0,
            "app_temp": 8.6,
            "datetime": "2020-05-25:00",
            "temp": 8.6,
            "ghi": 0,
            "clouds_mid": 0,
            "clouds_low": 7
        },
        {
            "wind_cdir": "WSW",
            "rh": 87,
            "pod": "n",
            "timestamp_utc": "2020-05-25T01:00:00",
            "pres": 996.237,
            "solar_rad": 0,
            "ozone": 326.485,
            "weather": {
                "icon": "c01n",
                "code": 800,
                "description": "Clear sky"
            },
            "wind_gust_spd": 3.23655,
            "timestamp_local": "2020-05-25T02:00:00",
            "snow_depth": 0,
            "clouds": 5,
            "ts": 1590368400,
            "wind_spd": 0.740286,
            "pop": 0,
            "wind_cdir_full": "west-southwest",
            "slp": 1034.04,
            "dni": 0,
            "dewpt": 5.9,
            "snow": 0,
            "uv": 0,
            "wind_dir": 250,
            "clouds_hi": 1,
            "precip": 0,
            "vis": 24.135,
            "dhi": 0,
            "app_temp": 8.1,
            "datetime": "2020-05-25:01",
            "temp": 8.1,
            "ghi": 0,
            "clouds_mid": 0,
            "clouds_low": 4
        },
        {
            "wind_cdir": "SW",
            "rh": 90,
            "pod": "n",
            "timestamp_utc": "2020-05-25T02:00:00",
            "pres": 996.298,
            "solar_rad": 0,
            "ozone": 326.506,
            "weather": {
                "icon": "c01n",
                "code": 800,
                "description": "Clear sky"
            },
            "wind_gust_spd": 2.59177,
            "timestamp_local": "2020-05-25T03:00:00",
            "snow_depth": 0,
            "clouds": 3,
            "ts": 1590372000,
            "wind_spd": 0.788929,
            "pop": 0,
            "wind_cdir_full": "southwest",
            "slp": 1034.2,
            "dni": 0,
            "dewpt": 5.8,
            "snow": 0,
            "uv": 0,
            "wind_dir": 219,
            "clouds_hi": 0,
            "precip": 0,
            "vis": 24.135,
            "dhi": 0,
            "app_temp": 7.6,
            "datetime": "2020-05-25:02",
            "temp": 7.6,
            "ghi": 0,
            "clouds_mid": 0,
            "clouds_low": 3
        },
        {
            "wind_cdir": "S",
            "rh": 91,
            "pod": "n",
            "timestamp_utc": "2020-05-25T03:00:00",
            "pres": 996.176,
            "solar_rad": 0,
            "ozone": 326.887,
            "weather": {
                "icon": "c01n",
                "code": 800,
                "description": "Clear sky"
            },
            "wind_gust_spd": 2.21964,
            "timestamp_local": "2020-05-25T04:00:00",
            "snow_depth": 0,
            "clouds": 0,
            "ts": 1590375600,
            "wind_spd": 0.70875,
            "pop": 0,
            "wind_cdir_full": "south",
            "slp": 1034.1,
            "dni": 0,
            "dewpt": 5.6,
            "snow": 0,
            "uv": 0,
            "wind_dir": 185,
            "clouds_hi": 0,
            "precip": 0,
            "vis": 24.1349,
            "dhi": 0,
            "app_temp": 7.3,
            "datetime": "2020-05-25:03",
            "temp": 7.3,
            "ghi": 0,
            "clouds_mid": 0,
            "clouds_low": 0
        },
        {
            "wind_cdir": "S",
            "rh": 91,
            "pod": "n",
            "timestamp_utc": "2020-05-25T04:00:00",
            "pres": 996.459,
            "solar_rad": 0.3,
            "ozone": 328.017,
            "weather": {
                "icon": "c01n",
                "code": 800,
                "description": "Clear sky"
            },
            "wind_gust_spd": 2.4854,
            "timestamp_local": "2020-05-25T05:00:00",
            "snow_depth": 0,
            "clouds": 0,
            "ts": 1590379200,
            "wind_spd": 0.839635,
            "pop": 0,
            "wind_cdir_full": "south",
            "slp": 1034.39,
            "dni": 1.45,
            "dewpt": 5.5,
            "snow": 0,
            "uv": 0,
            "wind_dir": 177,
            "clouds_hi": 0,
            "precip": 0,
            "vis": 24.135,
            "dhi": 2.84,
            "app_temp": 3.9,
            "datetime": "2020-05-25:04",
            "temp": 7.1,
            "ghi": 0.3,
            "clouds_mid": 0,
            "clouds_low": 0
        },
        {
            "wind_cdir": "SSE",
            "rh": 90,
            "pod": "d",
            "timestamp_utc": "2020-05-25T05:00:00",
            "pres": 996.587,
            "solar_rad": 85.48,
            "ozone": 329.53,
            "weather": {
                "icon": "c01d",
                "code": 800,
                "description": "Clear sky"
            },
            "wind_gust_spd": 2.66083,
            "timestamp_local": "2020-05-25T06:00:00",
            "snow_depth": 0,
            "clouds": 0,
            "ts": 1590382800,
            "wind_spd": 0.995265,
            "pop": 0,
            "wind_cdir_full": "south-southeast",
            "slp": 1034.53,
            "dni": 389.54,
            "dewpt": 5.7,
            "snow": 0,
            "uv": 2.11085,
            "wind_dir": 156,
            "clouds_hi": 0,
            "precip": 0,
            "vis": 24.1348,
            "dhi": 43.29,
            "app_temp": 7.4,
            "datetime": "2020-05-25:05",
            "temp": 7.4,
            "ghi": 85.48,
            "clouds_mid": 0,
            "clouds_low": 0
        },
        {
            "wind_cdir": "SSE",
            "rh": 88,
            "pod": "d",
            "timestamp_utc": "2020-05-25T06:00:00",
            "pres": 997.035,
            "solar_rad": 223.71,
            "ozone": 331.667,
            "weather": {
                "icon": "c01d",
                "code": 800,
                "description": "Clear sky"
            },
            "wind_gust_spd": 2.09983,
            "timestamp_local": "2020-05-25T07:00:00",
            "snow_depth": 0,
            "clouds": 0,
            "ts": 1590386400,
            "wind_spd": 0.93033,
            "pop": 0,
            "wind_cdir_full": "south-southeast",
            "slp": 1034.87,
            "dni": 596.54,
            "dewpt": 7.1,
            "snow": 0,
            "uv": 2.3242,
            "wind_dir": 148,
            "clouds_hi": 0,
            "precip": 0,
            "vis": 24.1347,
            "dhi": 66.65,
            "app_temp": 9.2,
            "datetime": "2020-05-25:06",
            "temp": 9.2,
            "ghi": 223.71,
            "clouds_mid": 0,
            "clouds_low": 0
        },
        {
            "wind_cdir": "S",
            "rh": 77,
            "pod": "d",
            "timestamp_utc": "2020-05-25T07:00:00",
            "pres": 997.144,
            "solar_rad": 378.39,
            "ozone": 333.856,
            "weather": {
                "icon": "c01d",
                "code": 800,
                "description": "Clear sky"
            },
            "wind_gust_spd": 2.28577,
            "timestamp_local": "2020-05-25T08:00:00",
            "snow_depth": 0,
            "clouds": 0,
            "ts": 1590390000,
            "wind_spd": 0.745924,
            "pop": 0,
            "wind_cdir_full": "south",
            "slp": 1034.61,
            "dni": 716.32,
            "dewpt": 8.5,
            "snow": 0,
            "uv": 2.90072,
            "wind_dir": 191,
            "clouds_hi": 0,
            "precip": 0,
            "vis": 24.1348,
            "dhi": 83.4,
            "app_temp": 12.3,
            "datetime": "2020-05-25:07",
            "temp": 12.3,
            "ghi": 378.39,
            "clouds_mid": 0,
            "clouds_low": 0
        },
    ]

describe('getDarkHours', () => {

    const nonFormat = {
        "sunrise": "2020-05-22T21:23:31+00:00",
        "sunset": "2020-05-23T06:50:59+00:00",
        "solar_noon": "2020-05-23T02:07:15+00:00",
        "day_length": 34048,
        "civil_twilight_begin": "2020-05-22T20:52:32+00:00",
        "civil_twilight_end": "2020-05-23T07:21:58+00:00",
        "nautical_twilight_begin": "2020-05-22T08:17:50+00:00",
        "nautical_twilight_end": "2020-05-23T19:56:41+00:00",
        "astronomical_twilight_begin": "2020-05-22T07:44:08+00:00",
        "astronomical_twilight_end": "2020-05-23T20:30:23+00:00"
    }

    const nonFormat2 = {

        "sunrise": "2020-05-23T03:54:40+00:00",
        "sunset": "2020-05-23T20:14:25+00:00",
        "solar_noon": "2020-05-23T12:04:33+00:00",
        "day_length": 58785,
        "civil_twilight_begin": "2020-05-23T03:07:36+00:00",
        "civil_twilight_end": "2020-05-23T21:01:29+00:00",
        "nautical_twilight_begin": "2020-05-23T01:56:39+00:00",
        "nautical_twilight_end": "2020-05-23T22:12:27+00:00",
        "astronomical_twilight_begin": "1970-01-01T00:00:01+00:00",
        "astronomical_twilight_end": "1970-01-01T00:00:01+00:00"
    }

    const nonFormat3 = {
        "sunrise": "2020-06-13T03:39:40+00:00",
        "sunset": "2020-06-13T20:38:41+00:00",
        "solar_noon": "2020-06-13T12:09:10+00:00",
        "day_length": 61141,
        "civil_twilight_begin": "2020-06-13T02:47:21+00:00",
        "civil_twilight_end": "2020-06-13T21:31:00+00:00",
        "nautical_twilight_begin": "2020-06-13T01:14:08+00:00",
        "nautical_twilight_end": "2020-06-13T23:04:12+00:00",
        "astronomical_twilight_begin": "1970-01-01T00:00:01+00:00",
        "astronomical_twilight_end": "1970-01-01T00:00:01+00:00"
    }

    test('When passed an empty object, returns an empty object', () => {
        expect(getDarkHours({})).toEqual({});
    });
    test('When passed an object returns an object with different keys', () => {
        const output = getDarkHours(nonFormat)
        expect(output).toHaveProperty('darkHours');
        expect(output).toHaveProperty('darkStart');
        expect(output).toHaveProperty('darkEnd');
    });
    test('Calculates the starting dark hour, rounding to nearest', () => {
        const output = getDarkHours(nonFormat)
        expect(output.darkStart).toEqual(22);
    });
    test('Calculates the ending dark hour, rounding to nearest', () => {
        const output = getDarkHours(nonFormat)
        expect(output.darkEnd).toEqual(9);
    });
    test('Calculates the number of dark hours', () => {
        const output = getDarkHours(nonFormat)
        expect(output.darkHours).toEqual(11);
    });
    test('Returns properties for astronomical twilight also', () => {
        const output = getDarkHours(nonFormat)
        expect(output).toHaveProperty('astroTwiHours')
        expect(output).toHaveProperty('astroTwiStart')
        expect(output).toHaveProperty('astroTwiEnd')
    });
    test('Performs the same calculations for astro twilight as dark hours', () => {
        const output = getDarkHours(nonFormat)
        expect(output.astroTwiHours).toEqual(12);
        expect(output.astroTwiStart).toEqual(21);
        expect(output.astroTwiEnd).toEqual(9);
    });
    test('Returns zero dark hours when there are none', () => {
        const output = getDarkHours(nonFormat2);
        expect(output.darkHours).toEqual(0);
        expect(output.darkStart).toEqual(1);
        expect(output.darkEnd).toEqual(1);
        expect(output.astroTwiHours).toEqual(4);
        expect(output.astroTwiStart).toEqual(23);
        expect(output.astroTwiEnd).toEqual(3);
    })
    test('Calculates the right ammount of dark hours when beggining at midnight or early morning', () => {
        const output = getDarkHours(nonFormat3)
        expect(output.darkHours).toEqual(0);
        expect(output.darkStart).toEqual(1);
        expect(output.darkEnd).toEqual(1);
        expect(output.astroTwiHours).toEqual(2);
        expect(output.astroTwiStart).toEqual(0);
        expect(output.astroTwiEnd).toEqual(2);
    })
});

describe('getCloudData', () => {

    const start = 1
    const hours = 1

    const start2 = 23
    const hours2 = 3

    const start3 = 21
    const hours3 = 6

    test('Returns a number', () => {
        expect(typeof (getCloudData(start, hours, weatherbit))).toBe('number');
    })
    test('When one hour of darkness returns the cloud cover for that hour', () => {
        expect(getCloudData(start, hours, weatherbit)).toBe(12);
    })
    test('When more than one hour returns the average cloud cover of those hours', () => {
        expect(getCloudData(start2, hours2, weatherbit)).toBe(45);
    })
    test('Works for longer time periods', () => {
        expect(getCloudData(start3, hours3, weatherbit)).toBe(46);
    })
});

describe('calculateIfDarkAlready', () => {
    const input1 = {
        'darkHours': 4,
        'darkStart': 22,
        'darkEnd': 2,
        'astroTwiHours': 6,
        'astroTwiStart': 21,
        'astroTwiEnd': 3,
    }

    const input2 = {
        'darkHours': 0,
        'darkStart': 1,
        'darkEnd': 1,
        'astroTwiHours': 2,
        'astroTwiStart': 0,
        'astroTwiEnd': 2,
    }

    const input3 = {
        'darkHours': 1,
        'darkStart': 1,
        'darkEnd': 2,
        'astroTwiHours': 3,
        'astroTwiStart': 0,
        'astroTwiEnd': 3,
    }

    test('Returns a boolean that defaults to false', () => {
        expect(typeof (calculateIfDarkAlready(input1, input2))).toBe('boolean');
    });
    test('Returns false if current time is before dark hours', () => {
        expect(calculateIfDarkAlready(input1, 15)).toBe(false);
        expect(calculateIfDarkAlready(input2, 0)).toBe(false);
    });
    test('Returns false if current time is before dark hours that start in the early morning', () => {
        expect(calculateIfDarkAlready(input2, 15)).toBe(false);
    });
    test('Returns false if current time is within the same hour as the start of darkness', () => {
        expect(calculateIfDarkAlready(input2, 1)).toBe(false);
    });
    test('Returns true if current time is after beginning of dark hours', () => {
        expect(calculateIfDarkAlready(input1, 23)).toBe(true);
    });
    test('Returns true if current time is after beginning of dark hours that start in the early morning', () => {
        expect(calculateIfDarkAlready(input3, 2)).toBe(true);
    });
    test('Takes minutes into account as API updates every 10 mins. Returns false if dark start hour equals time now hour and minutes are less than 50', () => {
        expect(calculateIfDarkAlready(input3, 1, 30)).toBe(false);
    });
    test('Returns false if dark start hour equals time now hour and minutes >= 50', () => {
        expect(calculateIfDarkAlready(input3, 1, 55)).toBe(true);
    });
})


