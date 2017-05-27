# key.js
A tiny JavaScript library let you bind function to keyboard.

## About key values
Key.js is using the API KeyboardEvent.key to detect which key is pressing/releasing.<br />
See:<br />
KeyboardEvent.key on [MDN](https://developer.mozilla.org/zh-TW/docs/Web/API/KeyboardEvent/key)<br />
Key Values on [MDN](https://developer.mozilla.org/en-US/docs/Web/API/KeyboardEvent/key/Key_Values)

## Usage
### Include key.js
Include `key.js` in your web app:

```html
<script src="key.js"></script>
```

### Key.trigger(KEY)
"Trigger" means the moment which the key is pressing down by the user.

```javascript
Key.trigger('t').do(function(e) {
	
	console.log('t is triggered', e);
});
```

### Key.hold(KEY)
"Hold" means the time before the pressed key has been released.

```javascript
Key.hold('h').do(function() {
	
	console.log('h is holding');
});
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
Key.release('r').do(function(e) {
	
	console.log('r is released', e);
});
```

### Key.unbind(KEY)

```javascript
Key.unbind('t');
```

### Key.isHolding(KEY)

```javascript
Key.isHolding('i'); // return true or false
```
