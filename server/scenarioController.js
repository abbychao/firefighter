const ScenarioModel = require('../database/scenarioModel.js');

const scenarioController = {};

scenarioController.create = async (req, res) => {
  const {
    building, buildingDetails, position, due,
  } = req.body;
  const data = {
    building,
    buildingDetails,
    position,
    due,
    first: null,
    last: null,
  };
  const scenarioId = await ScenarioModel.createScenario(data);
  return res.status(200).send(scenarioId);
};

scenarioController.getAll = async (req, res) => {
  const scenarios = await ScenarioModel.getAll();
  return res.status(200).send(scenarios);
};

module.exports = scenarioController;
