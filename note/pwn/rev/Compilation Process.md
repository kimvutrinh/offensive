## II. Java Analyze<sup>[7]</sup>

![[JVM.gif]]

<div style="break-after: page;"></div>

### II-a) Main Stage
{input} **.java** source file
1. **Compiling**\
{sample} **.class** files\
{output} platform-independent \[bytecode $\in$ object code\]
2. **Executing**\
{rule} 
	1. **Class loading**\
	{rule} load classes as needed, using parent delegation
	2. **Bytecode verification or linking**\
	{rule} prepare allocates static fields with default values, and resolve symbolic references to their corresponding runtime entities
	3. **Initializing**\
	{rule} assign static fields their initialized values and execute static initialization blocks
	4. **Garbage collection**\
	{rule} reclaim heap memory occupied by objects that are no longer reachable
	5. **Runtime services and JIT compilation**\
	{rule} the interpreter executes JVM bytecode, while the JIT compiler identifies frequently executed ("hot") code and may compile it into native machine code, which can be stored in the code cache. Native calls go through JNI to reach C/C++ libraries
### II-b) Alternative Stage
##### 2.1. Packaging
{sample} **.jar** archives and modules

---

[7]: [How the JVM Works](https://blog.bytebytego.com/p/ep211-how-the-jvm-works)
