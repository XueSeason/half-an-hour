# HTML5 history API

HTML5 history API 用于管理浏览器历史会话。Web 资源的唯一标识是 URL，在过去我们改变 URL 往往会导致整个页面的刷新，带来巨大的时间成本和服务器资源成本。HTML5 提供了操作 history 的能力，当资源发生变动时，我们可以改变浏览器地址栏里的 URL，无须让整个页面刷新。

[浏览器支持情况](https://caniuse.com/#search=history)

传统的基于 hash 的路由，虽然没有兼容性问题，但是 IE7 以下不支持 onhashchange，需要设置定时器不断检查 hash 值的改变，看上去不是十分优雅。
