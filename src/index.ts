import { MG2Log4JS, IConfiguration } from './mg2log4js';

export class MG2NodeJSLogger {

    private readonly logger : MG2Log4JS;

    constructor(configuration: IConfiguration) {
        this.logger = new MG2Log4JS(configuration);
    }

    public log(logType: "default" | "performance", verbosityLevel: "fatal" | "error" | "warn" | "info" | "debug", logData: LogData) {
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

    private mapLogData(data: LogData, logType: "default" | "performance") {
        var mappedData = new LogData(data);

        if (logType.toLowerCase() === "performance") {
            return `${mappedData.methodGuid}|${mappedData.methodName}|${mappedData.codeSectionDescriptor}|${mappedData.beginEnd}|${mappedData.externalRequestGuid}|${mappedData.misc1}|${mappedData.misc2}|${mappedData.misc3}|${mappedData.eventLogId}|${mappedData.ipAddress}`;
        } 
        return `${mappedData.methodGuid}|${mappedData.methodName}|${mappedData.codeSectionDescriptor}|${mappedData.timeElapsed}|${mappedData.externalRequestGuid}|${mappedData.misc1}|${mappedData.misc2}|${mappedData.misc3}|${mappedData.misc4}|${mappedData.ipAddress}`; 
    }

    private writeLog(logger, verbosityLevel, data) {
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






