var assignedMarkers = {};
var listMarkers = {};

var handleMarkers = function(markers) {
    markers.forEach(function(marker) {
        var id = marker.id;
        if (!assignedMarkers[id] && !listMarkers[id]) {
            // If we have a new marker, add it to a list of
            // unregistered markers so the user can register them
            listMarkers[id] = makeListMarker(id);
        } else if (assignedMarkers[id]){
             
            // If we have a registered marker, update the parameters
            var instr = assignedMarkers[id][0];
            var param = assignedMarkers[id][1];
            instr.updateParam(param, getValue(marker.corners));
        }
    });
};

var registerMarker = function(markerID, instr, param) {
    var listEntry = document.getElementById(markerID).getElementsByClassName('portlet-content')[0];

    while (listEntry.hasChildNodes()) {
            listEntry.removeChild(listEntry.lastChild);
    }
    listEntry.innerHTML = instr.name + ', ' + param;
    assignedMarkers[markerID] = [instr, param];
};

var unregisterMarker = function(markerID) {
    // Tell the instrument that it's no longer being parameterized
    // by a marker. Either that, or just leave it to what it was before.
    assignedMarkers[markerID] = undefined;
};

// TESTING CODE
//var instr = new Instrument('sin');
//instr.play();
//registerMarker(677, null, 'freq')
//registerMarker(677, new Instrument('sin'), 'freq');
//assignedMarkers[677][0].play();
//console.log("Made marker");

