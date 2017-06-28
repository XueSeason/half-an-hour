# File 的一些知识

## 先从 Blob 说起

我们通常这样创建一个 Blob 对象

```javascript
const obj = { color: 'yellow' }
const blob = new Blob([JSON.stringify(obj)], {type: 'application/json'})
```

如果要从 Blob 中提取数据，那么就只能借助 `FileReader`

```javascript
const reader = new FileReader()
reader.addEventListener('loadend', () => {
  console.log(reader.result)
})
reader.readAsArrayBuffer(blob)
```

Blob 对象拥有如下两个属性

- type，文档类型，即 MIME， 通常作为文件上传类型限制的条件使用。
- size，数据大小，单位字节。

Blob 同时存在一个 `slice` 方法，作用就是对 Blob 对象以字节为单位进行分片处理。

`Blob.slice([start[, end[, contentType]]])`，该方法返回一个新的 Blob 对象，这对于大文件上传来说，非常有帮助。`contentType` 用于指定一个新的 MIME，默认为空字符串。

Blob 对象拥有 `loadstart`、`progress`、`abort`、`error`、`load` 和 `loadend` 事件，具体不再赘述。

## File

File 接口是基于 Blob。File 用于提供和文件相关的信息。我们熟悉的 `<input type='file'>` 选择文件后，该元素的 `files` 属性就是一个 `FileList` 对象，内部维护这 `File` 对象集合，或者拖拽事件产生的 `DataTransfer` 对象会附带也会附带 `files` 属性。

除了继承 Blob 的属性外，File 还有如下属性

- lastModified，文件最后修改时间。
- lastModifiedDate，文件最后修改时间的 Date 对象。
- name，文件名。
- webkitRelativePath，文件相关目录的路径，需要 input 元素的 webkitdirectory 属性支持。

## FileReader

`FileReader` 对象用于异步读取本地文件（或者缓冲区）的内容。可以读取 Blob 对象或者 File 对象，并输出指定格式。

操作简单不再赘述，具体实现可以查看文档。
