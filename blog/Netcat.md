# Netcat 黑客利器

![](http://7xi9q1.com1.z0.glb.clouddn.com/Screen%20Shot%202017-07-06%20at%204.13.31%20PM.png)

## 端口扫描

```bash
nc -z -v -n 10.0.32.76 21-25
```

z 参数，表示不进行数据交互
v 参数，啰嗦模式输出，一般可以去掉
n 参数，不使用 DNS 查询地址
21-25，扫描端口区间

扫描到端口后获取 banner

```bash
$ nc -v 10.0.32.76 22
found 0 associations
found 1 connections:
      1:flags=82<CONNECTED,PREFERRED>
  outif en0
  src 10.0.30.69 port 60965
  dst 10.0.32.76 port 22
  rank info not available
  TCP aux info available

Connection to 10.0.32.76 port 22 [tcp/ssh] succeeded!
SSH-2.0-OpenSSH_7.2p2 Ubuntu-4ubuntu2.1
```

## 简单文本传输

服务端监听 8080 端口：

```bash
nc -l 8080
```

客户端连接：

```bash
nc 10.0.32.76 8080
```

然后可以在双端输入文字进行通信。

## 传输文件

服务端：

```bash
nc -l 8080 > test
```

客户端：

```bash
cat test | nc 10.0.32.76 8080
# or
nc 10.0.32.76 8080 < test
```

此时就能顺利将文件从客户端上传到服务端。

客户端下载服务端文件：

```bash
# server
nc -l 8080 < test
# client
nc 10.0.32.67 8080 > test
```

## 一些常用参数

- `-w 10` 10 秒超时
- `-4` 和 `-6` 采用 IPv4 或者 IPv6 类型地址。
- `-k` 强制保持启动状态
- `-u` 采用 UDP 协议
