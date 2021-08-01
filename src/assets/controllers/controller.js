const <%= servicesName %> = require('<%= requireServicePath %>');

const index = async (req, res) => {
  try {
    const responses = await <%= servicesName %>.getList(req.query);

    return res.status(200).send(responses);
  } catch (error) {
    return res.status(error.statusCode || 422).send({ error: error.message });
  }
};

const detail = async (req, res) => {
  try {
    const { resp, code } = await <%= servicesName %>.getDetail(req.params.<%= varId %>);

    return res.status(code).send(resp);
  } catch (error) {
    return res.status(error.statusCode || 422).send({ error: error.message });
  }
};

const create = async (req, res) => {
  try {
    const { resp, code } = await <%= servicesName %>.create(req.body);

    return res.status(code).send(resp);
  } catch (error) {
    return res.status(error.statusCode || 422).send({ error: error.message });
  }
};

const update = async (req, res) => {
  try {
    const { resp, code } = await <%= servicesName %>.update(req.params.<%= varId %>, req.body);

    return res.status(code).send(resp);
  } catch (error) {
    return res.status(error.statusCode || 422).send({ error: error.message });
  }
};

const destroy = async (req, res) => {
  try {
    const { resp, code } = await <%= servicesName %>.destroy(req.params.<%= varId %>);

    return res.status(code).send(resp);
  } catch (error) {
    return res.status(error.statusCode || 422).send({ error: error.message });
  }
};

module.exports = {
  index,
  detail,
  create,
  update,
  destroy
};
