const { getDarkHours } = require('./utils')

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
});
