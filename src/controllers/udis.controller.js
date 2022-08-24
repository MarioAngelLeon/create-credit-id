const { request, response } = require('express');
const { UDIService } = require('../services/banxico.service');
const { getDayFromMoment, dateIntervals, formatData } = require('../helpers');
const UDI = require('../models/udi.model');

const udisCreate = async ( req = request, res = response) =>{
    try{

        const day = getDayFromMoment();

        if( day !== 24 && day !== 10 ){
            return res.status(200).json({
                msg: 'UDIs are alredy saved on BD',
            })
        }
        
        const { initPeriod, endPeriod } = dateIntervals( day ); 
    
        const response = await UDIService(initPeriod, endPeriod);

        const data = response?.data;
        const { bmx } = data;
        const { series } = bmx;

        const { datos } = series[0];

        const bulkData = formatData( datos );
        const udi = await UDI.bulkCreate( bulkData );

        console.log(udi);

        res.status(201).json({
            msg: 'UDIS created succesfully',
        });
        
    }catch(error){
        
        console.error(error);
        res.status(500).json({
            status: 500,
            msg: 'Error con la aplicación, contacte al administrador',
        });
        
    }
}



module.exports = { udisCreate }