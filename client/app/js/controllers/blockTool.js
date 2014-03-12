goog.provide('spider.controllers.BlockTool');

goog.require('spider.controllers.Tool');

goog.require('goog.dom.classes');
goog.require('goog.style');

/**
 * @param {spider.controllers.Viewport} viewportController
 * @constructor
 * @implements {spider.controllers.Tool}
 */
spider.controllers.BlockTool = function(viewportController) {
	this.viewportController = viewportController;

	this.handlesPointerMove = false;

	this.newBlockHelper = this.viewportController.createElement();
	goog.style.showElement(this.newBlockHelper);
	goog.dom.classes.set(this.newBlockHelper, 'new-block-helper');
};

/**
 * @inheritDoc
 */
spider.controllers.BlockTool.prototype.pointerDown = function(e, coord) {
	this.anchorCoord = coord;
};

/**
 * @inheritDoc
 */
spider.controllers.BlockTool.prototype.pointerMove = function(e, coord) {};

/**
 * @inheritDoc
 */
spider.controllers.BlockTool.prototype.pointerDrag = function(e, coord) {
	if (!this.anchorCoord)
		return;

	var t,l,w,h;

	if (!this.newBlock && goog.math.Coordinate.squaredDistance(this.anchorCoord, coord) >= 4) {
		this.newBlock = this.viewportController.createElement();
		goog.style.showElement(this.newBlockHelper, true);
	}

	if (this.newBlock) {
		if (coord.x > this.anchorCoord.x) {
			l = this.anchorCoord.x;
		} else {
			l = coord.x;
		}

		if (coord.y > this.anchorCoord.y) {
			t = this.anchorCoord.y;
		} else {
			t = coord.y;
		}

		[this.newBlock, this.newBlockHelper].forEach(function(el) {
			goog.style.setStyle(el, {
				'position': 'absolute',
				'left': l + 'px',
				'width': Math.abs(coord.x - this.anchorCoord.x) + 'px',
				'top': t + 'px',
				'height': Math.abs(coord.y - this.anchorCoord.y) + 'px',
			});
		}, this);
	}
};

/**
 * @inheritDoc
 */
spider.controllers.BlockTool.prototype.pointerUp = function(e, coord) {
	if (this.newBlock) {
		this.newBlock.style.background = 'red';
		this.newBlock = null;
		goog.style.showElement(this.newBlockHelper);
	}
};
