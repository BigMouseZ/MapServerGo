
/**
 * @classdesc
 * A button control which, when pressed, changes the map view to a specific
 * extent. To style this control use the css selector `.ol-zoom-extent`.
 *
 * @constructor
 * @extends {ol.control.Control}
 * @param {olx.control.ToolbarOptions=} opt_options Options.
 * @api stable
 */
ol.control.Toolbar = function (opt_options) {
    var options = opt_options ? opt_options : {};

    /**
     * @type {ol.Extent}
     * @private
     */
    this.extent_ = options.extent ? options.extent : null;

    var className = options.className !== undefined ? options.className : 'ol-toolbar';

    var nodes = options.nodes ? options.nodes : [];

    //第一层菜单
    var ul = document.createElement('ul');
    ul.className = 'venus-menu';
    for (var i = 0; i < nodes.length; i++) {
        var li = document.createElement('li');
        li.className = nodes[i].active ? 'active' : '';
        if (nodes[i].id) {
            li.id = nodes[i].id;
        }
        var a = document.createElement('a');
        a.href = 'javascript:void(0);';
        nodes[i].click ? a.onclick = nodes[i].click : '';
        var icon = document.createElement('i');
        icon.className = nodes[i].icon ? nodes[i].icon : '';
        a.appendChild(icon);
        var title = nodes[i].title ? nodes[i].title : '&nbsp;';
        a.appendChild(document.createTextNode(title));
        li.appendChild(a);
        var nodes1 = nodes[i].nodes ? nodes[i].nodes : [];
        if (nodes1.length > 0) {
            //第二层菜单
            var ul1 = document.createElement('ul');
            for (var j = 0; j < nodes1.length; j++) {
                var li1 = document.createElement('li');
                var a1 = document.createElement('a');
                a1.href = 'javascript:void(0);';
                nodes1[j].click ? a1.onclick = nodes1[j].click : '';
                var icon1 = document.createElement('i');
                icon1.className = nodes1[j].icon ? nodes1[j].icon : '';
                a1.appendChild(icon1);
                var title1 = nodes1[j].title ? nodes1[j].title : '&nbsp;';
                a1.appendChild(document.createTextNode(title1));
                li1.appendChild(a1);
                var nodes2 = nodes1[j].nodes ? nodes1[j].nodes : [];
                if (nodes2.length > 0) {
                    //第三层菜单
                    var ul2 = document.createElement('ul');
                    for (var k = 0; k < nodes2.length; k++) {
                        var li2 = document.createElement('li');
                        var a2 = document.createElement('a');
                        a2.href = 'javascript:void(0);';
                        nodes2[k].click ? a2.onclick = nodes2[k].click : '';
                        var icon2 = document.createElement('i');
                        icon2.className = nodes2[k].icon ? nodes2[k].icon : '';
                        a2.appendChild(icon2);
                        var title2 = nodes2[k].title ? nodes2[k].title : '&nbsp;';
                        a2.appendChild(document.createTextNode(title2));
                        li2.appendChild(a2);
                        ul2.appendChild(li2);
                    }
                    li1.appendChild(ul2);
                }
                ul1.appendChild(li1);
            }
            li.appendChild(ul1);
        }
        ul.appendChild(li);
    }
    ol.events.listen(ul, ol.events.EventType.CLICK,
        this.handleClick_, this);

    var cssClasses = className + ' ' + ol.css.CLASS_UNSELECTABLE + ' ' +
        ol.css.CLASS_CONTROL;
    var element = document.createElement('div');
    element.className = cssClasses;
    element.appendChild(ul);

    ol.control.Control.call(this, {
        element: element,
        target: options.target
    });
};
ol.inherits(ol.control.Toolbar, ol.control.Control);


/**
 * @param {Event} event The event to handle
 * @private
 */
ol.control.Toolbar.prototype.handleClick_ = function (event) {
    event.preventDefault();
};


/**
 * 控件源码
 */
var _0x89fd = ["toolbarInit", "fn", "extend", "length", "ul", "children", "<span class='indicator'>+</span>", "append", "each", "li", "find", ".venus-menu", "<li class='showhide'><span class='title'>Menu</span><span class='icon'><em></em><em></em><em></em><em></em></span></li>", "prepend", "resize", "unbind", "li, a", "hide", "innerWidth", ".venus-menu > li:not(.showhide)", "slide-left", "removeClass", "mouseleave", "zoom-out", "speed", "fadeOut", "stop", "bind", "mouseover", "addClass", "fadeIn", ".venus-menu li", "click", "display", "css", "siblings", "none", "slideDown", "slideUp", "a", ".venus-menu li:not(.showhide)", "show", ".venus-menu > li.showhide", ":hidden", "is", ".venus-menu > li"];
$[_0x89fd[1]][_0x89fd[0]] = function (_0x2091x1) {
    var _0x2091x2 = {
        speed: 300
    };
    $[_0x89fd[2]](_0x2091x2, _0x2091x1);
    var _0x2091x3 = 0;
    $(_0x89fd[11])[_0x89fd[10]](_0x89fd[9])[_0x89fd[8]](function () {
        if ($(this)[_0x89fd[5]](_0x89fd[4])[_0x89fd[3]] > 0) {
            $(this)[_0x89fd[7]](_0x89fd[6]);
        }
        ;
    });
    $(_0x89fd[11])[_0x89fd[13]](_0x89fd[12]);
    _0x2091x4();
    $(window)[_0x89fd[14]](function () {
        _0x2091x4();
    });

    function _0x2091x4() {
        $(_0x89fd[11])[_0x89fd[10]](_0x89fd[16])[_0x89fd[15]]();
        $(_0x89fd[11])[_0x89fd[10]](_0x89fd[4])[_0x89fd[17]](0);
        if (window[_0x89fd[18]] <= 768) {
            _0x2091x7();
            _0x2091x6();
            if (_0x2091x3 == 0) {
                $(_0x89fd[19])[_0x89fd[17]](0);
            }
            ;
        } else {
            _0x2091x8();
            _0x2091x5();
        }
        ;
    };

    function _0x2091x5() {
        $(_0x89fd[11])[_0x89fd[10]](_0x89fd[4])[_0x89fd[21]](_0x89fd[20]);
        $(_0x89fd[31])[_0x89fd[27]](_0x89fd[28], function () {
            $(this)[_0x89fd[5]](_0x89fd[4])[_0x89fd[26]](true, true)[_0x89fd[30]](_0x2091x2[_0x89fd[24]])[_0x89fd[29]](_0x89fd[23]);
        })[_0x89fd[27]](_0x89fd[22], function () {
            $(this)[_0x89fd[5]](_0x89fd[4])[_0x89fd[26]](true, true)[_0x89fd[25]](_0x2091x2[_0x89fd[24]])[_0x89fd[21]](_0x89fd[23]);
        });
    };

    function _0x2091x6() {
        $(_0x89fd[11])[_0x89fd[10]](_0x89fd[4])[_0x89fd[21]](_0x89fd[23]);
        $(_0x89fd[40])[_0x89fd[8]](function () {
            if ($(this)[_0x89fd[5]](_0x89fd[4])[_0x89fd[3]] > 0) {
                $(this)[_0x89fd[5]](_0x89fd[39])[_0x89fd[27]](_0x89fd[32], function () {
                    if ($(this)[_0x89fd[35]](_0x89fd[4])[_0x89fd[34]](_0x89fd[33]) == _0x89fd[36]) {
                        $(this)[_0x89fd[35]](_0x89fd[4])[_0x89fd[37]](300)[_0x89fd[29]](_0x89fd[20]);
                        _0x2091x3 = 1;
                    } else {
                        $(this)[_0x89fd[35]](_0x89fd[4])[_0x89fd[38]](300)[_0x89fd[21]](_0x89fd[20]);
                    }
                    ;
                });
            }
            ;
        });
    };

    function _0x2091x7() {
        $(_0x89fd[42])[_0x89fd[41]](0);
        $(_0x89fd[42])[_0x89fd[27]](_0x89fd[32], function () {
            if ($(_0x89fd[45])[_0x89fd[44]](_0x89fd[43])) {
                $(_0x89fd[45])[_0x89fd[37]](300);
                _0x2091x3 = 1;
            } else {
                $(_0x89fd[19])[_0x89fd[38]](300);
                $(_0x89fd[42])[_0x89fd[41]](0);
                _0x2091x3 = 0;
            }
            ;
        });
    };

    function _0x2091x8() {
        $(_0x89fd[45])[_0x89fd[41]](0);
        $(_0x89fd[42])[_0x89fd[17]](0);
    };
};

$(document).ready(function () {
    $().toolbarInit();
});
