import moment from 'moment-timezone';

const getMessages = (store) => {
  if (store.messagesReducer.data && store.messagesReducer.data.length > 0) {
    const data = store.messagesReducer.data
    const newData = [];
    data.map((item) => {
      item.time = moment(item.timestamp).tz('Asia/Riyadh').format("HH:MM");
      newData.push(item);
    });
    return newData;

  }
  return [];
}

export { getMessages };
