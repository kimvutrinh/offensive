> [!question] Which tools are used for reversing .mpy files?
> <small>*Further information: [DEF CON 32 - Reverse Engineering MicroPython Frozen Modules - Wesley McGrew](https://youtu.be/QXa29AJqdRc?si=E7t51nBg1PaW53g_)*<hr style="margin: 0;"></small>
> [micropython/mpy-tool.py](https://github.com/micropython/micropython/blob/master/tools/mpy-tool.py)

> [!todo] Reversing
> <small>*Further information: [dis — Disassembler for Python bytecode](https://docs.python.org/3/library/dis.html)*<hr style="margin: 0;"></small>
> ```asm
> simple_name: judge
  raw bytecode: ...
  prelude: ...
  >
  args: ['syllable']
  $0 = "syllable"
  >
  line info: ...
  >
  23:00       LOAD_CONST_OBJ (57, 129, 154, 31, 199, 192, 
>               73, 243, 43, 176, 255, 173, 54, 203, 67, 15)
  c1          STORE_FAST 1
  $1 = (57, 129, ...)
  >
  22:80:5a    LOAD_CONST_SMALL_INT 90
  c2          STORE_FAST 2
  $2 = 90
  >
  2b:00       BUILD_LIST 0
  c3          STORE_FAST 3
  $3 = []
  >
  12:05       LOAD_GLOBAL len
  b0          LOAD_FAST 0
  34:01       CALL_FUNCTION 1
  $stack = [len ($0)]
  >
  80          LOAD_CONST_SMALL_INT 0
  $stack = [len ($0), 0]
  >
  42:6b       JUMP 43
  >
  57          DUP_TOP
  $stack = [len ($0), 0, 0]
  >
  c4          STORE_FAST 4
  $4 = 0
  $stack = [len($0), 0]
  >
  12:06       LOAD_GLOBAL ord
  b0          LOAD_FAST 0
  b4          LOAD_FAST 4
  55          LOAD_SUBSCR
  34:01       CALL_FUNCTION 1
  $stack = [len($0), 0, ord($0[$4])]
  >
  b2          LOAD_FAST 2
  ee          BINARY_OP 23 __xor__
  b4          LOAD_FAST 4
  8d          LOAD_CONST_SMALL_INT 13
  f4          BINARY_OP 29 __mul__
  22:81:7f    LOAD_CONST_SMALL_INT 255
  ef          BINARY_OP 24 __and__
  ee          BINARY_OP 23 __xor__
  $stack = [len($0), 0, (ord($0[$4]) xor $2) xor (($4 mul 13) and 255)]
  >
  c5          STORE_FAST 5
  $5 = (ord($0[$4]) xor $2) xor (($4 mul 13) and 255)
  $stack = [len($0), 0]
  >
  b2          LOAD_FAST 2
  12:06       LOAD_GLOBAL ord
  b0          LOAD_FAST 0
  b4          LOAD_FAST 4
  55          LOAD_SUBSCR
  34:01       CALL_FUNCTION 1
  f2          BINARY_OP 27 __add__
  22:81:7f    LOAD_CONST_SMALL_INT 255
  ef          BINARY_OP 24 __and__
  c2          STORE_FAST 2
  $2 = ($2 + ord($0[$4])) and 255
>
  b3          LOAD_FAST 3
  14:03       LOAD_METHOD append
  b5          LOAD_FAST 5
  36:01       CALL_METHOD 1
  59          POP_TOP
  $3.append($5)
  $stack = [len($0), 0]
  > 
  81          LOAD_CONST_SMALL_INT 1
  e5          BINARY_OP 14 __iadd__
  58          DUP_TOP_TWO
  5a          ROT_TWO
  $stack = [len($0), 1, 1, len($0)]
  >
  d7          BINARY_OP 0 __lt__
  43:10       POP_JUMP_IF_TRUE -48
  59          POP_TOP
  59          POP_TOP
  >
  b3          LOAD_FAST 3
  12:07       LOAD_GLOBAL list
  b1          LOAD_FAST 1
  34:01       CALL_FUNCTION 1
  d9          BINARY_OP 2 __eq__
  63          RETURN_VALUE
  children: []
> ```

```python
param = 90
flag = "..."
encoded = []
for i in range(len(s)):
	c = (ord(flag[i]) ^ param) ^ ((i * 13) & 255)
	param = (param + ord(flag[i])) & 255
	encoded.append(])
```