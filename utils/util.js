const formatTime = date => {
  const year = date.getFullYear()
  const month = date.getMonth() + 1
  const day = date.getDate()
  const hour = date.getHours()
  const minute = date.getMinutes()
  const second = date.getSeconds()

  return [year, month, day].map(formatNumber).join('/') + ' ' + [hour, minute, second].map(formatNumber).join(':')
}

const formatNumber = n => {
  n = n.toString()
  return n[1] ? n : '0' + n
}

const chunk = (arr, num) => {
  let array = [];
  for (let i = 0; i < Math.ceil(arr.length / num); i++) {
    array.push(arr.slice(i * num, i * num + num))
  }
  return array;
}

module.exports = {
  formatTime: formatTime,
  chunk,
}
