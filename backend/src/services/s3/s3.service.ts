// import fs from 'fs';
import path from 'path';
import mime from 'mime-types';
import AWSs3, { DeleteObjectOutput, ManagedUpload } from 'aws-sdk/clients/s3';
import { PromiseResult } from 'aws-sdk/lib/request';
import { AWSError } from 'aws-sdk/lib/error';
import { HttpError } from 'exceptions/exceptions';
import { CommonKey, HttpCode, HttpErrorMessage } from 'common/enums/enums';
import { getKeyFromObjectLocation } from 'helpers/helpers';
import { UserDto } from 'smart-typer-shared/common/types/types';

type Constructor = {
  accessKeyId: string;
  secretAccessKey: string;
  bucketName: string;
  region: string;
};

class S3 {
  private _s3: AWSs3;
  private _bucketName: string;

  public constructor(params: Constructor) {
    const { accessKeyId, secretAccessKey, bucketName, region } = params;
    this._s3 = new AWSs3({
      accessKeyId,
      secretAccessKey,
      signatureVersion: 'v4',
      region,
    });
    this._bucketName = bucketName;
  }

  public async doesFileExistInS3(fileName: string): Promise<boolean> {
    try {
      const params = { Bucket: this._bucketName, Key: fileName };
      await this._s3.headObject(params).promise();
      return true;
    } catch {
      return false;
    }
  }

  public async deleteInS3(
    fileName: string,
  ): Promise<PromiseResult<DeleteObjectOutput, AWSError>> {
    const params = { Bucket: this._bucketName, Key: fileName };
    return this._s3.deleteObject(params).promise();
  }

  public async uploadToS3(
    userId: UserDto[CommonKey.ID],
    file: Express.Multer.File,
  ): Promise<ManagedUpload.SendData> {
    // const fileStream = fs.createReadStream(file.path);

    const fileName =
      userId + '.' + Date.now() + path.extname(file.originalname);
    const fileType = file.path ? mime.lookup(file.path) : file.mimetype;

    if (!fileType) {
      throw new HttpError({
        status: HttpCode.UNPROCESSABLE_ENTITY,
        message: HttpErrorMessage.INVALID_FILE_TYPE,
      });
    }
    const type = mime.contentType(fileType);

    const uploadParams = {
      Bucket: this._bucketName,
      Body: file.buffer,
      Key: fileName,
      ContentType: type || undefined,
    };

    return this._s3.upload(uploadParams).promise();
  }

  public async getSignedUrl(location: string): Promise<string> {
    const key = getKeyFromObjectLocation(location);
    const params = {
      Bucket: this._bucketName,
      Key: key,
      ResponseContentDisposition: 'inline',
      ResponseContentType: 'application/octet-stream',
    };
    return this._s3.getSignedUrlPromise('getObject', params);
  }
}

export { S3 };
