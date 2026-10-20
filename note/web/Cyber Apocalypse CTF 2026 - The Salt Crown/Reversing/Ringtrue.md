> [!todo] Analyzing the format of ELF
> <small><hr style="margin: 0;"></small>
> **objdump -d ringtrue**: oh, it can! And this is elf file 
> **readelf -p .rodata ringtrue**: Is \[ ...number \] the offset, if true why first is 7, and why it not show same thing as the actual text? It's ANSI escape code for linux so it doesn't recognize from offset 0.
> **objdump -d -j .text ringtrue**: How .text can ref to a value of .rodata? Just using **grep section+string offset**
> Converting to c++ but it so consumming! Try to use gdb SIGINT+backtrace!
```asm
input: 11 12 13 14 15 16 17 18
main+1398: fgets
main+1403: test %rax,%rax
| main+3073 <- (fgets <- EOF or %rax = 0)
| main+1412 <- otherwise
	main+1500: sscanf
	main+1509: cmp $0x8,%eax
	| main+3046 <- not 8 numbers
	| main+1518 <- otherwise
		... do something with 8 numbers
		main+1796: test %ebx,%ebx
		| main+1804 <- %ebx=0
		| main+702  <- otherwise 

563->1322
---------
767->2990
837/850->775->2937
813->2966
915->1071->920
1294->1830
---------
1406->3073
1512->3046->1322
1798->702
1825->580
---------
1874->2689
2680->1904
2984->852
3041->819


| main+2677
	| main+1904
	| main+2686 <- 3860.rodata
```