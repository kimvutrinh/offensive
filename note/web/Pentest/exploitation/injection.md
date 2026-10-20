#target user-controlled input 
#strategy misinterpret as part of the query or code
#way2follow (i) #detect - what is the (whole) *command*? (ii) #analyze - which set of *alternative* patterns can we use instead of the input, the portion of input, or the character, ...
 
## OS Command
### Coarse-grained
1. The new-line character is usually *not blacklisted*, as it may be *needed* in the *payload*  itself
### Fine-grained
1. A set of alternative patterns for a space character? tab character = \${IFS} variable = url encoding character = bash brace expansion = substring environment variable = shifting character. Further details: [PayloadsAllTheThings/Command Injection](https://github.com/swisskyrepo/PayloadsAllTheThings/tree/master/Command%20Injection#bypass-without-space)
2. Automation: [Bashfuscator](https://github.com/Bashfuscator/Bashfuscator)
## SQL
1. The operation precedence can define different types of attack. Further details:  [PayloadsAllTheThings/SQL Injection](https://github.com/swisskyrepo/PayloadsAllTheThings/tree/master/SQL%20Injection#authentication-bypass) and [Default Web Root Directory](https://github.com/danielmiessler/SecLists/blob/master/Discovery/Web-Content/default-web-root-directory-linux.txt)