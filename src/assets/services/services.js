const {Op} = require("sequelize");
const ApiError = require('@eys/helpers/api_error');
const { SurveyCategory, AnswerRule, Answer, Question } = require('@eys/models');
const utilsHelper = require('@eys/helpers/utils');

const getList = async query => {
  const {start, count, filter} = query;
  const {limit, offset} = utilsHelper.getPagination(parseInt(start), parseInt(count));
  const filterQuery = _getFilterQuery(filter);

  const data = await AnswerRule.findAndCountAll({
    ...(limit && {limit: limit}),
    ...(offset && {offset: offset}),
    where: filterQuery,
    order: [['id', 'DESC']]
  });

  return utilsHelper.getPagingData(data, limit, start);
};

const getDetail = async answerRuleId => {
  const answerRule = await AnswerRule.findOne({
    where: {id: answerRuleId, soft_delete: false},
  });

  if (!answerRule) throw new ApiError('Answer Rule not found!', 404);

  return { code: 200, resp: {data: answerRule} };
};

const create = async params => {
  await _checkValidParams(params);

  const answerRule = await AnswerRule.create(params);

  return { code: 200, resp: {data: answerRule} };
};

const update = async (answerRuleId, params) => {
  const answerRule = await _getAnswerRule(answerRuleId);
  await _checkValidParams(params);

  await answerRule.update(params);

  return { code: 200, resp: {data: answerRule} };
};

const destroy = async (answerRuleId, admin) => {
  const answerRule = await _getAnswerRule(answerRuleId);

  await answerRule.update({soft_delete: true, updated_by_id: admin.id});

  return { code: 200, resp: {} };
};

// private

const _checkValidParams = async params => {
  const {survey_category_id, answer_id, question_id} = params;
  const surveyCategory = await SurveyCategory.findOne({where: {id: survey_category_id, soft_delete: false}});
  const question = await Question.findOne({where: {id: question_id, soft_delete: false}});

  if (!surveyCategory) throw new ApiError('Survey Category not found!', 422);
  if (!question) throw new ApiError('Question not found!', 422);

  const answer = await Answer.findOne({
    where: {id: answer_id, soft_delete: false},
    include: [{
      model: Question,
      as: 'question'
    }]
  });

  if (!answer) throw new ApiError(`Answer ${answer_id} not found!`, 422);
  if (answer.question.survey_category_id !== parseInt(survey_category_id)) throw new ApiError(`Answer not found`, 422);
  if (answer.question.id === parseInt(question_id)) throw new ApiError(`Cannot select same question!`, 422);
};

const _getAnswerRule = async answerRuleId => {
  const answerRule = await AnswerRule.findOne({where: {id: answerRuleId, soft_delete: false}});

  if (!answerRule) throw new ApiError('Answer Rule not found!', 404);

  return answerRule;
};

const _getFilterQuery = filter => {
  const response = {soft_delete: false};

  if (filter) {
    const {survey_category_id} = filter;

    if (survey_category_id) {
      response.survey_category_id = { [Op.in]: survey_category_id.split(',') };
    }
  }

  return response;
};

module.exports = {
  getList,
  getDetail,
  create,
  update,
  destroy
};
