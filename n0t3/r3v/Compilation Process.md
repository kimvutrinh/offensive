## C++ Analyze
```bash
g++ -save-temps -masm=intel -o main main.cpp
```
### Main Stage

{input} .cpp source file = source code + directives
1. **Preprocessing**<sup>[1]</sup>\
{output} .ii preprocessed translation unit = source file\
{rule} process - including header files, macro expansion, and conditional compilation - preprocessor directives!
2. **Compiling**<sup>[2]</sup>\
{output} .s assembler source code file\
{rule}
	1. **Frontend**\
	{output} IR - intermediate representation\
	{rule} verify syntax and semantics through lexical, syntax, and semantic analysis
	2. **Middleend**\
	{output} optimized IR\
	{rule} perform optimizations that are independent of CPU architecture through reachability analysis, constant propagation, relocation of computation, etc.
	3. **Backend**\
	{output} .s target-dependent assembly code\
	{rule} perform optimizations that are specific for the CPU architecture through register allocation, instruction scheduling to keep parallel execution units busy
3. **Assembling**<sup>[3]</sup>\
{output} .o object file = metadata + \[machine code $\in$ object code\]\
{rule} 
	1. object code is usually relocatable, and not usually directly executable. For example, PE in Windows, ELF in Linux, and Mach-O in macOS
	2. assembly language is translated to machine code and the same machine code can be packaged in different object file formats
	3. metadata contains linking or debugging information, such as stack unwinding information
4. **Linking**<sup>[4]</sup>\
{input} .o object files + .a static libraries and additional .so shared libraries\
{output} executable file\
{rule}
	1. symbol resolution *(static)* - associating each symbol reference with exactly one symbol definition from the symbol tables of its input relocatable object files
	2. section relocation - associating a memory location with each symbol definition, and then modifying all of the references to those symbols so that they point to this memory location
	3. static libraries contribute their code to the output and shared libraries generally contribute symbol or dependency information
5. **Executing**\
{rule} dynamic loading - the kernel finds the path to the program interpreter, specified in the ELF's PT_INTERP segment, usually the dynamic linker, then loads and runs the linker before passing control to main application!
### Alternative Stage
##### 4.1. Statically linked library<sup>[5]</sup>
{output} .a indexed **archive**\
{rule} collection of object files, usually comes in the form of `ar` archive files, augmented with a symbol table that accelerates the search for the needed file(s)

##### 4.2. Dynamically linked library<sup>[6]</sup>
{output} .dll dynamic link library in Windows, .so shared object in Linux, or .dylib in macOS
{rule} dynamic libraries and executables usually have the same format, so only one loader is needed, and an executable can be used as a shared library

---


[1]: [Translation unit](https://en.wikipedia.org/wiki/Translation_unit_\(programming\))\
[2]: [Compiler](https://en.wikipedia.org/wiki/Compiler)\
[3]: [Object file](https://en.wikipedia.org/wiki/Object_file)\
[4]: [Linking](https://csapp.cs.cmu.edu/2e/ch7-preview.pdf)\
[5]: [Static library](https://en.wikipedia.org/wiki/Static_library)\
[6]: [Dynamic library](https://en.wikipedia.org/wiki/Dynamic_library)

<div style="break-after: page;"></div>

## Java Analyze

![[JVM.gif]]

<div style="break-after: page;"></div>

### Main Stage

1. **Build**\
{rule} javac compiles your source code into platform-independent bytecode, stored as .class files, JARs, or modules.
2. **Load**\
{rule} the class loader subsystem brings in classes as needed using parent delegation. Bootstrap handles core JDK classes, Platform covers extensions, and System loads your application code.
3. **Link**\
{rule} the verify step checks bytecode safety. Prepare allocates static fields with default values, and Resolve turns symbolic references into direct memory addresses.
4. **Initialize**\
{rule} static variables are assigned their actual values, and static initializer blocks execute. This happens only the first time the class is used.
5. **Memory**\
{rule} Heap and Method Area are shared across threads. The JVM stack, PC register, and native method stack are created per thread. The garbage collector reclaims unused heap memory.
6. **Execute**\
{rule} the interpreter runs bytecode directly. When a method gets called multiple times, the JIT compiler converts it to native machine code and stores it in the code cache. Native calls go through JNI to reach C/C++ libraries.
7. **Run**\
{rule} your program runs on a mix of interpreted and JIT-compiled code. Fast startup, peak performance over time.
