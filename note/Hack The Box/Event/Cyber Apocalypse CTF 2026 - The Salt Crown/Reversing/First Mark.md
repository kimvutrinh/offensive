```python
carry = 0
a2 = 0xA5 # state OK
s0 = a0 = 0x80000000
s2, s3, s4 = ..., ..., 0x20000214 # addr
for s1 in range(0, 16): # round
	a1 = (*(*ubyte)(s2 + s1)) & 0b111
	f7 0000000 a1 01011 a0 01010 f3 000 a0 01010 op 0001011
	a1 = (*(*byte)(s3 + s1))
	f7 0000000 a1 01011 a0 01010 f3 001 a0 01010 op 0001011
	
	f7 0000000 a2 01100 a0 01010 f3 000 a0 01010 op 0101011
	a0 = a0 ^ a2 ^ carry # out OK
	carry = old_a0 & state
	a2 = a0 # state OK
	
	f7 0000001 a3 01101 a0 01010 f3 000 x0 00000 op 0101011
```