import { MG2Log4JS, IConfiguration } from './mg2log4js';

export class MG2NodeJSLogger {

    private readonly logger : MG2Log4JS;

    constructor(configuration: IConfiguration) {
        this.logger = new MG2Log4JS(configuration);
    }

    public log(logType: string, verbosityLevel: "fatal" | "error" | "warn" | "info" | "debug", logData: LogData) {
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

    private mapLogData(data: LogData, logType: string) {
        var mappedData = new LogData(data);

        if (logType.toLowerCase() === "performance") {
            return `${this.replacePipeLine(mappedData.methodGuid)}|${this.replacePipeLine(mappedData.methodName)}|${this.replacePipeLine(mappedData.codeSectionDescriptor)}|${this.replacePipeLine(mappedData.beginEnd)}|${this.replacePipeLine(mappedData.externalRequestGuid)}|${this.replacePipeLine(mappedData.misc1)}|${this.replacePipeLine(mappedData.misc2)}|${this.replacePipeLine(mappedData.misc3)}|${this.replacePipeLine(mappedData.eventLogId)}|${this.replacePipeLine(mappedData.ipAddress)}`;
        } 
        return `${this.replacePipeLine(mappedData.methodGuid)}|${this.replacePipeLine(mappedData.methodName)}|${this.replacePipeLine(mappedData.codeSectionDescriptor)}|${this.replacePipeLine(mappedData.timeElapsed)}|${this.replacePipeLine(mappedData.externalRequestGuid)}|${this.replacePipeLine(mappedData.misc1)}|${this.replacePipeLine(mappedData.misc2)}|${this.replacePipeLine(mappedData.misc3)}|${this.replacePipeLine(mappedData.misc4)}|${this.replacePipeLine(mappedData.ipAddress)}`; 
    }

    private writeLog(logger, verbosityLevel, data) {
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

    private replacePipeLine(str: string) {
        if (!str) {
            return str;
        }
        return str.replace('|', '{bar}');
    }

}

class LogData {
    constructor(data) {
        Object.assign(this, data);
    }

    methodGuid: string = "";
    methodName: string = "";
    codeSectionDescriptor: string = "";
    beginEnd: string = "";
    externalRequestGuid: string = "";
    timeElapsed: string = "";
    misc1: string = "";
    misc2: string = "";
    misc3: string = "";
    misc4: string = "";
    eventLogId: string = "";
    ipAddress: string = "";
}






