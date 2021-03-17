export default class Utils {
    static SCALE = 3;

    // Calc the angle in a cirlce with on point
    static angle (center, p1) {
        var p0 = {
            x: center.x, y: center.y - Math.sqrt(Math.abs(p1.x - center.x) * Math.abs(p1.x - center.x)
                + Math.abs(p1.y - center.y) * Math.abs(p1.y - center.y))
        };
        return (2 * Math.atan2(p1.y - p0.y, p1.x - p0.x)) * 180 / Math.PI;
    }
}


