// service.js

import TrackPlayerEvents from "react-native-track-player/lib/eventTypes";
module.exports = async function() {
    // This service needs to be registered for the module to work
	// but it will be used later in the "Receiving Events" section

    

    TrackPlayerEvents.addEventListener('remote-play', () => TrackPlayerEvents.play());

    TrackPlayerEvents.addEventListener('remote-pause', () => TrackPlayerEvents.pause());

    TrackPlayerEvents.addEventListener('remote-stop', () => TrackPlayerEvents.destroy());
}