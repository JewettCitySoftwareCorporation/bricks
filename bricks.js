/*! Bricks by Taufik Nurrohman <https://github.com/tovic> based on <https://gist.github.com/2208329> */
(function(w, d) {

    // wall, brick(s) margin, wall padding
    w.bricks = function(wall, gap, pad) {
        gap = gap || 0, pad = pad || 0;
        if (typeof wall === "string") {
            wall = d.getElementById(wall);
        }
        function edge(a, b) {
            return Math[b].apply({}, a);
        }
        function class_A(el, c) {
            return el.classList.add(c);
        }
        function class_C(el, c) {
            return el.classList.contains(c);
        }
        var bricks = wall.children,
            c = bricks.length,
            wait = false,
            brick, c_h, c_c, c_t, i, j;
        if (!c) return;
        var width = bricks[0].offsetWidth + gap,
            o = wall.getAttribute('style') || "",
            x = d.createElement('div');
        x.className = wall.className || "";
        x.style.margin = 0;
        x.style.padding = 0;
        x.style.border = 0;
        x.style.outline = 0;
        x.style.width = 'auto';
        x.style.height = 0;
        x.style.float = 'none';
        x.style.display = 'block';
        x.style.clear = 'both';
        x.style.visibility = 'hidden';
        class_A(wall, 'bricks');
        wall.style.padding = 0;
        wall.style.position = 'relative';
        wall.setAttribute('data-style', o);
        function apply(first) {
            if (!first && !class_C(wall, 'bricks-ready')) return;
            wall.parentNode.insertBefore(x, wall.nextElementSibling || wall.nextSibling || null);
            c_h = [];
            c_c = Math.floor(x.offsetWidth / width);
            if (x.parentNode) x.parentNode.removeChild(x);
            for (i = 0; i < c_c; ++i) {
                c_h[i] = 0;
            }
            for (i = 0; i < c; ++i) {
                brick = bricks[i];
                if (first) {
                    o = brick.getAttribute('style') || "";
                    brick.setAttribute('data-style', o);
                    brick.style.float = 'none';
                    brick.style.display = 'block';
                    brick.style.position = 'absolute';
                    brick.style.margin = 0;
                }
                for (j = c_c - 1; j > -1; --j) {
                    if (c_h[j] === edge(c_h, 'min')) {
                        c_t = j;
                    }
                }
                brick.style.top = (c_h[c_t] + pad) + 'px';
                brick.style.left = ((width * c_t) + pad) + 'px';
                c_h[c_t] += brick.offsetHeight + gap;
                if (first) class_A(brick, 'brick-ready');
            }
            wall.style.width = ((width * c_h.length) - gap + (pad * 2)) + 'px';
            wall.style.height = (edge(c_h, 'max') - gap + (pad * 2)) + 'px';
            if (first) class_A(wall, 'bricks-ready');
        } apply(1);
        w.addEventListener("resize", function() {
            if (wait) w.clearTimeout(wait);
            wait = w.setTimeout(apply, 50);
        }, false);
    };

})(window, document);