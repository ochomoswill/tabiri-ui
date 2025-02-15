function numberWithCommas(x) {
  if (x !== undefined) {
    let parts = x.toString().split('.')
    parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ',')
    return parts.join('.')
  }
}

export default {
  numberWithCommas,
}
