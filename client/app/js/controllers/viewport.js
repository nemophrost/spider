goog.provide('spider.controllers.Viewport');

goog.require('goog.events');
goog.require('goog.events.EventHandler');
goog.require('goog.dom');
goog.require('goog.userAgent');
goog.require('goog.math.Coordinate');

/**
 * @param {spider.controllers.App} appController
 *
 * @constructor
 */
spider.controllers.Viewport = function(appController) {
	this.appController = appController;

	this.view = goog.dom.getElementByClass('viewport');

	/**
	 * @type {!Array.<Element>}
	 * @private
	 */
	this._selection = [];

	/** @private */
	this._eventHandler = new goog.events.EventHandler(this);

	/** @private */
	this._lastPointerEvent = null;

	goog.events.listen(
		this.view,
		[goog.events.EventType.TOUCHSTART, goog.events.EventType.MOUSEDOWN],
		this._pointerDown,
		false,
		this
	);
};

/**
 * Whether setCapture is supported by the browser.
 * @type {boolean}
 * @private
 */
spider.controllers.Viewport._HAS_SET_CAPTURE =
	// IE and Gecko after 1.9.3 has setCapture
	// WebKit does not yet: https://bugs.webkit.org/show_bug.cgi?id=27330
	goog.userAgent.IE ||
	goog.userAgent.GECKO && goog.userAgent.isVersion('1.9.3');

/**
 * @param {goog.events.BrowserEvent} e
 * @return {goog.math.Coordinate}
 * @private
 */
spider.controllers.Viewport.prototype._eventToCoord = function(e) {
	return new goog.math.Coordinate(
		e.clientX + this.view.scrollLeft - this.view.offsetLeft,
		e.clientY + this.view.scrollTop - this.view.offsetTop
	);
};

/**
 * @param {goog.events.BrowserEvent} e
 * @private
 */
spider.controllers.Viewport.prototype._pointerDown = function(e) {
	e.preventDefault();

	this._pointerUp(this._lastPointerEvent || e); // Just in case

	this._lastPointerEvent = e;

	this._setupEventHandlers();

	this.appController.activeTool.pointerDown(e, this._eventToCoord(e));
};

/**
 * @param {goog.events.BrowserEvent} e
 * @private
 */
spider.controllers.Viewport.prototype._pointerMove = function(e) {
	this._lastPointerEvent = e;

	this.appController.activeTool.pointerMove(e, this._eventToCoord(e));
};

/**
 * @param {goog.events.BrowserEvent} e
 * @private
 */
spider.controllers.Viewport.prototype._pointerUp = function(e) {
	this._cleanUpAfterPointerUp();

	this._lastPointerEvent = null;

	this.appController.activeTool.pointerUp(e, this._eventToCoord(e));
	
	// Call preventDefault to prevent mouseup from being raised if this is a
	// touchend event.
	if (e.type == goog.events.EventType.TOUCHEND ||
		e.type == goog.events.EventType.TOUCHCANCEL) {
		e.preventDefault();
	}
};

/**
 * @private
 */
spider.controllers.Viewport.prototype._setupEventHandlers = function() {
	var doc = document,
		docEl = doc.documentElement,
		// Use bubbling when we have setCapture since we got reports that IE has
		// problems with the capturing events in combination with setCapture.
		useCapture = !spider.controllers.Viewport._HAS_SET_CAPTURE;

	this._eventHandler.listen(
		doc,
		[goog.events.EventType.TOUCHMOVE, goog.events.EventType.MOUSEMOVE],
		this._pointerMove,
		useCapture
	);

	this._eventHandler.listen(
		doc,
		[goog.events.EventType.TOUCHEND, goog.events.EventType.MOUSEUP],
		this._pointerUp,
		useCapture
	);

	if (spider.controllers.Viewport._HAS_SET_CAPTURE) {
		docEl.setCapture(false);
		this._eventHandler.listen(
			docEl,
			goog.events.EventType.LOSECAPTURE,
			this._pointerUp
		);
	} else {
		// Make sure we stop the dragging if the window loses focus.
		// Don't use capture in this listener because we only want to end the drag
		// if the actual window loses focus. Since blur events do not bubble we use
		// a bubbling listener on the window.
		this._eventHandler.listen(
			goog.dom.getWindow(doc),
			goog.events.EventType.BLUR,
			this._pointerUp
		);
	}
};

/**
 * Unregisters the event handlers that are only active during dragging, and
 * releases mouse capture.
 * @private
 */
spider.controllers.Viewport.prototype._cleanUpAfterPointerUp = function() {
	this._eventHandler.removeAll();
	if (spider.controllers.Viewport._HAS_SET_CAPTURE) {
		document.releaseCapture();
	}
};


/**
 * @return {!Element}
 */
spider.controllers.Viewport.prototype.createElement = function() {
	var ret = goog.dom.createElement(goog.dom.TagName.DIV);
	goog.dom.appendChild(this.view, ret);
	return ret;
};

/**
 * @param {!Array.<Element>} selectedElements
 */
spider.controllers.Viewport.prototype.deselectAll = function() {
	this._selection.forEach(function(el) {
		el.style.boxShadow = '';
	});

	this._selection = [];
};

/**
 * @param {!Array.<Element>} selectedElements
 */
spider.controllers.Viewport.prototype.setSelection = function(selectedElements) {
	this.deselectAll();

	this._selection = selectedElements;

	this._selection.forEach(function(el) {
		el.style.boxShadow = '0 0 3px 0 blue';
	});
};
