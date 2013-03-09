var getRotation = function(points) {
    // Calculate the rotation of the AR marker by getting the angle
    // between the top two points, and the angle between the bottom
    // two points and averaging them together.

    // Get the difference vectors of the points
    var x01 = points[1].x - points[0].x;
    var y01 = points[1].y - points[0].y;
    var x23 = points[3].x - points[2].x;
    var y23 = points[3].y - points[3].y;

    
    var getTwoPointAngle = function(xdiff, ydiff) {
        // Calculate the angle between two points (CC is positive)

        var theta = 0;
        // So we don't divide by zero
        if ( xdiff === 0 ) {
            if ( ydiff < 0 ) {
                theta = 270;
            } else {
                theta = 90;
            }
        } else if ( xdiff > 0 ) {
            if ( ydiff < 0 ) {
                theta = 360 - Math.atan2(ydiff,xdiff);
            } else {
                theta = Math.atan2(ydiff,xdiff);
            }
        } else {
            if ( ydiff < 0 ) {
                theta = 180 + Math.atan2(ydiff,xdiff);
            } else {
                theta = 90 + Math.atan2(ydiff,xdiff);
            }
        }

        return theta;
    };

    var theta1 = getTwoPointAngle(x01, y01);
    var theta2 = getTwoPointAngle(x23, y23);

    return (theta1 + theta2)/2;

};

var getValue = function(points, max, min) {
    // Returns the value of a parameter, given the points
    // the maximum value, and the mininum value
    // using the rotation of the marker.

    // if the min isn't specified, assume it to be zero
    min = typeof min !== 'undefined' ? min : 0;
    
    // if the max isn't specified, assume it to be one
    max = typeof max !== 'undefined' ? max : 1;

    return (getRotation(points)/360) * (max - min) + min;
};
