"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const log4js = require('log4js');
class MG2Log4JS {
    constructor(configuration) {
        this.Configuration = {
            ProductName: "Default",
            Log: {
                VerbosityLevel: "Off",
                LogPath: "logs"
            },
            PerformanceLog: {
                VerbosityLevel: "Off",
                LogPath: "logs"
            },
            EmailLog: {
                VerbosityLevel: "Off",
                SMTP: {
                    host: 'your.mail.smtp.com',
                    port: 25,
                    auth: {
                        user: "youruser@gmail.com",
                        pass: "yourpassword"
                    }
                },
                Recipients: 'recipient@gmail.com',
                Sender: 'no-reply@sender.com'
            }
        };
        this.mapConfiguration(configuration);
        log4js.configure({
            appenders: {
                default: {
                    type: 'dateFile',
                    filename: `${this.Configuration.Log.LogPath}/Log_${this.Configuration.ProductName}_`,
                    alwaysIncludePattern: true,
                    pattern: 'MMddyyyy.txt',
                    layout: {
                        type: 'pattern',
                        pattern: '%d{MM-dd-yyyy hh:mm:ss.SSS}|%p|%m',
                        tokens: {}
                    },
                },
                performance: {
                    type: 'dateFile',
                    filename: `${this.Configuration.PerformanceLog.LogPath}/PerfLog_${this.Configuration.ProductName}_`,
                    alwaysIncludePattern: true,
                    pattern: 'MMddyyyy.txt',
                    layout: {
                        type: 'pattern',
                        pattern: '%d{MM-dd-yyyy hh:mm:ss.SSS}|%p|%m',
                        tokens: {}
                    }
                },
                email: {
                    type: '@log4js-node/smtp',
                    SMTP: {
                        host: this.Configuration.EmailLog.SMTP.host,
                        port: this.Configuration.EmailLog.SMTP.port,
                        auth: {
                            user: this.Configuration.EmailLog.SMTP.auth.user,
                            pass: this.Configuration.EmailLog.SMTP.auth.pass
                        }
                    },
                    recipients: this.Configuration.EmailLog.Recipients,
                    subject: `${this.Configuration.ProductName}: Latest logs`,
                    sender: this.Configuration.EmailLog.Sender,
                    // attachment: {
                    //   enable: true,
                    //   filename: `${this.Configuration.ProductName}_Latest.log`,
                    //   message: 'See the attachment for the latest logs'
                    // },
                    sendInterval: 0,
                    layout: {
                        type: 'pattern',
                        pattern: '%d{MM-dd-yyyy hh:mm:ss.SSS}|%p|%m',
                        tokens: {}
                    }
                }
            },
            categories: {
                default: { appenders: ['default'], level: `${this.Configuration.Log.VerbosityLevel}` },
                performance: { appenders: ['performance'], level: `${this.Configuration.PerformanceLog.VerbosityLevel}` },
                email: { appenders: ['email'], level: `${this.Configuration.EmailLog.VerbosityLevel}` }
            }
        });
        this.Default = log4js.getLogger('default');
        this.Performance = log4js.getLogger('performance');
        this.Email = log4js.getLogger('email');
    }
    mapConfiguration(configuration) {
        this.mergeObjects(this.Configuration, configuration);
    }
    mergeObjects(baseObject, replacer) {
        if (baseObject !== null && typeof baseObject === 'object') {
            for (var key in replacer) {
                if (replacer[key] !== null && typeof replacer[key] === 'object') {
                    if (typeof baseObject[key] === 'undefined') {
                        baseObject[key] = {};
                    }
                    this.mergeObjects(baseObject[key], replacer[key]);
                }
                else {
                    baseObject[key] = replacer[key];
                }
            }
        }
    }
}
exports.MG2Log4JS = MG2Log4JS;
