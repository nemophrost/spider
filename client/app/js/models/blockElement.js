goog.provide('spider.models.BlockElement');

goog.require('spider.models.BaseElement');

goog.require('goog.dom');

/**
 * @constructor
 * @extends {spider.models.BaseElement}
 */
spider.models.BlockElement = function() {
	spider.models.BaseElement.call(this, goog.dom.createElement(goog.dom.TagName.DIV));
};
goog.inherits(spider.models.BlockElement, spider.models.BaseElement);
