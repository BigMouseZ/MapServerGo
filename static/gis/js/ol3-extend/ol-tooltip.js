
/**
 * @classdesc
 * A button control which, when pressed, changes the map view to a specific
 * extent. To style this control use the css selector `.ol-zoom-extent`.
 *
 * @constructor
 * @extends {ol.control.Control}
 * @param {olx.control.TooltipOptions=} opt_options Options.
 * @api stable
 */
ol.control.Tooltip = function (opt_options) {
    var options = opt_options ? opt_options : {};

    /**
     * @type {ol.Extent}
     * @private
     */
    this.extent_ = options.extent ? options.extent : null;

    var tooltipElement = document.createElement('div');
    tooltipElement.className = 'tooltip hidden';

    var tooltipLayer = new ol.Overlay({
        element: tooltipElement,
        offset: [15, 0],
        positioning: 'center-left'
    });

    tooltipLayer.show = function (msg) {
        if (typeof (msg) != 'undefined' && msg != '') {
            tooltipElement.innerHTML = msg;
            tooltipElement.classList.remove('hidden');
        }
    };

    tooltipLayer.hide = function () {
        tooltipElement.innerHTML = '';
        tooltipElement.classList.add('hidden');
    };

    return tooltipLayer;
};

/**
 * @param {Event} event The event to handle
 * @private
 */
ol.control.Tooltip.prototype.handleClick_ = function (event) {
    event.preventDefault();
};




