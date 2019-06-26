let geoJsonBounds = require('geojson-bounds');

let getAndFitBounds = (response) =>{
    let bounds = geoJsonBounds.envelope(response);
    let boundsArr = bounds.geometry.coordinates[0];

    return [
        [boundsArr[0][1], boundsArr[0][0]],
        [boundsArr[1][1], boundsArr[1][0]],
        [boundsArr[2][1], boundsArr[2][0]],
        [boundsArr[3][1], boundsArr[3][0]],
        [boundsArr[4][1], boundsArr[4][0]]
    ];
};

export default {
    getAndFitBounds
}