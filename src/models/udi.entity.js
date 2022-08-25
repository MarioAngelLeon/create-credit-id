let EntitySchema = require("typeorm").EntitySchema;

let UdiEntity = new EntitySchema({
  name: "udis",
  columns: {
    id: {
      primary: true,
      type: "int",
      generated: true,
    },
    is_active: {
      type: "boolean",
      default: true,
    },
    createdAt: {
      type: "timestamp",
      createDate: true,
    },
    updatedAt: {
      type: "timestamp",
      updateDate: true,
    },
    dato: {
      type: "varchar",
      nullable: false,
      default: 'N/A',
    },
    date: {
      type: "timestamp",
      nullable: false,
    },
  },
});

module.exports = UdiEntity;