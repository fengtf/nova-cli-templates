/**
 * @desc 格式化时间戳
 * @param { Date | number } time
 * @param {string} format 格式默认：YY-MM-DD hh:mm:ss； 可以自定义格式例如：YY-MM-DD、YY/MM/DD hh/mm/ss等
 * @returns { String }
 */
export function formatDate(time: Date | number = new Date(), format?: string) {
  const date = new Date(time);
  const currentFormat = format ? format : 'YY-MM-DD hh:mm:ss';

  const YY = date.getFullYear();
  const MM =
    date.getMonth() + 1 < 10
      ? '0' + (date.getMonth() + 1)
      : date.getMonth() + 1;
  const DD = date.getDate() < 10 ? '0' + date.getDate() : date.getDate();
  const hh = date.getHours() < 10 ? '0' + date.getHours() : date.getHours();
  const mm =
    date.getMinutes() < 10 ? '0' + date.getMinutes() : date.getMinutes();
  const ss =
    date.getSeconds() < 10 ? '0' + date.getSeconds() : date.getSeconds();

  return currentFormat
    .replace('YY', YY.toString())
    .replace('MM', MM.toString())
    .replace('DD', DD.toString())
    .replace('hh', hh.toString())
    .replace('mm', mm.toString())
    .replace('ss', ss.toString());
}
