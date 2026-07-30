> [!question] What are the parameters that can be injected?
> <small>*I have just done the SQLi Fundamentals course, so everything around me is just injection. It’s not a good idea :(.*</small>

> [!question] Is there any SQL injection point?
> <small>*Following the previous thought, I tried to list all parameters and determine whether there was a SQL injection point. Even when I read the source code, I was still trying to inject. I momentarily forgot that they are all parameterized queries, and somehow I eventually figured it out. * <hr style="margin: 0;"></small>
> I can not find one :)

> [!question] What are the types of vulnerabilities that a web application can have? 
> <small>*I realized there were still other APIs in the source code.*<hr style="margin: 0;"></small>
> Maybe, logic?
> [/api/flag]() $\rightarrow$ !session.value
> [/api/gate/enter]() $\rightarrow$ !session.value

> [!question] Is that a server-side cookie, or otherwise, how can I send it to the server?
> <small><hr style="margin: 0;"></small>
> Through the **Cookie** header!

> [!question] Which approach is expected there?
> <small>I mean, I randomly insert “admin” into “session”, and it works? Is that the way to solve the problem, or should I gather the information and search for vulnerabilities like “elysia cookie flaw” to get the blog below?<hr style="margin: 0;"></small>
> [ElysiaJS Cookie Signature Validation Bypass – devansh](https://devansh.bearblog.dev/elysiajs/)

