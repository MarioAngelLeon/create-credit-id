let EntitySchema = require("typeorm").EntitySchema;

let CreditIdEntity = new EntitySchema({
  name: "credit_id",
  columns: {
    id: {
      primary: true,
      type: "int",
      generated: true,
    },
    product_number: {
      type: "int",
      nullable: false
    },
    consecutive_contract: {
      type: "int",
      nullable: false,
    },
    description: {
      type: "varchar",
      nullable: false,
      default: "",
    },
    is_active: {
      type: "boolean",
      default: true,
    },
    created_at: {
      type: "timestamp",
      createDate: true,
    },
    updated_at: {
      type: "timestamp",
      updateDate: true,
    },
  },
});

module.exports = CreditIdEntity;
