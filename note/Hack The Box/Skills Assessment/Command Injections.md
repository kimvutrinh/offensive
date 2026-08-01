1. **quickView**

- Both values, 1.0 and 1, have the same result but not for 1.1 and 1	
	```php
	if ($quickView == 1)
	```

- What exactly is the regex (if filtering)?
	```php
	preg_match('/([0-9]+)/', $quickView, $sanitizedQuickView);
	if ($sanitizedQuickView[0] == 1)
	```

- Usage
	```php
	$file = fopen($path)
	```

2. **view** or **dl** or **from**

- Nothing useful there

3. **to**

- Allow tmp/.. and ../../tmp but not tmp/../tmp?

*I'm stuck! Almost a whole day, and I still don't know where the injection point is. With a big help from the Internet ("try all icons"), I figured it out.* **So, the key point is information gathering before doing any fucking thing.**