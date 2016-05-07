(function(){
    var timeout, output_color = $('.quote-box .output').css('color') || '#000',
        priceMap = {
            'audio-samples': 50.00,
            'video-samples': 100.00,
            'logo-design': 200.00,
            'business-cards': 200.00,
            'sm-banner': 50.00,
            'md-banner': 100.00,
            'lg-banner': 200.00,
            'corporate-materials': 1000.00,
            'single-page': 250.00,
            'dynamic-content': 700.00,
            'photo-gallery': 200.00,
            'seo-management': 500.00,
            'mobile-ready': 500.00,
            'template-discount': -150.00,
            'android-app': 2000.00,
            'ios-app': 2000.00,
            'desktop-app': 2000.00,
        }
        /////////////////////////////////////////////////////////////////////////////
        //    Document Ready Function
        /////////////////////////////////////////////////////////////////////////////
    $(document).ready(function() {
        /////////////////////////////////////////////////////////////////////////////
        //    Begin Our QuoteBuilder
        /////////////////////////////////////////////////////////////////////////////
        OutputPrice(null, 1);
        /////////////////////////////////////////////////////////////////////////////
        //    When a '-checkbox' class changes, toggleHiddenContent();
        /////////////////////////////////////////////////////////////////////////////
        $("input[class*='-checkbox']").on('change', function(e) {
            var target = e.target;
            var selector = target.classList[0].replace('-checkbox', '');
            selector = "." + selector;
            // Handle Toggling div
            toggleHiddenContent(target, selector);
            OutputPrice();

        });
        /////////////////////////////////////////////////////////////////////////////
        //    TEMP: Get Prices Btn - (bind to autosave feature)
        /////////////////////////////////////////////////////////////////////////////
        $('.get-price').eq(0).on('click', OutputPrice);
        $('.input-grouping input').bind('change', OutputPrice);
    });

    function toggleHiddenContent(target, selector) {
        var hiddenInput = $(selector).eq(0).toggle();
    }

    function getPrice() {
        // var list = $('.input-grouping:not(.checkBox)');
        var checked = $('.input-grouping.checkBox').splice(0).reduce(function(arr, el, i, a) {
            // Return jQuery Object
            el = $(el);
            // Define the input we're looking for
            var input = $(el.children()[1]),
                val = parseFloat(input.val());
            // Get Elements First Child's first child.
            var checkbox = $(el.children().first()).children().filter('input').first();
            // Add Our compiled object to an
            arr.push({
                name: input[0].classList[0],
                value: val.round(2),
                checked: checkbox.is(":checked")
            });
            // console.warn(["El", el], ["input", input], ['el.prop.checked?', checkbox.prop('checked')]);
            return arr;
        }, []).filter(function(e) {
            if (e.checked) return e;
        });

        // console.warn("Checked", checked);

        var notChecked = $('.input-grouping:not(.checkBox)').splice(0).reduce(function(arr, el, i, a) {
            // Return jQuery Object
            el = $(el);
            // Define the input we're looking for
            var input = $(el.children()[1]),
                val = parseFloat(input.val()) || 0;
            // Add Our compiled object to an
            arr.push({
                name: input[0].classList[0],
                value: val >= 0 ? val.round(2) : 0
            });
            // console.log("Input from notchecked", input);
            return arr;
        }, []);

        // console.info("Not Checked", notChecked);

        var prices = [getTotal(checked), getTotal(notChecked)];
        var totals = [gatherArrayTotals(prices[0]), gatherArrayTotals(prices[1])].getPriceTotals();

        // console.info("Totals", totals);

        return totals;
    }

    function getTotal(priceValues) {
        return priceValues.map(function(e) {
            // console.log([e.name,  priceMap[ e.name ]], ["e.value", e.value], ["math", priceMap[ e.name ] * e.value])
            return (priceMap[e.name] * e.value).round(2);
        });
    }

    function gatherArrayTotals(array) {
        if (!array) array = this;
        var sum = array.reduce(add, 0);

        function add(a, b) {
            return a + b;
        }

        return sum;
    }

    function determineColorCode(price, el, l, m, h) {
        var color,
            colors = {
                base: '#F32323',
                low: '#e67e22',
                med: '#1abc9c',
                hi: base = output_color.rgb2hex()
            };
            // console.log("Output color", output_color);
        
        if (!price) return colors.base;


        l = l ? l : 500;
        m = m ? m : 1000;
        h = h ? h : 2000;

        var result;
        if (price >= 0 && price < l) color = colors.base, result = "base";
        if (price >= l && price < m) color = colors.low, result = "low";
        if (price >= m && price < h) color = colors.med, result = "med";
        if (price >= h) color = colors.hi, result = "high";

        /*console.warn(
            ["Base Color", colors.base], 
            ["Price", price], 
            ["Result", result],
            ["lmh", price > l, price > m ,price > h],
            ["returning color", color]
        );*/

        return color.color('hex');
    }

    function OutputPrice(evt, time) {
        // Get Price Totals
        var price = getPrice(),
            total = price <= -1 ? 0 : price,
            color = determineColorCode(total, $('.ouput')) || $('.output').css('color');
        // Debugging
        // console.warn(":Price", price, total);

        // Set timeout interval if none exists
        if (!time) time = 200;

        // Check for existing timeout
        if (timeout) clearTimeout(timeout);
        // Set timeout for input
        timeout = setTimeout(output, time);


        // Output to dom
        function output() {
            // Fade Total
            $('.output').fadeToggle(200, function() {
                $(this).css('color', color).clearQueue()
                    .stop().html(total).fadeToggle("slow");
                // Fade Dollar Sign
                $('.quote-box span.dollar-span').css('color', color).fadeIn(500);
            });
        }
    }
}())