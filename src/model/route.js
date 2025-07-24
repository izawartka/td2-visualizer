import SceneryObject from "./scenery-object";
import Vector3 from "./vector3";
import SceneryParserLog from "./scenery-parser-log";
import TrackConnection, {TrackConnectionEnd} from "./track-connection";
import CurveHelper from "../helpers/curveHelper";
import StandardTrack from "./tracks/standard-track";
import AngleHelper from "../helpers/angleHelper";

export default class Route extends SceneryObject {
    track_count;
    route_name;
    electrified;
    track_offset;
    category = "routes";
    type = "Route";
    applied = false;
    points;
    offsets;
    segments = [];
    end_center;
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
        this.end_angle_rad = AngleHelper.degToRad(this.rot.y);
        this.end_center = this.pos.clone();
        this.points = [this.pos.clone()];
    }

    static fromText(text) {
        const values = text.split(";");
        return new Route(
            values[2], // prefab_name
            Vector3.fromValuesArray(values, 3), // pos
            Vector3.fromValuesArray(values, 6), // rot
            parseInt(values[9]), // track_count
            values[10], // route_name
            parseFloat(values[11]) || 0, // center_offset
            values[13] === "True" || values[12] === "1" // electrified
        );
    }

    addSegment(length, radius, trackIds) {
        if (trackIds.length !== this.track_count) {
            SceneryParserLog.warn('routeInvalidSegment', `Route segment has invalid track count: expected ${this.track_count}, got ${trackIds.length}`);
            return;
        }
        const rotDeg = new Vector3(0, AngleHelper.radToDeg(this.end_angle_rad), 0);
        const perpendicularUnitVec = Vector3.fromAngleY(this.end_angle_rad + Math.PI / 2);

        const tracks = this.offsets.map((offset, index) => {
            const startPoint = this.end_center.add(perpendicularUnitVec.multiply(offset));

            let trackRadius = radius;
            let trackLength = length;
            if (radius !== 0) {
                trackRadius += offset;
                trackLength *= (trackRadius / radius);
            }

            return StandardTrack.createRouteTrack(
                trackIds[index],
                startPoint,
                rotDeg,
                trackLength,
                trackRadius,
                [], // connections
                this.electrified,
                this, // route
            );
        });

        const { endPos: centerEndPos, endAngle } = CurveHelper.calculateCurveEnd(this.end_center, this.end_angle_rad, radius, length);
        this.end_center = centerEndPos;
        this.end_angle_rad = endAngle;

        if (this.segments.length > 0) {
            const prevSegment = this.segments[this.segments.length - 1];
            tracks.forEach((track, index) => {
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

    applyObject(scenery) {
        if(this.applied) return; // already applied
        this.applied = true;

        this.segments.forEach((segment) => {
            segment.tracks.forEach((track) => {
                scenery.addObject(track);
            });
        });
    }

    getRenderBounds() {
        // These points are used for rendering the route name and arrow
        // Route segment endpoints are not included here
        return [this.pos, this.end_center];
    }
}
