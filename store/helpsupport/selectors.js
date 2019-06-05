/*eslint-disable*/
const orderRelatedCatId = {
  1: true,8: true,10: true, 55: true
}
const computeCategory = (categoryRes) => {
  if(categoryRes){
    const { items } = categoryRes;
    const { columnNames, rows: categories } = items[0];
    const categoriesObj = categories.reduce((acc, c, i) => {
      c[2] && (acc[c[2]] = {...acc[c[2]], child: [...acc[c[2]].child, c[0]]})
      return {
        ...acc, [c[0]]: {name: c[1], id: c[0], hasParent: !!c[2], child:[]}
      }
    }, {});
    return categoriesObj;
  }
  return {}
}

const computeQuestion = (questionRes) => {
  if(questionRes) {
    const { items } = questionRes;
    const { columnNames, rows: questions } = items[0];
    const qObj = questions.reduce((acc, q, i) => ({
      ...acc, 
      ...(!!q[3] 
          ? {[q[3]]: acc[q[3]] ?  {...acc[q[3]], [q[0]]: q} : {[q[0]]: q}}
          : {[q[2]]: acc[q[2]] ?  {...acc[q[2]], [q[0]]: q} : {[q[0]]: q}} 
          )
      }),{});
    return qObj;
  }
  return {}
}

const computeAllIssues = (issueRes) => {
  if(issueRes){
    const { items } = issueRes;
    const { columnNames, rows: issues } = items[0];
    const aObj = issues.reduce((acc, a, i) => ({
      ...acc, 
      [a[0]]: [...a, !!orderRelatedCatId[a[2]]]
      }),{});
    return aObj;
  }
  return {}
}

const computeAnswer = (answerRes) => {
  if(answerRes){
    const { items } = answerRes;
    const { columnNames, rows: answers } = items[0];
    const aObj = answers.reduce((acc, a, i) => ({
      ...acc, 
      [a[0]]: [...a, !!orderRelatedCatId[a[3]]]
      }),{});
    return aObj;
  }
  return {};
}

export default { computeCategory, computeQuestion, computeAnswer, computeAllIssues }