import SceneryObject from "./scenery-object";
import Vector3 from "./vector3";
import SceneryParserLog from "./scenery-parser-log";
import RouteTrack from "./tracks/route-track";
import TrackConnection, {TrackConnectionEnd} from "./track-connection";
import ShapeFactory from "./shape/shape-factory";
import AngleHelper from "../helpers/angleHelper";
import CurveHelper from "../helpers/curveHelper";

export default class Route extends SceneryObject {
    track_count;
    route_name;
    electrified;
    track_offset;
    category = "routes";
    type = "Route";
    points;
    offsets;
    segments = [];
    end_center;
    end_points;
    end_angle_rad;

    constructor(prefab_name, pos, rot, track_count, route_name, track_offset, electrified) {
        super(route_name, pos, rot);

        Object.assign(this, {
            prefab_name,
            track_count,
            route_name,
            track_offset,
            electrified,
        });

        this.offsets = this._getOffsets();
        this.end_angle_rad = this.rot.y * Math.PI / 180;
        this.end_center = this.pos.clone();
        this.end_points = this._getConnectionPoints();
        this.points = [...this.end_points];
    }

    static fromText(text) {
        const values = text.split(";");
        const route = new Route(
            values[2], // prefab_name
            Vector3.fromValuesArray(values, 3), // pos
            Vector3.fromValuesArray(values, 6), // rot
            parseInt(values[9]), // track_count
            values[10], // route_name
            parseFloat(values[11]) || 0, // center_offset
            values[13] === "True" || values[12] === "1" // electrified
        );

        return route;
    }

    addSegment(length, radius, trackIds) {
        if (trackIds.length !== this.track_count) {
            SceneryParserLog.warn('routeInvalidSegment', `Route segment has invalid track count: expected ${this.track_count}, got ${trackIds.length}`);
            return;
        }

        const startPoints = this.end_points;
        this.end_points = [];

        const shapes = [];

        if (radius === 0) {
            this.end_center = this.end_center.add(Vector3.fromAngleY(this.end_angle_rad, length));
            this.offsets.forEach((offset, index) => {
                const end_point = this.end_center
                    .add(Vector3.fromAngleY(this.end_angle_rad + Math.PI / 2, offset));
                this.end_points.push(end_point);
                shapes.push(ShapeFactory.straightRaw(startPoints[index], end_point, this.end_angle_rad));
            });
        } else {
            const { circleCenter, endPos: centerEndPos, endAngle } = CurveHelper.calculateCurveEnd(this.end_center, this.end_angle_rad, radius, length);
            this.end_center = centerEndPos;
            const startAngleRad = this.end_angle_rad;
            this.end_angle_rad = endAngle;
            let centerToEndUnit = centerEndPos.sub(circleCenter).normalize();
            if (radius < 0) centerToEndUnit = centerToEndUnit.negate();

            this.offsets.forEach((offset, index) => {
                const trackRadius = radius + offset;
                const trackLength = length * trackRadius / radius;
                const end_point = circleCenter.add(centerToEndUnit.multiply(trackRadius));
                this.end_points.push(end_point);
                shapes.push(ShapeFactory.arcRaw(startPoints[index], end_point, circleCenter, trackRadius, trackLength, startAngleRad, this.end_angle_rad));
            });
        }

        this.points.push(...this.end_points);

        const tracks = trackIds.map((trackId, index) => {
            return new RouteTrack(
                trackId,
                shapes[index],
                [], // connections
                this.electrified,
                this, // route
            );
        });

        if (this.segments.length >= 2) {
            const prevSegment = this.segments[this.segments.length - 2];
            const newSegment = this.segments[this.segments.length - 1];
            newSegment.tracks.forEach((track, index) => {
                const prevTrack = prevSegment.tracks[index];
                track.connections.push(new TrackConnection(prevTrack, TrackConnectionEnd.START));
                prevTrack.connections.push(new TrackConnection(track, TrackConnectionEnd.END));
            });
        }

        this.segments.push({ length, radius, trackIds, tracks });
    }

    // This method is future-proofed for more than 2 tracks
    _getOffsets() {
        const leftmost_offset = (this.track_count - 1) * 2 + this.track_offset;
        const result = [];
        for (let i = 0; i < this.track_count; i++) {
            result.push(leftmost_offset - i * 4);
        }
        return result;
    }

    _getConnectionPoints() {
        return this.offsets.map((offset) => {
            const offsetVec = Vector3.fromAngleY(this.end_angle_rad + Math.PI / 2, offset);
            return this.pos.add(offsetVec);
        });
    }

    applyObject(scenery) {
        this.segments.forEach((segment) => {
            segment.tracks.forEach((track) => {
                scenery.addObject(track);
            });
        });
    }
}
