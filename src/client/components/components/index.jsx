/** @format */

import React from "react";
import { useSelector } from "react-redux";
import SearchArea from "./Search/SearchArea";
import Itineraries from "./Itinerary/Itineraries";
import Loading from "../shared/Loading";
import MyMap from './Map'

// const points = [
//   { latitude: 60.21079, longitude: 24.82438 }, // example point 1
//   { latitude: 60.21104, longitude: 24.82569 }, // example point 2
// ]

const points = [
  {
    "mode": "WALK",
    "startTime": 1686000830000,
    "endTime": 1686000907000,
    "duration": 77,
    "distance": 88.24799999999999,
    "trip": null,
    "from": {
      "lat": 60.21079,
      "lon": 24.82438,
      "name": "Origin",
      "stop": null
    },
    "to": {
      "lat": 60.21079,
      "lon": 24.82438,
      "name": "Majurinkulma",
      "stop": {
        "code": "E1158",
        "name": "Majurinkulma",
        "zoneId": "B"
      }
    },
    "legGeometry": {
      "length": 7,
      "points": "c|nnJeoovC?EFcAH}@QKCXMnB"
    }
  },
  {
    "mode": "BUS",
    "startTime": 1686000907000,
    "endTime": 1686002355000,
    "duration": 1448,
    "distance": 15164.861095703382,
    "trip": {
      "tripHeadsign": "Kamppi",
      "routeShortName": "113N"
    },
    "from": {
      "lat": 60.21079,
      "lon": 24.82438,
      "name": "Majurinkulma",
      "stop": {
        "code": "E1158",
        "name": "Majurinkulma",
        "zoneId": "B"
      }
    },
    "to": {
      "lat": 60.1688,
      "lon": 24.93012,
      "name": "Kamppi, tulo",
      "stop": {
        "code": "H1260",
        "name": "Kamppi, tulo",
        "zoneId": "A"
      }
    },
    "legGeometry": {
      "length": 298,
      "points": "a|nnJaoovCe@vFUpBSf@uErIOTQZWp@ObAEx@AdBAlBIzDA~EC`EAnBG|AMbBGx@G^ObAOj@Qp@c@zA[lAkAzE~@|@RPPJTB\\INUz@sBnCoHh@uAJELQNQVER?XNvBbB`@Lz@t@x@l@^l@Jh@~EvGfCrDpAlApAp@vKNj@ELF@XJr@@DVhGXxFDnADxAR~CKt@cBbEKzAPrGVbAZ|@d@jAPdAHt@^|GXCdA]r@[JAp@C\\FlDnA`@DFCJ{DVsEl@{G`@gFPmD@QFsD`@Ar@FfAd@|@v@rAj@r@VzA`@RJb@\\Z^Zj@d@zAl@jAv@r@f@x@p@fB^nBR^VTz@VPTFf@Il@mArGG^AX@TD^\\vAZtBH|@Db@H\\Nj@Tt@b@lCLb@PXHD\\FJ@p@_@~A}@p@i@`BuBRSz@w@`A_@t@e@jA{@PATBv@x@LJHCXE^[bEsEhAsA^MXT~@l@v@Xl@Bb@@XG^Ob@Qd@_@h@e@X?NF^PfAd@rBfAxAr@dBx@|CxAnAr@pCnAbD|AZF~@Aj@Mf@e@pA_B`AwA\\g@vBoCbBwBbAmAfAcApA}@nAw@pBk@pBeArAo@lB}@rAo@bAe@n@[h@Qv@c@dCkAiAmSs@_Lu@uJ_@}CJ}@?q@G_@b@Uv@WdA]hBc@jBSJ?vAKt@@rGOvBIfAMtB]xAQXUHW@_@IoBKsBAoBCqHLcHLoFRiNJiG?aIN}GT}CRgEPgFX{Hp@oKv@gKz@oJ`AsHfDySRi@|@oEvAuKz@oIb@mHfGio@jFyh@pAuOPaEDmADeD?iC?kBG}EEkAIaB[_FWsCq@aGKq@mEg_@g@qEm@uFkAaOSwC_@qFgBu[}F_eAUyGKkGCyA@}CDoBHsFJ}BPcDZwDHkAf@iDVyAVqA~@cDt@kBh@eApAmBf@i@XSn@gAEiHGqEQ}UIiN_@{IUyHG}@SsCw@cDiAg@uB}@eCcAoCsAw@g@gBcGcAcE"
    }
  },
  {
    "mode": "WALK",
    "startTime": 1686002355000,
    "endTime": 1686003034000,
    "duration": 679,
    "distance": 786.0419999999998,
    "trip": null,
    "from": {
      "lat": 60.1688,
      "lon": 24.93012,
      "name": "Kamppi, tulo",
      "stop": {
        "code": "H1260",
        "name": "Kamppi, tulo",
        "zoneId": "A"
      }
    },
    "to": {
      "lat": 60.172725,
      "lon": 24.939595,
      "name": "Destination",
      "stop": null
    },
    "legGeometry": {
      "length": 78,
      "points": "yufnJegdwCAQLu@BONUAGEOEQEQAGAGEQEQEOEQEQEQCOAECKEQCIAGEQEOc@kBAGKc@I[g@{ByByCaA_AUSKIKOaAsAA@GFA@C@?@IFA@CDMECUAEAEAKGc@EYAGMqBE@?G?E?CCa@mAg@CA]wBIuCA[?G?W?YEME@G?Kq@AMAcAI?E@I?C@Kd@]@"
    }
  }
]

const Container = () => {
  const loading = useSelector((state) => state.itinerary.loading);

  return (
    <div className='main__layout'>
      <div className="main__layout-left">
        <h1> Itineraries Planning</h1>
        <div className='main__content'>
          <SearchArea />

          {loading ? <Loading /> : <Itineraries />}
        </div>
      </div>
      <div className="main__layout-right">
        <MyMap points={points} />
      </div>
    </div>
  );
};

export default Container;
