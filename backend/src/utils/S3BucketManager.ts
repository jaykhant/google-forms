import AWS from 'aws-sdk'
import { DeleteObjectsRequest } from 'aws-sdk/clients/s3';
import fs from 'fs'
import httpStatus from 'http-status';
import config from '../config/index'
import ApiError from './ApiError'

class S3BucketManager {
  s3;

  bucketInfo = {
    Bucket: 'google-form-storage',
    ContentType: 'image/*, text/*',
  };

  constructor() {
    AWS.config.update({ region: 'ap-south-1' });

    this.s3 = new AWS.S3({
      accessKeyId: config.awsAccess.accessKeyId,
      secretAccessKey: config.awsAccess.secretAccessKey,
    });
  }

  generateSignedUrlForUpload(
    folderName: string,
    imageName: string,
    ext: string,
  ) {
    try {
      const name = `${imageName}.${ext}`
      const signedUrl = this.s3.getSignedUrl('putObject', {
        ...this.bucketInfo,
        Key: `${folderName}/${name}`,
        Expires: 60 * 5, // 5 minutes
      });
      console.log(signedUrl);

      return { signedUrl, name };
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      throw new ApiError(httpStatus.INTERNAL_SERVER_ERROR, `S3 bucket error: ${error.message}`);
    }
  }

  async generateSignedUrlForDownload(
    folderName: string,
    imageName: string,
    ext: string,
  ) {
    try {
      const name = `${imageName}.${ext}`
      const signedUrl =  this.s3.getSignedUrl('getObject', {
        Bucket: this.bucketInfo.Bucket,
        Key: `${folderName}/${name}`,
        Expires: 60 * 5, // 5 minutes
      });
      console.log(signedUrl);

    } catch (error: any) {
      throw new ApiError(httpStatus.INTERNAL_SERVER_ERROR, `S3 bucket error: ${error.message}`);
    }
  }

  async getObject(
    folderName: string,
    name: string
  ) {
    return new Promise<void>((resolve, reject) => {
      try {

        if (!fs.existsSync(folderName)) {
          fs.mkdirSync(folderName);
        }

        const getObjectRequest = this.s3.getObject({
          Bucket: this.bucketInfo.Bucket,
          Key: `${folderName}/${name}`
        })

        const writeStream = fs.createWriteStream(`${folderName}/${name}`);
        const readStream = getObjectRequest.createReadStream().on('error', () => {
          reject(new ApiError(httpStatus.BAD_REQUEST, 'File not found in s3 bucket.'))
        }).pipe(writeStream)
        readStream.on('close', () => {
          resolve()
        })
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
      } catch (error: any) {
        reject(`S3 bucket error: ${error.message}`)
      }
    })
  }

  //TODO: verift that this is working properly - __ is forlderName
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  async removeObjects(__: string) {
    return new Promise<void>((resolve, reject) => {
      const params: RemoveObjectParam = {
        Bucket: this.bucketInfo.Bucket,
      };

      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      this.s3.listObjects(params, (err, data: any) => {
        if (err) reject(err);

        console.log("data", data, err)
        if (data.Contents.length == 0) resolve();

        params.Delete = { Objects: [] };

        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        data.Contents.forEach(function (content: any) {
          params.Delete?.Objects?.push({ Key: content.Key });
        });

        console.log("params", params)

        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        this.s3.deleteObjects(params as DeleteObjectsRequest, function (err, data: any) {
          if (err) reject(err);
          resolve(data)
        });
      })
    })
  }
}

type RemoveObjectParam = {
  Bucket: string,
  Delete?: {
    Objects: object[] | null,
  }
}

// const s3BucketManager = new S3BucketManager()
// this.responseHandler = async (err, data) => {
//   if(err) console.log("error", err)
//   console.log(data)
//   if (data.IsTruncated) {
//     await s3BucketManager.removeObjects({ folderName: 'Red flower' }, this.responseHandler)
//   }
// }
// s3BucketManager.removeObjects({ folderName: 'Red flower' }).then(this.responseHandler)

export default S3BucketManager