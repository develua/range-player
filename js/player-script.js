$(function()
{
    var playerId = '#range-video';
    var rangePlayer = videojs('range-video');
    var startTime = 0, endTime = 0;

    rangePlayer.one('loadedmetadata', function()
    {
        var lengthVideo = rangePlayer.duration();
        lengthVideo = ((lengthVideo / 60) * 0.6).toFixed(2);

        $(playerId + ' .vjs-loading-spinner').hide();
        $(playerId +' .vjs-progress-holder').hide();
        $(playerId + ' .vjs-progress-control').append('<input type="text" class="player-range" value="" name="range" />');

        $(playerId +  " .player-range").ionRangeSlider({
            type: "double",
            min: 0,
            max: lengthVideo,
            from: 0,
            to: lengthVideo,
            hide_min_max: true,
            hide_from_to: false,
            grid: false,
            step: 0.01,
            prettify: function(value)
            {
                return (parseInt(value / 0.6) + value % 0.60).toFixed(2);
            },
            onChange: function(data)
            {
                var playerBase =  $(playerId + '_html5_api').get(0);
                var newStartTime = data.from / 0.60 * 60;
                endTime = data.to / 0.60 * 60;

                if(startTime != newStartTime || playerBase.currentTime > endTime)
                    playerBase.currentTime = startTime = newStartTime;
            }
        });
    });

    $(playerId + '_html5_api').on('timeupdate', function()
    {
        if(this.currentTime > endTime && endTime > 0)
            this.currentTime = startTime;
    });

});

