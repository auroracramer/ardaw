var getRotation = function(points) {
    // Calculate the rotation of the AR marker by getting the angle
    // between the top two points, and the angle between the bottom
    // two points and averaging them together.

    // Points start from the top left and go CW

    // Get the difference vectors of the points
    var x01 = points[1].x - points[0].x;
    var y01 = points[1].y - points[0].y;
    var x32 = points[2].x - points[3].x;
    var y32 = points[2].y - points[3].y;
    
    var getTwoPointAngle = function(xdiff, ydiff) {
        // Calculate the angle between two points
        return Math.atan2(ydiff,xdiff);
    };

    var theta1 = getTwoPointAngle(x01, y01);
    var theta2 = getTwoPointAngle(x32, y32);

    var angle = (theta1 + theta2)/2;
    return fixAngle(angle);

};

var fixAngle = function(n) {
    // If the angle is negative, add 2pi
    if ( n < 0 ) {
        return n + 2 * Math.PI;
    } else {
        return n;
    }
};

var getValue = function(points) {
    // Returns the normalized rotation

    // if the min isn't specified, assume it to be zero
    //min = typeof min !== 'undefined' ? min : 0;
    
    // if the max isn't specified, assume it to be one
    //max = typeof max !== 'undefined' ? max : 1;

    return getRotation(points)/(2*Math.PI);
};
