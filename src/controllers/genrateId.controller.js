const { request, response } = require("express");
const moment = require("moment");

const { formatDate } = require("../helpers");
const DBConnection = require("../db/DBConnection");
const CreditIdEntity = require("../models/creditId.entity");
const {
  ProductNumbersEnum,
  ConsecutiveContractsEnum,
  DescriptionEnums,
} = require("../helpers/enums");

const readCreditId = async (req = request, res = response) => {
  try {
    const productNumber = req?.params?.productNumber;
    if (!productNumber) {
      return res.status(400).json({
        msg: "No product number provided",
      });
    }

    let resp = await DBConnection.getRepository(CreditIdEntity)
      .createQueryBuilder("crid")
      .where("crid.is_active = :active", { active: true })
      .andWhere("crid.product_number = :product_number", {
        product_number: Number(productNumber),
      })
      .getOne();

    if (!resp) {
      return res.status(404).json({
        msg: "Credit Id does not found",
      });
    }

    res.status(200).json({
      msg: "Id read",
      product_number: resp?.product_number,
      credit_id: resp?.consecutive_contract,
      description: resp?.description,
    });
  } catch (error) {
    console.error("Error in udis.controller.js file in udisGet ", error);
    res.status(500).json({
      status: 500,
      msg: "Error con la aplicación, contacte al administrador",
    });
  }
};

const takeCreditId = async (req = request, res = response) => {
  try {
    const productNumber = req?.params?.productNumber;
    if (!productNumber) {
      return res.status(400).json({
        msg: "No product number provided",
      });
    }

    let resp = await DBConnection.getRepository(CreditIdEntity)
      .createQueryBuilder("crid")
      .where("crid.is_active = :active", { active: true })
      .andWhere("crid.product_number = :product_number", {
        product_number: Number(productNumber),
      })
      .getOne();

    if (!resp) {
      return res.status(404).json({
        msg: "Credit Id does not found",
      });
    }

    let updatedData = Object.assign(resp, {
      consecutive_contract: resp.consecutive_contract + 1,
    });
    let idSaved = await DBConnection.getRepository(CreditIdEntity).save(
      updatedData
    );

    res.status(200).json({
      msg: "Id taked",
      product_number: idSaved?.product_number,
      credit_id: idSaved?.consecutive_contract,
      description: idSaved?.description,
    });
  } catch (error) {
    console.error("Error in udis.controller.js file in udisGet ", error);
    res.status(500).json({
      status: 500,
      msg: "Error con la aplicación, contacte al administrador",
    });
  }
};

const loadInitialData = async () => {
  try {
    const dataExist = await DBConnection.getRepository(CreditIdEntity).find({});
    if (dataExist.length <= 0) {
      const initialData = [
        {
          id: 0,
          product_number: ProductNumbersEnum.personalCredit,
          consecutive_contract: ConsecutiveContractsEnum.personalCredit,
          description: DescriptionEnums.personalCredit,
          is_active: true,
        },
        {
          id: 0,
          product_number: ProductNumbersEnum.renovationCredit,
          consecutive_contract: ConsecutiveContractsEnum.renovationCredit,
          description: DescriptionEnums.renovationCredit,
          is_active: true,
        },
        {
          id: 0,
          product_number: ProductNumbersEnum.mortgage,
          consecutive_contract: ConsecutiveContractsEnum.mortgage,
          description: DescriptionEnums.mortgage,
          is_active: true,
        },
        {
          id: 0,
          product_number: ProductNumbersEnum.restructures,
          consecutive_contract: ConsecutiveContractsEnum.restructures,
          description: DescriptionEnums.restructures,
          is_active: true,
        },
        {
          id: 0,
          product_number: ProductNumbersEnum.lanave,
          consecutive_contract: ConsecutiveContractsEnum.lanave,
          description: DescriptionEnums.lanave,
          is_active: true,
        },
        {
          id: 0,
          product_number: ProductNumbersEnum.tunave,
          consecutive_contract: ConsecutiveContractsEnum.tunave,
          description: DescriptionEnums.tunave,
          is_active: true,
        },
      ];

      let initialDataCreated =
        DBConnection.getRepository(CreditIdEntity).create(initialData);
      await DBConnection.getRepository(CreditIdEntity).save(initialDataCreated);
      console.log("Los datos iniciales han sido cargados exitosamente.");
    } else {
      console.log("Los datos iniciales ya estan cargados");
    }
  } catch (error) {
    console.log(error);
  }
};

module.exports = { readCreditId, takeCreditId, loadInitialData };
