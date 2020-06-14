export const getDarkHours = (obj) => {
    if (Object.keys(obj).length === 0) return {};

    //True Darkness

    let darkStartNum = new Date(obj.astronomical_twilight_end).getHours()
    const darkStartMins = new Date(obj.astronomical_twilight_end).getMinutes()
    if (darkStartMins >= 30) {
        darkStartNum += 1
    }

    let darkEndNum = new Date(obj.astronomical_twilight_begin).getHours()
    const darkEndMins = new Date(obj.astronomical_twilight_begin).getMinutes()
    if (darkEndMins >= 30) {
        darkEndNum += 1
    }

    let darkHours = darkEndNum - darkStartNum + 24;
    if (darkStartNum === darkEndNum && (darkStartNum > 10 || darkStartNum < 4)) {
        darkHours = 0;
    }
    if (darkHours >= 24) {
        darkHours -= 24
    }

    //astro dark

    let astroStartNum = new Date(obj.nautical_twilight_end).getHours()
    const astroStartMins = new Date(obj.nautical_twilight_end).getMinutes()
    if (astroStartMins >= 30) {
        astroStartNum += 1
    }

    let astroEndNum = new Date(obj.nautical_twilight_begin).getHours()
    const astroEndMins = new Date(obj.nautical_twilight_begin).getMinutes()
    if (astroEndMins >= 30) {
        astroEndNum += 1
    }

    let astroHours = astroEndNum - astroStartNum + 24;
    if (astroStartNum === astroEndNum && (astroStartNum > 10 || astroStartNum < 4)) {
        astroHours = 0;
    }
    if (astroHours >= 24) {
        astroHours -= 24
    }

    const darkTimes = {
        'darkHours': darkHours,
        'darkStart': darkStartNum,
        'darkEnd': darkEndNum,
        'astroTwiHours': astroHours,
        'astroTwiStart': astroStartNum,
        'astroTwiEnd': astroEndNum,
    };
    return darkTimes;
}

export const getCloudData = (start, hours, weatherbit) => {
    if (hours === 0) {
        return null;
    }
    const index = weatherbit.findIndex(time => (new Date(time.timestamp_local).getHours()) === start)
    const darkHoursArray = [...weatherbit].splice(index, hours)

    const numArray = darkHoursArray.map(time => time.clouds)
    const cloudCover = Math.round((numArray.reduce((a, b) => a + b, 0) / hours))

    return cloudCover;
}

export const calculateIfDarkAlready = (darkHours, timeNow, minutes) => {
    if (timeNow < darkHours.darkStart) {
        return false
    } else if (darkHours.darkHours === 0) {
        return false
    } else if (darkHours.darkHours === timeNow && minutes < 50) {
        return false
    } else if (darkHours.darkStart < 5 && timeNow > darkHours.darkEnd) {
        console.log(darkHours.dark)
        return false
    } else {
        return true
    }
}

export const calculateIfAstroDarkAlready = (darkHours, timeNow, minutes) => {
    if (timeNow < darkHours.astroTwiStart) {
        return false
    } else if (darkHours.astroTwiHours === 0) {
        return false
    } else if (darkHours.darkHours === timeNow && minutes < 50) {
        return false
    } else if (darkHours.astroTwiStart < 5 && timeNow > darkHours.astroTwiEnd) {
        return false
    } else {
        return true
    }
}