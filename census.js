class Backend {
  constructor() {
    // IGNORE
  }

  static requestTemperatureData (startTime, endTime, resolution) {
    let temperaturePromise = new Promise((resolve, reject) => {
      setTimeout(function(){
        return resolve(Array.from({length: resolution}, () => Math.floor(Math.random() * 100)));
      }, 2500);
    });

    return temperaturePromise;
  }
}

class UserInterface {
  constructor() {
    // IGNORE
  }

  renderChartData (datapoints) {
    let chart = datapoints;
    console.log(`${Date.now()} Rendering chart: ${chart}`);
    return chart;
  }
}


class weatherController {
  constructor(ui, backend, startTime, endTime) {
    this.ui = ui;
    this.backend = backend;
    this.startTime = startTime;
    this.endTime = endTime;
    this.resolution = this.getResolution(startTime, endTime);
    this.datapoints = null;
    this.chart = ui.renderChartData(this.datapoints);

    let datapointsPromise = backend.requestTemperatureData(startTime, endTime, this.resolution);
    datapointsPromise.then((data) => {
      this.receiveTemperatureData(startTime, endTime, this.resolution, data);
    });
  }

  getResolution(startTime, endTime) {
    const nonEpochStart = new Date(startTime);
    const nonEpochEnd = new Date(endTime);
    const timeBetweenStartAndEnd = nonEpochStart.getHours() - nonEpochEnd.getHours();
    let resolution;
    if (timeBetweenStartAndEnd < 2) {
      resolution = 60;
    } else if (timeBetweenStartAndEnd < 168) { 
      resolution = 300;
    } else { 
      resolution = 3600; 
    }
    return resolution;
  }

  setStartTime(startTime) {
    this.startTime = startTime;
    this.resolution = this.getResolution(startTime, this.endTime);
    // TO BE FURTHER FLESHED OUT IN Example 2: Partial Cache
  }

  setEndTime(endTime) {
    this.endTime = endTime;
    this.resolution = this.getResolution(this.startTime, endTime);
    // TO BE FURTHER FLESHED OUT IN Example 2: Partial Cache
  }

  receiveTemperatureData(startTime,
                         endTime,
                         resolution,
                         datapoints) {
    this.datapoints = datapoints;
    this.chart = this.ui.renderChartData(this.datapoints);
    // TO BE FURTHER FLESHED OUT IN Example 2: Partial Cache
  }
}

