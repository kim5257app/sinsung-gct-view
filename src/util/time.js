import moment from 'moment';

export default {
  makeDate(timestamp) {
    return timestamp.slice(0, 10);
  },
  makeTime(timestamp) {
    return timestamp.slice(11, 16);
  },
  makeLocalTimestamp(timestamp, format) {
    const utcTime = new Date(timestamp);
    return moment.utc(utcTime).local()
      .format((format != null) ? format : 'YYYY-MM-DDTHH:mm:ss.000Z');
  },
  makeLocalDate(timestamp) {
    return this.makeDate(this.makeLocalTimestamp(timestamp));
  },
  makeLocalTime(timestamp) {
    return this.makeTime(this.makeLocalTimestamp(timestamp));
  },
  makeUTCTimestamp(format) {
    const utcTime = new Date();
    return moment.utc(utcTime)
      .format((format != null) ? format : 'YYYY-MM-DDTHH:mm:ss.000Z');
  },
  makeUTC(time) {
    return moment(time).utc();
  },
  makeCurrentUTC() {
    return moment.utc();
  },
  addTime(time, val, unit) {
    return time.add(val, unit);
  },
};
