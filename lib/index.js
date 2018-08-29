"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mg2log4js_1 = require("./mg2log4js");
class MG2NodeJSLogger {
    constructor(configuration) {
        this.logger = new mg2log4js_1.MG2Log4JS(configuration);
    }
    log(logType, verbosityLevel, logData) {
        let data = this.mapLogData(logData, logType);
        switch (logType.toLowerCase()) {
            case "performance": {
                this.writeLog(this.logger.Performance, verbosityLevel, data);
                break;
            }
            default: {
                this.writeLog(this.logger.Default, verbosityLevel, data);
            }
        }
    }
    mapLogData(data, logType) {
        var mappedData = new LogData(data);
        if (logType.toLowerCase() === "performance") {
            return `${mappedData.methodGuid}|${mappedData.methodName}|${mappedData.codeSectionDescriptor}|${mappedData.beginEnd}|${mappedData.externalRequestGuid}|${mappedData.misc1}|${mappedData.misc2}|${mappedData.misc3}|${mappedData.eventLogId}|${mappedData.ipAddress}`;
        }
        return `${mappedData.methodGuid}|${mappedData.methodName}|${mappedData.codeSectionDescriptor}|${mappedData.timeElapsed}|${mappedData.externalRequestGuid}|${mappedData.misc1}|${mappedData.misc2}|${mappedData.misc3}|${mappedData.misc4}|${mappedData.ipAddress}`;
    }
    writeLog(logger, verbosityLevel, data) {
        switch (verbosityLevel.toLowerCase()) {
            case "fatal": {
                logger.fatal(data);
                break;
            }
            case "error": {
                logger.error(data);
                break;
            }
            case "warn": {
                logger.warn(data);
                break;
            }
            case "info": {
                logger.info(data);
                break;
            }
            case "debug": {
                logger.debug(data);
                break;
            }
            default: break;
        }
    }
}
exports.MG2NodeJSLogger = MG2NodeJSLogger;
class LogData {
    constructor(data) {
        this.methodGuid = "";
        this.methodName = "";
        this.codeSectionDescriptor = "";
        this.beginEnd = "";
        this.externalRequestGuid = "";
        this.timeElapsed = "";
        this.misc1 = "";
        this.misc2 = "";
        this.misc3 = "";
        this.misc4 = "";
        this.eventLogId = "";
        this.ipAddress = "";
        Object.assign(this, data);
    }
}
