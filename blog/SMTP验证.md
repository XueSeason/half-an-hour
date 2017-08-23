# SMTP 协议进行邮箱验证

验证思路：

1. 找到邮箱所在域名的 SMTP 服务器
1. 连接服务器
1. 询问是否存在邮箱
1. 返回状态码 250 或 251 状态码，邮箱验证通过，500 - 599 验证失败

## 查找 MX 记录

```shell
# Season @ MacBook-Pro in ~ [16:56:52]
$ nslookup
> set q=mx
> gmail.com
Server:		10.0.30.1
Address:	10.0.30.1#53

Non-authoritative answer:
gmail.com	mail exchanger = 30 alt3.gmail-smtp-in.l.google.com.
gmail.com	mail exchanger = 5 gmail-smtp-in.l.google.com.
gmail.com	mail exchanger = 40 alt4.gmail-smtp-in.l.google.com.
gmail.com	mail exchanger = 10 alt1.gmail-smtp-in.l.google.com.
gmail.com	mail exchanger = 20 alt2.gmail-smtp-in.l.google.com.
```

## 建立 TCP 连接

```shell
$ telnet gmail-smtp-in.l.google.com 25
# 或者
$ nc gmail-smtp-in.l.google.com 25
```

## 告知来源服务器

告知发件邮箱服务器

```shell
EHLO example.com
```

## 告知来源邮箱

此处可以伪造，不过邮件服务器可能会进行验证。

```shell
MAIL FROM:<hello@example.com>
```

常见验证方式：

- example.com 是否有 MX 记录
- example.com 是否可以 Ping 通
- 是否存在 postmaster@example.com 这个邮箱
- 发起连接的 IP 地址是否在黑名单之中
- IP 地址的反向 DNS 解析，是否指向一个邮件服务器

## 验证邮箱地址是否存在

```shell
RCPT TO:<test@gmail.com>
```

## 退出连接

```shell
QUIT
```
