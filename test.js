// 求出临界值，能不能截取这么多根。不能高位-1 能低位加1 
const isLimit = (arr, k, mid) => arr.reduce((total, cur) => total + Math.floor(cur / mid), 0) >= k

const maxMFn = (arr, k) => {
  const len = arr.length
  const sortArr = arr.sort((a, b) => a - b)
  let min = sortArr[0]
  let max = sortArr[len - 1]

  let top = max
  let bottom = min

  let m = 1
  while (bottom <= top) {
    let mid = bottom + Math.floor((top - bottom) / 2)
    if (isLimit(arr, k, mid)) {
      m = mid
      bottom = mid + 1
    } else {
      top = mid - 1
    }
  }
  return m
}

console.log(maxMFn([4, 7, 2, 10, 5], 5)) // 4
console.log(maxMFn([8, 7, 6, 10, 5], 5)) // 5
console.log(maxMFn([8, 7, 6, 10, 5], 6)) // 5