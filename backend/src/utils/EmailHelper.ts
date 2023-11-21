import config from '../config/Index'
import AWS from 'aws-sdk'

class EmailHelper {

    ses;

    constructor() {
        AWS.config.update({ region: 'us-east-1' });

        this.ses = new AWS.SES({
            accessKeyId: config.awsAccess.accessKeyId,
            secretAccessKey: config.awsAccess.secretAccessKey,
        });
    }

    sendEmail = async ({ email, subject, message, formId }: { email: string, subject: string, message: string, formId: string }) => {
        const params = {
            Destination: {
                ToAddresses: [email] // Email address/addresses that you want to send your email
            },
            Message: {
                Body: {
                    Html: {
                        // HTML Format of the email
                        Charset: "UTF-8",
                        Data:
                            `<html><body><div style="background-color: rgb(103, 58, 183);color: white; height: 64px;line-height: 64px; padding: 0 40px;font-size: 24px">Google forms </div><div style=" background-color: rgb(237, 231, 246);height: 300px;padding: 24px;"><div style="display: flex;justify-content: center;align-items: center"><div class="cardBody" style="width: 624px;background-color: #fff;border-bottom: 1px solid #e0e0e0;padding: 0 24px;height: 200px;"><div> <div style="padding-top: 20px;">I have invited you to fill in a form: ${message}</div><h2 style="color: rgb(103, 58, 183);">${subject}</h2><a href="${config.frontendUrl}/response/submit/${formId}" target="_blank"><button style="color: #fff;background-color: rgb(103, 58, 183);border-radius: 3px;font-size: 13px;font-weight: 700;height: 40px;line-height: 40px;text-align: center;border: 1px solid #e0e0e0;padding: 0 24px;cursor: pointer;">FILL OUT FORM</button></a></div></div></div><div style="padding: 20px 0;display: flex;justify-content: center; align-items: center;"><span style="width:670px">Develop by jay khant</span></div></div></body></html>`
                    },
                    Text: {
                        Charset: "UTF-8",
                        Data: "Hello"
                    }
                },
                Subject: {
                    Charset: "UTF-8",
                    Data: subject
                }
            },
            Source: "jay.khant.79@gmail.com"
        };

        try {
            await this.ses.sendEmail(params).promise();
        } catch (error) {
            throw error
        }
    }
}

export default EmailHelper