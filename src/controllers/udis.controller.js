const { request, response } = require("express");
const { formatDate } = require("../helpers");
const UdiEntity = require("../models/udi.entity");
const DBConnection = require("../db/DBConnection");
const moment = require("moment");

const udisGet = async (req = request, res = response) => {
  try {
    const { date } = req?.params;
    let msg = "";

    if (!date) {
      return res.status(400).json({
        msg: "No date provided",
      });
    }

    let resp = await DBConnection.getRepository(UdiEntity)
      .createQueryBuilder("udi")
      .where("udi.is_active = :active", { active: true })
      .andWhere("udi.date = :date", { date: new Date(date) })
      .getOne();

    if (!resp) {
      resp = await DBConnection.getRepository(UdiEntity)
        .createQueryBuilder("udi")
        .where("udi.is_active = :active", { active: true })
        .orderBy("udi.date", "DESC")
        .getOne();
    }

    let foundDate = moment(new Date(resp?.date));
    let searchDate = moment(new Date(date));

    if (foundDate.isSame(searchDate)) {
      msg = "Udi por fecha encontrada exitosamente";
    } else if (foundDate < searchDate) {
      msg = "Udi por fecha más cercana";
    } else if (foundDate > searchDate) {
      return res.status(404).json({
        msg: "No se encontro el valor para la fecha solicitada",
      });
    }

    if (!resp) {
      return res.status(404).json({
        msg: "Las UDIs no han sido cargadas",
      });
    }

    res.status(200).json({
      msg,
      fecha: formatDate(resp?.date),
      dato: resp?.dato,
    });
  } catch (e) {
    console.error("Error in udis.controller.js file in udisGet ", e);
    res.status(500).json({
      status: 500,
      msg: "Error con la aplicación, contacte al administrador",
    });
  }
};

module.exports = { udisGet };