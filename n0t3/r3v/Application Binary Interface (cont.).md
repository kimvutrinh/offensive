## I. System V (cont.)
### I-a) ILP32
1. When a value of pointer type is returned or passed in a register, bits 32 to 63 shall be zero
2. ILP32 binaries reside in lower 32 bits of 64-bit virtual address space, conform to small code model or small PIC
3. Kernel should limit stack and addresses returned from system calls between 0 to $2^{32} - 1$
4. Although ILP32 binaries run in 64-bit mode, not all 64-bit instructions are supported. For example, since indirect branch via memory loads a 64-bit address at the memory location, it is not supported in ILP32
5. **.byte 0x66** and **.word 0x6666** are raw encodings of **data16**, operand-size override prefix; rex64 emits a REX prefix that somehow relevance to REX.W
### I-b) Code Sequences without PLT
1. PLT is used to access external functions defined in shared object and support **lazy symbol resolution** - function address is resolved only when it is called first time at run-time and **canonical function address** - PLT entry of external function is used as its address, aka function pointer
2. GOT entry is writable, any address my be written to it at run-time $\Rightarrow$ potential security risk
3. Avoiding PLT using indirect call, i.e. target address is stored dynamically inside a register or a memory address, via GOT slot 
4. After dynamic linker resolved all symbols by updating GOT entries with symbol addresses, GOT can be made read-only $\Rightarrow$ PLT is no longer used to call external function, lazy symbol resolution is disabled and function only be interposed, i.e. replace calls to functions in dynamic libraries with calls to user-defined wrappers, during symbol resolution at startup
5. **Benefit** (i) no extra direct branch to PLT entry but with code-size tradeoff and (ii) custom calling convention - since external function is called directly via GOT slot, instead of invoking dynamic linker to look up function symbol when called first time, parameters can be passed differently from this System V ABI specification
### I-c) Intel CET Extension
1. Intel CET (Control-flow Enforcement Technology) Extension includes: (i) IBT - Indirect Branch Tracking - branch protection to defend against Jump/Call Oriented Programming with the endbr "end branch" instructions acting as the branch target instructions; (ii) SHSTK - Shadow Stack - return address protection to defend against Return Oriented Programming
2. To support IBT, linker should generate a IBT-enabled PLT together with a second PLT. The initial value of GOT entry for external function is address of corresponding second PLT entry
$call\ \rightarrow\ .SPLT\ \rightarrow\ .PLT\ \rightarrow\ GOT[0,1]\ \rightarrow\ Linker\ Dynamic$
### I-d) Linux Convention
1. Library conforming to Intel386 ABI will live in /lib, /usr/lib and /usr/bin, otherwise, for AMD64 library will use lib64 subdirectories, e.g. /lib64 and /usr/lib64 but no /bin64; and library conforming to Intel386 ABI and to AMD64 ABI will share directories like /usr/bin
2. User-level applications use as integer registers for passing sequence %rdi, %rsi, %rdx, %rcx, %r8 and %r9 while kernel interface uses %r10 instead of %rcx; and a system-call is done via syscall, kernel clobbers registers %rcx and %r11 but preserves all other registers except %rax - syscall number and result of system-call ($[-4095, -1]$ for -errno error)
3. System-calls are limited to 6 arguments, no argument is passed directly on stack
4. Only values of class INTEGER or MEMORY are passed to kernel
5. Kernel may align end of input argument area to 8 instead of 16 byte boundary and does not honor red zone, therefore this area is not allowed to be used by kernel code
6. Kernel is not allowed to change x87 and SSE units, otherwise, they have to be restored properly before sleeping or leaving kernel; more precautions may needed on preemptive kernels 
### I-e) Linker Optimization
#### 1) Combine GOTPLT and GOT Slots
**Problem** both PLT (GOTPLT slot) and GOT (GOT slot) references to same function symbol
```cpp
extern void foo(void);
void bar(void) {
	foo();                  // PLT reference
	void (*p)(void) = foo;  // GOT reference
}
```
1. Run-time JUMP_SLOT and GLOB_DAT relocations are created to update, i.e. apply same symbol value to, GOT-PLT and GOT slots respectively that resulted in same virtual address
2. $\Rightarrow$ combine GOTPLT and GOT slots into a single GOT slot, remove JUMP_SLOT and replace regular PLT entry with an GOT PLT entry (with an indirect jump via GOT slot)
3. Not applicable for **pointer equality** and **STT_GNU_IFUNC symbols** (since GOT-PLT slots are resolved to selected implementation and GOT slots are resolved to PLT entries)