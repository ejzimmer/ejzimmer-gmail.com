const ptv = require('ptv-api');

const client = ptv(process.env.DEV_ID, process.env.KEY);

module.exports.nextTrain = async event => {
  const apis = await client;
	const departures = await apis.Departures.Departures_GetForStopAndRoute({
		stop_id: event.queryStringParameters.stop_id,
		route_id: event.queryStringParameters.route_id,
		route_type: 0
	});

  return {
    statusCode: 200,
    body: departures
  };
};
