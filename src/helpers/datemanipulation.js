const moment = require('moment');



const getDayFromMoment = () =>{
    
    const date = moment().format('YYYY/MM/DD');

    const splitedDate = date.split('/');
  
    const day = splitedDate[splitedDate.length - 1];

    return day ? parseInt(day) : 0;
}

const dateIntervals = ( day ) =>{
    
    const initPeriod = moment().add(1,'days').format('YYYY-MM-DD');

    let endPeriod;

    if(day === 10){
        endPeriod = moment().add(15, 'days').format('YYYY-MM-DD');
    }else{
        endPeriod = moment().add(1, 'month').set('date', 10).format('YYYY-MM-DD');
    }

    return { initPeriod, endPeriod }
}

module.exports = { getDayFromMoment, dateIntervals }