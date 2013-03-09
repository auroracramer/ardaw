function cornerMapping(x, y, u, v) {
    this.x = x;
    this.y = y;
    this.u = u;
    this.v = v;
};


function mapCornersToPts(img, corners) {
    // The corner objects from the js-aruco stuff go CW
    // starting from the bottom left corner
    return [new cornerMapping(corners[0].x, corners[0].y, img.width - 1, img.height - 1),
            new cornerMapping(corners[3].x, corners[3].y, img.width - 1, 0),
            new cornerMapping(corners[2].x, corners[2].y, 0, 0),
            new cornerMapping(corners[1].x, corners[1].y, 0, img.height - 1)];
}

/*

Skew the image such that it conforms to the given 4 points.

*/
function skew(img, pts) {
    // Corners start at the bottom right and go CCW

    // Map the given pts to the corners of the image
    var corners = mapCornersToPts(img, pts);

    var tris = [[0, 1, 2], [2, 3, 0]]; // Split in two triangles?
    var ctx = document.getElementById("canvas").getContext('2d');

    ctx.save();
    ctx.setTransform(1, 0, 0, 1, 0, 0);
    ctx.clearRect(0,0,ctx.canvas.width, ctx.canvas.height);
    ctx.restore();
    for (var t=0; t<2; t++) {
        var pp = tris[t];
        var x0 = corners[pp[0]].x, x1 = corners[pp[1]].x, x2 = corners[pp[2]].x;
        var y0 = corners[pp[0]].y, y1 = corners[pp[1]].y, y2 = corners[pp[2]].y;
        var u0 = corners[pp[0]].u, u1 = corners[pp[1]].u, u2 = corners[pp[2]].u;
        var v0 = corners[pp[0]].v, v1 = corners[pp[1]].v, v2 = corners[pp[2]].v;

        // Set clipping area so that only pixels inside the triangle will
        // be affected by the image drawing operation
        ctx.save(); ctx.beginPath(); ctx.moveTo(x0, y0); ctx.lineTo(x1, y1);
        ctx.lineTo(x2, y2); ctx.closePath(); ctx.clip();

        // Compute matrix transform
        var delta = u0*v1 + v0*u2 + u1*v2 - v1*u2 - v0*u1 - u0*v2;
        var delta_a = x0*v1 + v0*x2 + x1*v2 - v1*x2 - v0*x1 - x0*v2;
        var delta_b = u0*x1 + x0*u2 + u1*x2 - x1*u2 - x0*u1 - u0*x2;
        var delta_c = u0*v1*x2 + v0*x1*u2 + x0*u1*v2 - x0*v1*u2
                      - v0*u1*x2 - u0*x1*v2;
        var delta_d = y0*v1 + v0*y2 + y1*v2 - v1*y2 - v0*y1 - y0*v2;
        var delta_e = u0*y1 + y0*u2 + u1*y2 - y1*u2 - y0*u1 - u0*y2;
        var delta_f = u0*v1*y2 + v0*y1*u2 + y0*u1*v2 - y0*v1*u2
                      - v0*u1*y2 - u0*y1*v2;

        // Draw the transformed image
        ctx.transform(delta_a/delta, delta_d/delta,
                      delta_b/delta, delta_e/delta,
                      delta_c/delta, delta_f/delta);
        ctx.drawImage(img, 0, 0);
        ctx.restore();
    }
}
