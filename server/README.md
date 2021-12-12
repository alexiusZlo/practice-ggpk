# Gunshot violence data API

add description 

Please extend this API to fit your needs.

## Endpoints

### GET /api/gundata
Returns 200
```
[
  {
    "incident_id": 893251,
    "date": "7/1/2013",
    "n_killed": 0,
    "n_injured": 1,
    "latitude": 40.888,
    "longitude": -73.5899,
    "location": 0,
    "notes": "Traffic stop; backed car into approaching officer  knocked him to ground",
    "categories": "Shot - Wounded/Injured||Officer Involved Incident||Drug involvement"
  },
 ...
]
```
### GET /api/clustered-gundata?precision=[precision]
We use [Geohash](https://en.wikipedia.org/wiki/Geohash) to aggreagte our datapoints in clusters that represent a certain area of the map.

Returns 200
```
[
  {
    "count": 66,
    "n_killed": 28,
    "n_injured": 53,
    "bbox": [
      16.875,
      -168.75,
      22.5,
      -157.5
    ]
  },
 ...
]
```