const Geohash = require('ngeohash')

/**
 * Precision  Cell Width
 *   1        ≤ 5,000km
 *   2        ≤ 1,250km
 *   3        ≤ 156km
 *   4        ≤ 39.1km
 *   5        ≤ 4.89km
 *   6        ≤ 1.22km
 *   7        ≤ 153m
 *   8        ≤ 38.2m
 *   9        ≤ 4.77m	
 *   10       ≤ 1.19m	
 *   11       ≤ 149mm
 *   12       ≤ 37.2mm
 */

/**
 * Builds a geohash cluster given a precision
 * 
 * @param {number} precision 
 */
const clusterForPrecision = (gundata, precision) => {
  const keyedByGeohash = gundata.reduce((acc, incident) => {
    const geohash = Geohash.encode(
      incident.latitude,
      incident.longitude,
      precision
    )
    if (geohash in acc) {
      acc[geohash].count++
      acc[geohash].n_killed += incident.n_killed
      acc[geohash].n_injured += incident.n_injured
    } else {
      acc[geohash] = {
        count: 1,
        n_killed: incident.n_killed,
        n_injured: incident.n_injured,
        bbox: Geohash.decode_bbox(geohash)
      }
    }
    return acc
  }, {})
  return Object.values(keyedByGeohash)
}

/**
 * Builds an in-memory precision keyed object with respective clusters
 */
module.exports = (gundata) => {
  // [1...12]
  const precisions = [...Array(12).keys()].map(x => x + 1)

  const clusters = precisions.reduce((acc, current) => {
    console.log(`Building cluster for precision ${current}...`)
    acc[current] = clusterForPrecision(gundata, current)
    console.log(`Cluster for precision ${current} has ${acc[current].length} items\n`)
    return acc
  }, {})

  return precision => clusters[precision]
}