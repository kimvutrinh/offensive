**Subjects** Computer Architecture and Assembly Language
**Targets** Try not to convert low-level to high-level, like the way we learn a secondary language
## I. Assembly
### 1. General
Symbolic machine code <> Machine shellcode
Mainly work with the CPU and memory
### 2. Compilation Stages
Interpreted language (Python) -> High level language (C) -> Low level language (NASM) -> Machine shellcode (Hex) -> Machine code (Binary)
**How?** Interpreted languages are usually not compiled but are **interpreted** during runtime that **utilize** pre-built libs to run their instructions
### 3. Common
Intel x86 Assembly Language and ARM Assembly Language have different Instruction Set Architectures (ISA)

### 4. Instruction Set Architecture

#### Instructions
**Two types of arithmetic instructions** Only one operand (unary, two operands (binary)
**global \_start** directive directs the code to start executing at **\_start** label
>The following code defines a variable and then defines a **constant** (**equ**) for its length:
>```nasm
>section .data 
>	message db "Hello World!", 0x0a ; Hello World!\n
>	length equ $-message
>```
>The **$** token indicates the **current distance from the beginning** of the current section

**\[\]** which in x86_64 assembly and Intel syntax means **load value at address**
**lea** load a pointer with an offset!
**Conditional instructions** Jcc, CMOVcc, SETcc, whereas, cc is Condition Code
The main advantage of **cmp**, instead of **sub**, is that it does not affect the operands
**TorF?** We can still **ret** after syscall **exit** :V
**enter** and **leave** instructions are used to save and restore the addresses of **rsp** and **rbp**
**extern** imports an external function

> ```nasm
> section .bss 
> 	userInput resb 1
> ```
> **resb 1** to tell nasm to reserve 1 byte of buffer space
> 
##### Flags
1. The Carry Flag **CF**: Indicates whether we have a float
2. The Parity Flag **PF**: Indicates whether a number is **odd** or even
3. The Zero Flag **ZF**: Indicates whether a number is zero
4. The Sign Flag **SF**: Indicates whether a register is negative

#### Registers
**~~T~~orF?** I guess that, the transistors - ~~sources providing electricity~~ - are limit, so the circuit - related to instruction cycle - is expand ~~to use less transistors~~ but it takes more clock cycles 
$\Rightarrow$ Just because CISC reduces the number of instructions, but one instruction can be divided into many operations (more clock cycles)!
**Which?** Used to store operands, addresses, or **instructions** temporarily
**Data registers** Usually for arguments - rax, rbx, rcx, rdx and rdi, rsi (destination and source), additionally with r8, r9, r10
**Pointer registers** rbp (base stack point), rsp (current stack pointer), rip (instruction pointer)
**Sub-registers** rax: qword = ... + (eax: dword = ... + (ax: word = ah: byte + al))
#### Address Endianness
**When?** A little-endian system stores the least-significant byte at the smallest address - **reverse** of the original value! So, if we were to push an address or a string with Assembly, we would have to **push it in reverse**
$\Rightarrow$ It's fine when we put hold string using **db**, but not when using **push hex_value**
Printing string (in gdb) in **stack** is from lower address to higher address - from right to left and from low to high!
## II. Computer Architecture

### 1. Components
Cache memory is usually located within the CPU
The closer a component is the quicker the CPU retrieve the upcoming instructions and data from 
The processor can access and control IO devices using Bus Interfaces

**What?** CPU clock speed
$\Rightarrow$ Define how many of clock cycles happen in one second

#### CPU
CPU = Control Unit (move and control data) + Arithmetic/Logic Unit

#### Instruction Cycle
Fetch -> Decode -> Execute -> Store
### 2. Segments
**Stack** is fixed in size and is specified-ordered memory
**Heap** is hierarchical and random-access memory 
**Data** consists of .data holding variables and .bss - buffer memory - holding unassigned variables
**Text** contains main assembly instructions

**What?** Buffer memory

**How?** We should have 16-bytes (or a multiple of 16) on top of the stack before making a call. How should we know if a segmentation fault occurs because of non-aligned stack, such as printf needs to align extra 8 byte?
$\Rightarrow$ Just search for something like "segmentation fault at **movaps**"! That's it!
### 3. Position-Independent Executables
The memory addresses are used relative to their distance from the instruction pointer **$rip** within the program's own **Virtual RAM**

## III. Debugging
**Process:** Break, Examine, Step, Modify
We can **disable/enable** any breakpoint!
**nexti** is similar to **stepi** but skips functions calls
**How?** Conditional breakpoints
$\Rightarrow$ ... **if** ...
## IV. Others
**Property** x XOR x = 0
**Reference** Intel® 64 and IA-32 Architectures Software Developer’s Manual
### Linux
**echo $?** The previous exit code
**write** needs hex (ascii) string instead of raw number
**Really?** **python's pwntools's ELF**  is more reliable than **objdump** 
```bash
for i in $(objdump -d $1 | grep "^ " | cut -f2); do # cut == cut -d$'\t'
	echo -n $i; # no trailing
done;
```  

## V. Skills Assessment
1. I forget about the code in the stack is actually a shellcode, so I try to decode it immediately to a flag :)))