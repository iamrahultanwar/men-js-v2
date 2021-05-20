const loadModels = (ctx) => {
  const { Database } = ctx.container;
  const Models = () => {
    let models = new Map();
    const modelsList = ctx.container.Locations.get("models").all();
    modelsList.forEach(function (filePath) {
      const Locations = ctx.container.Locations;
      const modelName = filePath.split("/").pop().toString().replace(".js", "");
      const json = require(Locations.get("mappings").get(modelName));
      const schemaJson = Object.assign({}, JSON.parse(JSON.stringify(json)));
      const modelSchema = require(filePath)(
        new Database.Schema(sanitizeModelData(schemaJson, Database), {
          timestamps: true,
        })
      );
      models.set(modelName, new Database.model(modelName, modelSchema));
    });
    return models;
  };

  const sanitizeModelData = (json) => {
    const returnJson = { ...json };
    Object.keys(returnJson).forEach((key) => {
      returnJson[key] = _parseSchemaJson(key, returnJson[key]);
    });
    return returnJson;
  };

  const _parseSchemaJson = (key, value) => {
    let returnData = _typeHandler(value.type);

    if (value.type === "Ref") {
      returnData = _refTypeHandler(returnData, value);
    }
    return returnData;
  };

  const _refTypeHandler = (returnData, { ref, relationship }) => {
    returnData = { ...returnData, ref: ref };
    return relationship === "hasOne" ? returnData : [returnData];
  };
  const _typeHandler = (type) => {
    switch (type) {
      case "String":
        return { type: Database.Schema.Types.String };
      case "Boolean":
        return { type: Database.Schema.Types.Boolean };
      case "Number":
        return { type: Database.Schema.Types.Number };
      case "Date":
        return { type: Database.Schema.Types.Date };
      case "Array":
        return { type: Database.Schema.Types.Array };
      case "Mixed":
        return { type: Database.Schema.Types.Mixed };
      case "Decimal":
        return { type: Database.Schema.Types.Decimal128 };
      case "Map":
        return { type: Database.Schema.Types.Map };
      case "Ref":
        return { type: Database.Schema.Types.ObjectId };

      default:
        throw new Error(
          `Unable to determine data type of given argument : ${type}`
        );
    }
  };

  ctx.provider("Models", function () {
    this.$get = function (container) {
      return Models();
    };
  });
};

module.exports = function (c) {
  loadModels(c);
};
