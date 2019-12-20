const { Scenario } = require('../database/database.js');
const ScenarioModel = require('../database/scenarioModel');

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
  Scenario.create(data, (err, response) => {
    console.log('response', response._id);
    console.log('err', err);
    if (err) return res.status(500).end(err);
    return res.status(200).send(response);
  });
};

module.exports = scenarioController;
