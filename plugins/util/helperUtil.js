import _ from 'lodash';

export default {
  parseCent (value) {
    const main = Math.floor(value / 100);
    const min = value % 100;
    return `${main}.${_.padStart(min, 2, 0)}`;
  },
};
