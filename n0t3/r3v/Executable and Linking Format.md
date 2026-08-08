> [!attention]+ man
> 
> **{scope}** executable files, relocatable object files, core files, and shared objects (**e_type**)
> 
> **{structure}** ELF header || program or section header table\
> ELF header, is always at offset 0, defines offset of header table\
> all data structures follow the **natural** size and alignment guidelines

> [!important]+ keywords
> **{1}** dynamic sections, relocation sections, and symbol tables

> [!tldr]+ API vs. ABI
> **{API}** Application Programming Interface, think of it as a header file in C connecting computers or pieces of software to each other
> 
> **{ABI}** Application Binary Interface, a header file for binary. It defines how parameters are passed to functions (registers or stack), who cleans parameter from the stack (caller or callee), etc.