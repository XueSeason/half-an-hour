const arr = [5, 1, 2, 0, 3, 4]

function sort (arr) {
  for (let i = 0; i < arr.length; i++) {
    let min = i
    // 选出最小值的下标
    for (let j = i + 1; j < arr.length; j++) {
      if (arr[j] < arr[min]) min = j
    }
    // 交换位置
    const temp = arr[i]
    arr[i] = arr[min]
    arr[min] = temp
  }
  return arr
}

console.log(sort(arr))
