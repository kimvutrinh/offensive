## I. Executable and Linkable Format (ELF)<sup>[1]</sup>

### I-a) ELF Header
**File Class** e_ident\[EI_CLASS\] = (ELFCLASS32 | ELFCLASS64)\
**Data Encoding** e_ident\[EI_DATA\] = ELFDATA2LSB\
**Processor Identification** e_machine = EM_X86_64

**\#entry of program header table** (e_phnum | sh_info of section header at index 0)\
e_phnum = PN_XNUM $\rightarrow$ sh_info **if e_phnum $\ge$ PN_XNUM else** sh_info = 0 $\rightarrow$ e_phnum\
**Size of program header table** e_phnum * e_phentsize
### I-b) Sections
**$\gt$ 2GB section mark** sh_flags = SHF_X86_64_LARGE (AMD64 Specific Section Header Flag)

![[Special sections.png]]
#### 1) Suggested section ordering
1. .plt .init .fini .text .got .rodata .rodata1 .data .data1 .bss (total size up to 2GB)
2. .lplt .ltext .lgot .lrodata .lrodata1 .ldata .ldata1 .lbss (up to 16EB, for large code model)
#### 2) Symbol Table
1. Optional STT\_GNU\_IFUNC symbol type same as STT\_FUNC except always pointing to a function or piece of executable code which takes no arguments and returns function pointer 
2. If an STT\_GNU\_IFUNC symbol is referred to by a relocation, then evaluation of that relocation is delayed until load-time and the value used in the relocation is the function pointer returned by invocation of the STT\_GNU\_IFUNC symbol
3. STT\_GNU\_IFUNC allows run-time to select between multiple versions of implementations
##### 5.2) Unwind Function Table .eh_frame
1. Consist of subsections, each contains a CIE followed by varying number of FDEs
2. FDE corresponds to explicit or compiler generated function in a compilation unit, i.e. a separate FDE for each contiguous sub-piece in function code that is not one contiguous block, all FDEs can access the CIE that begin their subsection for data
3. For C++ template instantiations, there shall be a separate CIE immediately preceding each FDE corresponding to an instantiation
4. Using EH\_PE encoding - pointer encoding, .eh_frame can be entirely resolved at link time, thus can become part of text segment
5. The existence and size of optional call frame instruction area must be computed based on overall size and offset reached while scanning preceding fields of CIE or PDE
6. Overall size of .eh_frame is given in ELF section header, but number of entries is only determined thru counting!
7. .eh_frame whose format is identical to .debug_frame defined by DWARF with extensions: 
	1. **Position independence** avoid load time relocations for PIC, FDE CIE offset pointer should be stored relative to start of CIE table entry
	2. **Outgoing arguments area delta** using GNU_ARGS_SIZE to maintain size of temporarily allocated outgoing arguments area present on end of stack
	3. **CIE Augmentations** using a PC relative encoding whenever possible and adjusting size according to code model used
###### 5.2.1. Common Information Entry (CIE)

| Field                    | Description                                                                             |
| ------------------------ | --------------------------------------------------------------------------------------- |
| Length                   | Length of the CIE (not including this field)                                            |
| CIE id                   | 0 for .eh_frame (distinguish CIE and FDE)                                               |
| Version                  | 1                                                                                       |
| CIE Augmentation String  | Null-terminated string (e.g., "zR", "zPLR", or "")                                      |
| Code Align Factor        | To be multiplied with "Advance Location" <br>instructions in the Call Frame Intructions |
| Data Align Factor        | To be multiplied with all offsets in Call Frame Instructions                            |
| Ret Address Reg          | "Virtual" register representation of return address                                     |
| CIE Augmentation Section | (Optional) Present if CIE Augmentation String is non empty                              |
| Call Frame Intructions   | (Optional)                                                                              |
**CIE Augmentation Section Content**

| Char | Operands            | Description                                                                                                                                    |
| ---- | ------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------- |
| z    | size                | Length of remainder of Augmentation Section                                                                                                    |
| P    | personality_enc     | Encoding specifier - preferred value is a pc-relative                                                                                          |
|      | personality routine | Encoded pointer to personality routine (actually to the PLT entry for personality routine)                                                     |
| R    | code_enc            | Non-default encoding for code-pointers (FDE's initial_location, address_range and operand for DW_CFA_set_loc) - preferred value is pc-relative |
| L    | lsda_enc            | FDE augmentation bodies may contain LSDA pointer. Its preferred value is pc-relative possibly indirect thru a GOT entry                        |
###### 5.2.2. Frame Descriptor Entry (FDE)

| Field                    | Description                                                                                         |
| ------------------------ | --------------------------------------------------------------------------------------------------- |
| Length                   | Length of the FDE (not including this field)                                                        |
| CIE pointer              | Distance from this field to nearest preceding CIE <br>that can never be 0 (distinguish CIE and FDE) |
| Initial Location         | Reference to corresponded function code                                                             |
| Address Range            | Size of the function code                                                                           |
| FDE Augmentation Section | (Optional) Present if CIE Augmentation String is non empty                                          |
| Call Frame Instructions  | (Optional)                                                                                          |

**Pointer Encoding Specification Byte**

![[Pointer Encoding Specification Byte.png|500]]
## II. TRIVIAL
### II-a) Debug With Arbitrary Record Format
1. DWARF is a specification developed for symbolic, source-level debugging
2. The debugging information format does not favor the design of any compiler or debugger


---

[1]: [System V ABI](https://gitlab.com/x86-psABIs/x86-64-ABI)