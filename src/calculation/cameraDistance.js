// Hier eine Klasse schreiben, die das Kameraobjekt repräsentiert und
// daher mehrere Parameter zum Berechnen des Wuerfels

/* Parameters
    - sensor size and resolution
    - aspect ratio
    - f-stop
    - lense (focal length)
    - speed booster / Telekonverter

*/

export class Camera {
    constructor(fStop = 11, focalLength = 0.055, sensorID = 0, booster = 1.0) {
        this.allSensorData = require('./cameraData.json');

        this.sensorID = sensorID;
        /*this.sensor = {
            // full format in m
            name: "te",
            height: 0.024,
            width: 0.036,
            resolution: {
                v: 1080,
                h: 1920
            }
        };*/
        this.sensor = this.allSensorData.sensors[sensorID];

        this.fStop = fStop;
        this.focalLength = focalLength; //m
        this.booster = booster
    }
    /*
    get sensorData(){
        return this.allSensorData[this.sensorID];
    }*/

    setSensor(id){
        this.sensorID = id;
        this.sensor = this.allSensorData.sensors[id];
        return this;
    }

    circleOfConfusion(){
        const cocHorizontal = this.sensor.width / this.sensor.resolution.h;
        const cocVertical = this.sensor.height / this.sensor.resolution.v
        return Math.min(cocHorizontal, cocVertical);
    }
    calcFStop(focalLength, aperture, booster = 1.0){
        return (focalLength * booster)/aperture;
    }

    // Formel oder Sensordaten überarbeiten
    farDoF(focusDistance){
        const rCoC = this.circleOfConfusion() / 2;
        const k = this.fStop;
        const f = this.focalLength * this.booster;
        return (2 * rCoC * k * focusDistance * (focusDistance - f)) / (f**2 - 2 * rCoC * k * (focusDistance - f));
    }
    nearDoF(focusDistance){
        const rCoC = this.circleOfConfusion() / 2;
        const k = this.fStop;
        const f = this.focalLength * this.booster;
        return (2 * rCoC * k * focusDistance * (focusDistance - f)) / (f**2 + 2 * rCoC * k * (focusDistance - f));
    }
    totalDoF(focusDistance){
        return this.farDoF(focusDistance) + this.nearDoF(focusDistance);
    }

    horizontalAngleOfView(){
        const d = this.sensor.width;
        const f = this.focalLength * this.booster;
        const angleRad = 2 * Math.atan(d / (2 * f));
        return angleRad * (180 / Math.PI);
    }
    verticalAngleOfView(){
        const d = this.sensor.height;
        const f = this.focalLength * this.booster;
        const angleRad = 2 * Math.atan(d / (2 * f));
        return angleRad * (180 / Math.PI);
    }
}
