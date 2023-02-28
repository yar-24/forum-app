/* eslint-disable no-param-reassign */

export const truncate = (string, length, delimiter) => {
  delimiter = delimiter || '&hellip;';
  return string.length > length ? string.substr(0, length) + delimiter : string;
};
