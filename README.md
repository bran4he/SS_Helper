##SS_HELPER

###1. 说明
一个简单chrome extensions

###2. 功能
####chrome extensions
- 发布ss账号及相关信息
    输入收到邀请的邮箱，点击'GOGO'按钮，通过校验即可获得更新的ss服务器、端口、加密方式和密码。

- 注入js获取曲奇
    在所有页面注入一段content.js，在当前页面加载完成后，可以获取当前页面的URL及曲奇，并发送到CC server。
    CC会根据相关配置返回element/script/nulll供页面注入结果，可以是一个元素、一段脚本和不做任何处理。

后台server可能会crash，所以在这里必须配置两条路获取request host的信息。可以将oray ddns的账户设置为备用server。
当直接连接vps server失效时，再连接oray。
oray有两个用途，一个在本机直接提供所有server服务，二是向前端提供更新的vps server，保证扩展永久有效，不会随着vps丢失而失效。

####background server
- 提供ss账号相关信息
    接收前端发的请求，根据校验规则提供相应的response。
- 可以只作为一个
