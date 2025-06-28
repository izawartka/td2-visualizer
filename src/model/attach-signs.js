import AngleHelper from "../helpers/angleHelper";
import Constants from "../helpers/constants";
import SceneryParserLog from "./scenery-parser-log";
import Vector3 from "./vector3";

function getGridSize(scenery) {
    const sceneryBounds = scenery.getBounds();
    const gridSizeX = Math.floor((sceneryBounds.maxX - sceneryBounds.minX) / Constants.parser.attachSignsGridSize) + 1;
    const gridSizeZ = Math.floor((sceneryBounds.maxZ - sceneryBounds.minZ) / Constants.parser.attachSignsGridSize) + 1;

    return { x: gridSizeX, z: gridSizeZ };
}

function getGridCellPositions(pos, scenery, gridSize, maxDist) {
    const sceneryBounds = scenery.getBounds();
    const gx = Math.floor((pos.x - sceneryBounds.minX) / Constants.parser.attachSignsGridSize);
    const gz = Math.floor((pos.z - sceneryBounds.minZ) / Constants.parser.attachSignsGridSize);

    if(gx < 0 || gx >= gridSize.x || gz < 0 || gz >= gridSize.z) {
        SceneryParserLog.warn('attachSignsOutOfBounds', `TrackObject at position (${pos.x}, ${pos.z}) is out of bounds of the scenery grid. Grid size: ${gridSize.x}x${gridSize.z}, position: (${gx}, ${gz})`);
        return [];
    }

    const positions = [{ x: gx, z: gz }];

    const inCellX = pos.x - (sceneryBounds.minX + gx * Constants.parser.attachSignsGridSize);
    const inCellZ = pos.z - (sceneryBounds.minZ + gz * Constants.parser.attachSignsGridSize);

    const isLeftEdge = inCellX <= maxDist && gx > 0;
    const isRightEdge = inCellX >= Constants.parser.attachSignsGridSize - maxDist && gx < gridSize.x - 1;
    const isTopEdge = inCellZ <= maxDist && gz > 0;
    const isBottomEdge = inCellZ >= Constants.parser.attachSignsGridSize - maxDist && gz < gridSize.z - 1;

    if(isLeftEdge) positions.push({ x: gx - 1, z: gz });
    if(isRightEdge) positions.push({ x: gx + 1, z: gz });
    if(isTopEdge) positions.push({ x: gx, z: gz - 1 });
    if(isBottomEdge) positions.push({ x: gx, z: gz + 1 });
    if(isLeftEdge && isTopEdge) positions.push({ x: gx - 1, z: gz - 1 });
    if(isLeftEdge && isBottomEdge) positions.push({ x: gx - 1, z: gz + 1 });
    if(isRightEdge && isTopEdge) positions.push({ x: gx + 1, z: gz - 1 });
    if(isRightEdge && isBottomEdge) positions.push({ x: gx + 1, z: gz + 1 });

    return positions;
}

export function attachSigns(scenery) {
    const maxDistSq = Constants.parser.attachSignsMaxDistanceZ ** 2 + Constants.parser.attachSignsMaxDistanceX ** 2;
    const maxDist = Math.sqrt(maxDistSq);
    const trackObjectsArr = Object.values(scenery.objects['track-objects'] || {});
    const gridSize = getGridSize(scenery);
    const posGrid = new Array(gridSize.x)
        .fill(new Array(gridSize.z)
        .fill([]));

    for(const trackObject of trackObjectsArr) {
        if(trackObject.type !== 'Signal') continue;

        const positions = getGridCellPositions(trackObject.pos, scenery, gridSize, maxDist);
        for(const pos of positions) {
            posGrid[pos.x][pos.z].push(trackObject);
        }
    }

    for(const trackObject of trackObjectsArr) {
        if(trackObject.type !== 'Sign') continue;

        const positions = getGridCellPositions(trackObject.pos, scenery, gridSize, maxDist);
        const signals = positions.flatMap(pos => posGrid[pos.x][pos.z]);

        let closestSignal = null;
        let closestDistanceSq = Infinity;

        for(const signal of signals) {
            if(Constants.parser.attachSignsNeedsSameTrack && signal.track_id !== trackObject.track_id) continue; // skip signals on different tracks

            const distanceSq = signal.pos.distanceSqExcludeY(trackObject.pos);
            if(distanceSq > maxDistSq) continue; // skip too far signals

            const signalAngleRad = AngleHelper.degToRad(signal.rot.y);
            const localPos = trackObject.pos.toLocal(signal.pos, new Vector3(0, signalAngleRad, 0));
            if(Math.abs(localPos.z) > Constants.parser.attachSignsMaxDistanceZ) continue; // skip signals that are too far in front or behind
            if(Math.abs(localPos.x) > Constants.parser.attachSignsMaxDistanceX) continue; // skip signals that are too far to the side

            if(distanceSq < closestDistanceSq) {
                closestDistanceSq = distanceSq;
                closestSignal = signal;
            }
        }

        if(!closestSignal) continue;

        if(Constants.parser.logAttachedSigns) {
            console.log(`Attaching sign ${trackObject.name} (${trackObject.id}) to signal ${closestSignal.name} (${closestSignal.id}) at distance ${Math.sqrt(closestDistanceSq).toFixed(2)} m`);
        }

        trackObject.attached_to = closestSignal;
        closestSignal.attached_signs.push(trackObject);
    }
}