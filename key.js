var Key = (function() {

	var Triggers = {};
	var Holds = {};
	var Releases = {};
	var HoldingKeys = {};

	function KeyEvent(KEY) {

		this.key = KEY;
		this.act = void 0;
		this.holder[KEY] = this;
	}

	KeyEvent.prototype = {
		constructor: KeyEvent,

		do: function(ACT) {

			this.act = ACT;

			return this;
		},

		unbind: function() {

			this.act = void 0;
			this.holder[this.key] = void 0;
			this.holder = void 0;
		}
	};

	function Trigger(KEY) {

		this.holder = Triggers;
		KeyEvent.call(this, KEY);
	}

	Trigger.prototype = Object.create(KeyEvent.prototype);
	Trigger.prototype.constructor = Trigger;

	function Hold(KEY) {

		this.holder = Holds;
		this.timeInterval = 17; // ms, one frame(1000 / 60, ~17)
		this.isHolding = false;
		KeyEvent.call(this, KEY);
	}

	Hold.prototype = Object.create(KeyEvent.prototype);
	Hold.prototype.constructor = Hold;
	Hold.prototype.interval = function(INTERVAL) {
		// INTERVAL: ms, default value is one frame(1000 / 60, ~17)
		this.timeInterval = INTERVAL;

		return this;
	};

	function Release(KEY) {

		this.holder = Releases;
		KeyEvent.call(this, KEY);
	}

	Release.prototype = Object.create(KeyEvent.prototype);
	Release.prototype.constructor = Release;

	function Main() {

		window.addEventListener('keydown', function(e) {

			var key = e.key;

			if (!HoldingKeys[key]) {
				HoldingKeys[key] = true;

				var trigger = Triggers[key];
				
				if (trigger) {
					trigger.act(e);
				}
			}

			var hold = Holds[key];

			if (hold && !hold.isHolding) {
				var act = hold.act;

				act();
				hold.isHolding = setInterval(act, hold.timeInterval);
			}
		});

		window.addEventListener('keyup', function(e) {

			var key = e.key;

			if (HoldingKeys[key]) {
				HoldingKeys[key] = false;

				var release = Releases[key];

				if (release) {
					release.act(e);
				}
			}

			var hold = Holds[key];

			if (hold && hold.isHolding) {
				clearInterval(hold.isHolding);
				hold.isHolding = void 0;
			}
		});
	}

	window.addEventListener('load', Main);

	var Methods = {

		isHolding: function(KEY) {

			return HoldingKeys[KEY] === true;
		},

		trigger: function(KEY) {

			var trigger = Triggers[KEY];

			if (!trigger) {
				trigger = new Trigger(KEY);
			}

			return trigger;
		},

		hold: function(KEY) {

			var hold = Holds[KEY];

			if (!hold) {
				hold = new Hold(KEY);
			}

			return hold;
		},

		release: function(KEY) {

			var release = Triggers[KEY];

			if (!release) {
				release = new Release(KEY);
			}

			return release;
		}
	};

	return Methods;
})();

Key.trigger('k').do(function(e) {

	console.log('trigger k', Key.isHolding('v'));
});

Key.release('m').do(function(e) {

	console.log('release m');
});

Key.hold('h').do(function() {

	console.log('hold h');
}).interval(1000);