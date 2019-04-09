/*eslint-disable*/

const computeCategory = (categoryRes) => {
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

const computeQuestion = (questionRes) => {
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

const computeAnswer = (answerRes) => {
  const { items } = answerRes;
  const { columnNames, rows: answers } = items[0];
  const aObj = answers.reduce((acc, a, i) => ({
    ...acc, 
    [a[0]]: a
    }),{});
  return aObj;
}

export default { computeCategory, computeQuestion, computeAnswer }