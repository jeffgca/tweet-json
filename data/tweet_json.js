
$(function() {
    self.port.on('got-tweet-json', function(data) {
        var s_data = JSON.stringify(data, null, '   ');
        $('.components-middle ul.js-actions').after('<pre id="json-dump"></pre>');
        $('#json-dump')
            .css({
                'background-color': '#EFEFEF',
                'overflow': 'auto',
                'border': '1px solid #898989'
            })
            .html(s_data)
            .hide();
        $('.components-middle ul.js-actions').append('<li><a id="json-link" href="#">View JSON</a></li>');

        $('a#json-link').click(function(ev) {
            $('#json-dump').toggle();
            return false;
        });
    });
    self.port.emit('tweet-loaded', true);
});
