const getDarkHours = (obj) => { 
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

module.exports = { getDarkHours }
