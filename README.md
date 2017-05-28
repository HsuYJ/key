# key.js
A tiny JavaScript library let you bind function to keyboard.

## About key values
`Key.js` is using the API KeyboardEvent.key to detect which key is pressing/releasing.<br />
See:<br />
* KeyboardEvent.key on [MDN](https://developer.mozilla.org/zh-TW/docs/Web/API/KeyboardEvent/key)<br />
* Key Values on [MDN](https://developer.mozilla.org/en-US/docs/Web/API/KeyboardEvent/key/Key_Values)

## Usage
### Include key.js
Include `key.js` in your web app:

```html
<script src="key.js"></script>
```

### Key.trigger(KEY)
"Trigger" means the moment which the key is pressing down by the user.

```javascript
// bind
Key.trigger('t').do(function(e) {
	
	console.log('t is triggered', e);
});
// unbind
Key.trigger('t').unbind();
```

### Key.hold(KEY)
"Hold" means the time before the pressed key has been released.

```javascript
// bind
Key.hold('h').do(function() {
	
	console.log('h is holding');
});
// unbind
Key.hold('h').unbind();
```

The default value of the interval is one frame.(1000ms / 60, ~17ms)<br />
To change the value of interval, use following method:

```javascript
Key.hold('h').do(function() {
	
	console.log('h is holding');
}).interval(1000); // interval is set to 1000ms
```

### Key.release(KEY)
"Release" means the moment which the pressed key is releasing by the user.

```javascript
// bind
Key.release('r').do(function(e) {
	
	console.log('r is released', e);
});
// unbind
Key.release('r').unbind();
```

### Key.combo(KEY_1[, KEY_2[, ...[, KEY_N]]])

```javascript
// bind
Key.combo('Control', 'q').do(function(e) {
	
	console.log('Control + q combo', e);
});
Key.combo('Control', 'Alt', 'Enter').do(function(e) {
	
	console.log('Control + Alt + Enter combo', e);
});
// unbind
Key.combo('Control', 'q').unbind();
Key.combo('Control', 'Alt', 'Enter').unbind();
```

### Key.isHolding(KEY)

```javascript
Key.isHolding('i'); // return true or false
```
