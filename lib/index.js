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
            return `${this.replacePipeLine(mappedData.methodGuid)}|${this.replacePipeLine(mappedData.methodName)}|${this.replacePipeLine(mappedData.codeSectionDescriptor)}|${this.replacePipeLine(mappedData.beginEnd)}|${this.replacePipeLine(mappedData.externalRequestGuid)}|${this.replacePipeLine(mappedData.misc1)}|${this.replacePipeLine(mappedData.misc2)}|${this.replacePipeLine(mappedData.misc3)}|${this.replacePipeLine(mappedData.eventLogId)}|${this.replacePipeLine(mappedData.ipAddress)}`;
        }
        return `${this.replacePipeLine(mappedData.methodGuid)}|${this.replacePipeLine(mappedData.methodName)}|${this.replacePipeLine(mappedData.codeSectionDescriptor)}|${this.replacePipeLine(mappedData.timeElapsed)}|${this.replacePipeLine(mappedData.externalRequestGuid)}|${this.replacePipeLine(mappedData.misc1)}|${this.replacePipeLine(mappedData.misc2)}|${this.replacePipeLine(mappedData.misc3)}|${this.replacePipeLine(mappedData.misc4)}|${this.replacePipeLine(mappedData.ipAddress)}`;
    }
    writeLog(logger, verbosityLevel, data) {
        switch (verbosityLevel.toLowerCase()) {
            case "fatal": {
                logger.fatal(data);
                this.logger.Email.fatal(data);
                break;
            }
            case "error": {
                logger.error(data);
                this.logger.Email.error(data);
                break;
            }
            case "warn": {
                logger.warn(data);
                this.logger.Email.warn(data);
                break;
            }
            case "info": {
                logger.info(data);
                this.logger.Email.info(data);
                break;
            }
            case "debug": {
                logger.debug(data);
                this.logger.Email.debug(data);
                break;
            }
            default: break;
        }
    }
    replacePipeLine(str) {
        if (!str) {
            return str;
        }
        return str.replace('|', '{bar}');
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
