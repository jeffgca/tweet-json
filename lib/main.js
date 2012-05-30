let data = require('self').data;

let pm = require("page-mod").PageMod({
    include: /^https:\/\/twitter.com\/.*\/status\/[\d]+$/,
    contentScriptFile: [data.url('jquery.js'), data.url('tweet_json.js')],
    onAttach: function(worker) {
        worker.port.on('tweet-loaded', function() {
            let tweet_id = /status\/([\d]+)$/.exec(worker.tab.url).pop();
            if (tweet_id) {
                let url = 'https://api.twitter.com/1/statuses/show.json?id=' + tweet_id;
                let twitter_request = require("request").Request({
                    url: url,
                    onComplete: function(response) {
                        worker.port.emit('got-tweet-json', response.json);
                    }
                }).get();
            }
        });
    }
});
