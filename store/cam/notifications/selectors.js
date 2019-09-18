import moment from 'moment-timezone';

const getNotifications = (store) => {
  if (store.notificationsReducer.data && store.notificationsReducer.data.length > 0) {
    const data = store.notificationsReducer.data
    const newData = [];
    data.map((item) => {
      item.time = moment(item.timestamp).tz('Asia/Riyadh').format("HH:MM");
      newData.push(item);
    });
    return newData;
  }
  return [];
}

export { getNotifications };
