var key = getUrlParam('key', 'null');
if (key === 'null' || !key) {
    location = 'index.html';
}
console.log(key);

function getUrlParam(parameter, defaultvalue) {
    var urlparameter = defaultvalue;
    if (window.location.href.indexOf(parameter) > -1) {
        urlparameter = getUrlVars()[parameter];
    }
    return urlparameter;
}

function getUrlVars() {
    var vars = {};
    var parts = window.location.href.replace(/[?&]+([^=&]+)=([^&]*)/gi, function (m, key, value) {
        vars[key] = value;
    });
    return vars;
}

doAjax(key);

function doAjax(key) {
    var offset = [10, 20, 30,40,50, 60];
    const randOfset = offset[Math.floor(Math.random() * offset.length)];
    var url = 'https://api.twitch.tv/kraken/search/streams?query=' + key+"&offset="+randOfset;
    $.ajax({
        type: "GET",
        dataType: 'JSON',
        beforeSend: function (request) {
            request.setRequestHeader("Client-ID", '58gi289e8ntuuoj29w86mwo011vznu');
            request.setRequestHeader("Accept", 'application/vnd.twitchtv.v5+json');
        },
        url: url,
        processData: false,
        success: function (success) {
            if (success['streams'].length === 0) {
                doAjax('giveaway');
            }
            var stream = (success['streams']);
            for (var i = 0; i < stream.length; i++) {
                setTimeout(function (y) {
                    if (y !== 0) {
                        chatHtml = "";

                        $("#twitch-embed iframe").remove()
                    }
                    embedVideo(stream[y]['channel']['name']);

                }, i * 30000, i);
            }
        },
        error: function (error) {
            console.log(error);
        }
    });

}


function embedVideo(id) {
    var embed = new Twitch.Embed("twitch-embed", {
        width: 754,
        height: 480,
        channel: id,
        layout: "video",
        autoplay: false,
    });

    embed.addEventListener(Twitch.Embed.VIDEO_READY, () => {
        var player = embed.getPlayer();
        player.play();
    });
}
