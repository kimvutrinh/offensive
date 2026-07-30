> [!todo]
> <small>*Connect using nc*<hr style="margin: 0;"></small>
> **Input:** G, offsets
> **Target:** KEY
> **Deobfuscator:**
> ```python
> if G == P - 1:
> 	H(x) = P - 1 if x % 2 == 1 else 1
> ```
> ```bash
> {
>	echo 92855921612239152523800219211045373906648753599968095925216152163421845525946
>	for i in {0..255}; do
>		echo 1 
>		echo $i
>	done
>	echo 2
>} | nc 154.57.164.81 31688
> ```
