/* eslint-disable camelcase */
const { Model } = require("objection");

class Location extends Model {
  // Table name is the only required property.
  static get tableName() {
    return "Location";
  }

  static get jsonSchema() {
    return {
      type: "object",

      properties: {
        id: { type: "integer" },
        name: { type: "string" },
        latitude: { type: "number" },
        longitude: { type: "number" }

      }
    };
  }

}

module.exports = Location;
