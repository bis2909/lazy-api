const ApiError = require('<%= requireHelpersPath %>/api_error');
const { <%= modelName %> } = require('<%= requireModelsPath %>');
const utilsHelper = require('<%= requireHelpersPath %>/utils');

const getList = async query => {
  const {start, count, filter} = query;
  const {limit, offset} = utilsHelper.getPagination(parseInt(start), parseInt(count));
  const filterQuery = _getFilterQuery(filter);

  const data = await <%= modelName %>.findAndCountAll({
    ...(limit && {limit: limit}),
    ...(offset && {offset: offset}),
    where: filterQuery,
    order: [['id', 'DESC']]
  });

  return utilsHelper.getPagingData(data, limit, start);
};

const getDetail = async <%= varId %> => {
  const <%= varDetail %> = await <%= modelName %>.findOne({
    where: {id: <%= varId %>},
  });

  if (!<%= varDetail %>) throw new ApiError('<%= modelName %> not found!', 404);

  return { code: 200, resp: {data: <%= varDetail %>} };
};

const create = async params => {
  await _checkValidParams(params);

  const <%= varDetail %> = await <%= modelName %>.create(params);

  return { code: 200, resp: {data: <%= varDetail %>} };
};

const update = async (<%= varId %>, params) => {
  const <%= varDetail %> = await _get<%= modelName %>(<%= varId %>);
  await _checkValidParams(params);

  await <%= varDetail %>.update(params);

  return { code: 200, resp: {data: <%= varDetail %>} };
};

const destroy = async (<%= varId %>, admin) => {
  const <%= varDetail %> = await _get<%= modelName %>(<%= varId %>);

  await <%= varDetail %>.destroy();

  return { code: 200, resp: {} };
};

// private

const _checkValidParams = async params => {
  // TODO: check validate params
};

const _get<%= modelName %> = async <%= varId %> => {
  const <%= varDetail %> = await <%= modelName %>.findOne({where: {id: <%= varId %>}});

  if (!<%= varDetail %>) throw new ApiError('<%= modelName %> not found!', 404);

  return <%= varDetail %>;
};

const _getFilterQuery = filter => {
  const response = {};

  // Add more filter here

  return response;
};

module.exports = {
  getList,
  getDetail,
  create,
  update,
  destroy
};
