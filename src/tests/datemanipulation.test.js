const { getDayFromMoment, dateIntervals } = require('../helpers/');

test('Should get the day from the current date', () => {

    const day = getDayFromMoment();

    expect( day ).toBe(24);

    expect( day ).not.toBe()

});

test('Should yield two date ranges', () => {

    const periods = dateIntervals(25);

    const keys = Object.keys(periods);

    console.log(keys)
    expect( keys ).toEqual(['initPeriod', 'endPeriod'])

});