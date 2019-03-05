/**
 * @module 求一个数组的最小公倍数
 */

function gcd(a, b) {
  const minNum = Math.min(a, b)
  const maxNum = Math.max(a, b)
  if (a === 0 || b === 0) {
    return maxNum
  }
  for (let i = 1; i <= maxNum; i++) {
    let vper = minNum * i
    if (vper % maxNum === 0) {
      return vper
    }
  }
}

export const gcds = (arr) => {
  let onum = 0
  let midNum = 0
  const len = arr.length
  for (let i = 0; i < len; i++) {
    onum = Math.floor(arr[i])
    midNum = gcd(midNum, onum)
  }
  return midNum
}
