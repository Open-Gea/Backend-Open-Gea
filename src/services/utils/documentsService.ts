import * as ibm_boto3 from 'ibm-cos-sdk';
import { Request, Response } from 'express';
import * as uuid from 'uuid';
import dotenv from 'dotenv';

dotenv.config();

const COS_API_KEY_ID = process.env.COS_API_KEY_ID;
const COS_INSTANCE_CRN = process.env.COS_INSTANCE_CRN;
const COS_ENDPOINT = process.env.COS_ENDPOINT;
const BASE_URL= process.env.BASE_URL;
const FILE_BUCKET= process.env.FILE_BUCKET;

const cos = COS_API_KEY_ID ? new ibm_boto3.S3({
  ibmAuthEndpoint: 'https://iam.cloud.ibm.com/identity/token',
  serviceInstanceId: COS_INSTANCE_CRN,
  endpoint: COS_ENDPOINT,
  apiKeyId: COS_API_KEY_ID
}) : undefined;

interface CustomRequest {
  file?: {
    fieldname: string;
    buffer: Buffer;
    originalname: string;
    mimetype:string;
  };
}

async function fileExists(fileName: string): Promise<boolean> {
  if(cos){
    console.log(`Retrieving bucket contents from: ${FILE_BUCKET}`);
    try {
      let flag = false;
      const files =  await cos.listObjectsV2({ Bucket: FILE_BUCKET as string }).promise();
      for (const file of files.Contents || []) {
        if (fileName === file.Key) {
          flag = true;
        }
        console.log(`Item: ${file.Key} (${file.Size} bytes)`);
      }
      return flag;
    } catch (e) {
      console.log(`Unable to retrieve bucket contents: ${e}`);
      return false;
    }
  }
  return false;
}

async function deleteItem(objectName: string): Promise<boolean> {
  if(cos){

    try {
      await cos.deleteObject({ Bucket: FILE_BUCKET as string, Key: objectName }).promise();
      console.log(`Item: ${objectName} deleted!`);
      return true;
    } catch (e) {
      console.log(`Unable to delete object: ${e}`);
      return false;
    }
  }
  return false;
}

 export async function uploadFile(req: CustomRequest, res: any): Promise<any> {
  if(cos){

    try {
      console.log(`Starting file transfer for ${req.file?.fieldname} to bucket: ${FILE_BUCKET}`);
  
      if (!req.file) {
        return null;
      }
      req.file.fieldname = "pdf";
      if(req.file.mimetype == 'image/jpeg'){
        req.file.fieldname = "jpg"
      }
      if(req.file.mimetype == 'image/png'){
        req.file.fieldname = "png"
      }
      const dataExtension = req.file.fieldname.split('.');
      let itemId = `${uuid.v4()}.${dataExtension[dataExtension.length - 1]}`;
  
      // Check if filename already exists
      const cloudFiles = await getBucketContents(FILE_BUCKET as string);
      while (cloudFiles.includes(itemId)) {
        itemId = `${uuid.v4()}.${dataExtension[dataExtension.length - 1]}`;
      }
  
      const dataText = req.file.buffer;
      await cos.putObject({ Bucket: FILE_BUCKET as string, Key: itemId, Body: dataText }).promise();
  
      const objectData = {
        filename: req.file.originalname,
        file_id: itemId,
        size: dataText.byteLength,
        url: `${BASE_URL}${itemId}`,
      };
      const response = {
        success: true,
        data: objectData,
      };
      console.log(`Transfer for ${req.file.fieldname} complete! with name ${itemId}`);
      return response
    } catch (e) {
      console.log(`Unable to upload file: ${e}`);
      return null;
    }
  }
  return null;
}

async function getBucketContents(bucketName: string): Promise<string[]> {
  if(cos){
    console.log(`Retrieving bucket contents from: ${bucketName}`);
    var filenames : any;
    try {
      const data = await cos.listObjectsV2({ Bucket: bucketName }).promise();
      filenames = data.Contents?.map(obj => obj.Key).filter(key => key !== undefined);
      return filenames;
    
    } catch (e) {
      console.log(`Unable to retrieve bucket contents: ${e}`);
      return [];
    }
  }
  return []
}