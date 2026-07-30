1. **invitationCode**

- **'--'** to **invitationCode**
> The server is error when insert **'** at the end of **invitationCode**. I try randomly to create an account, but don't know why **'--'** bypass the query. Is there any regex that remove last **'** character?

- **%20**, but not **space** or **+**, to **to** parameter
> Somehow, I can only pass **%20**, but not **space** or **+** directly, to **to** parameter, even it's in POST? How crazy it is! I just thought that they did only filter the **+** character :)))

- **1<<(SELECT%201)** 
> Hmp, seem like Blind SQLi?

 *I'm gave up, and searched out for the answer on the Internet. I'm so dump :). Before that I always inject **'--** to **q** parameter, so, I just thought that the server was intentionally send back the 500 packet when encounter any **'** character. Fuck this **)** shit!*

- nginx $\rightarrow$ /etc/nginx/sites-enabled/default $\rightarrow$ answer!