goog.provide('spider.util.ThreadMemoizer');

/**
 * @param {Function} method
 */
spider.util.ThreadMemoizer = function(method) {
	var dirty = true,
		key;

	return function() {
		if (!this._threadMemoizerCache) {
			this._threadMemoizerCache = [];
		}

		if (key === undefined) {
			key = this._threadMemoizerCache.length;
		}

		if (dirty) {
			this._threadMemoizerCache[key] = method.apply(this, arguments);
			dirty = false;

			setTimeout(function() {
				dirty = true;
			}, 1);
		}
		
		return this._threadMemoizerCache[key];
	};
};