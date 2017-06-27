## Keep-Alive

HTTP 协议采用 `请求-应答` 模式，在非 Keep-Alive 下，每个请求都需要新建一个连接，完成之后断开连接。在使用 Keep-Alive 模式下，可以避免重新建立连接带来的性能损失。HTTP 1.1 之后，Keep-Alive 默认开启，是否支持 Keep-Alive 取决于服务端的支持。

开启 Keep-Alive 后，服务器不会自动断开连接，所以无法通过 EOF 来判断数据已经接收完成。

我们通过下面两种方式判断：

### Content-Length

Content-Length 头部代表实体内容的长度，服务器（同样适用于客户端）可以根据这个值来判断数据是否接收完毕。

### Transfer-Encoding

如果服务器通过流的形式，将动态数据源源不断地发送给客户端，服务端就需要使用 `Transfer-Encoding: chunked` 头部来代替 `Content-Length`。
