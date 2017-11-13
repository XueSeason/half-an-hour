const arr = [5, 1, 2, 0, 3, 4]

function sort (arr) {
  const count = arr.length
  let h = 1
  while (h < count / 3) h = h * 3 + 1 // 1 4 13 40
  while (h >= 1) {
    for (let i = h; i < count; i++) {
      for (let j = i; j > 0 && arr[j - h] > arr[j]; j -= h) {
        const temp = arr[j - h]
        arr[j - h] = arr[j]
        arr[j] = temp
      }
    }
    h = Math.floor(h / 3)
  }
  return arr
}

console.log(sort(arr))
