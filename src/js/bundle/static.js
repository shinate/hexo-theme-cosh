var loader = document.getElementById('static');
if (window.location.hash.indexOf('_b_p_') == -1) {
    document.onreadystatechange = function () {
        if (document.readyState === "interactive") {
            (function () {
                var P = Promise.resolve();
                document.querySelectorAll('script[source]').forEach(function (node) {
                    P = P.then(function () {
                        return new Promise(function (resolve, reject) {
                            var rep = document.createElement('script');
                            rep.src = node.getAttribute('source');
                            node.getAttribute('id') && (rep.id = node.getAttribute('id'));
                            rep.onload = function () {
                                // console.log('loaded ' + node.getAttribute('source'));
                                resolve();
                            }
                            document.head.appendChild(rep);
                            node.parentNode.replaceChild(rep, node);
                            // script.parentNode.removeChild(script);
                        });
                    });
                });
            })();
            (function () {
                document.querySelectorAll('link[source]').forEach(function (node) {
                    var rep = document.createElement('link');
                    rep.setAttribute('type', "text/css");
                    rep.setAttribute('rel', "stylesheet");
                    rep.setAttribute('media', "all");
                    rep.href = node.getAttribute('source');
                    node.getAttribute('id') && (rep.id = node.getAttribute('id'));
                    node.parentNode.replaceChild(rep, node);
                });
            })();
        }
    };
}
loader.parentNode.removeChild(loader);
loader = null;