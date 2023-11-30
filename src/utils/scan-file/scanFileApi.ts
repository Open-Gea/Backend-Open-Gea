import axios from 'axios'
import { YvYError } from '../error';
import FormData from 'form-data';
import fs from 'fs';
import { ScanResult } from './scanResult.type';

const username = process.env.SCANII_USER || '';
const password = process.env.SCANII_PASS || '';

const auth = {
  username: username,
  password: password
};

const apiUrl = 'https://api-us1.scanii.com/v2.2/files';

export async function scanFileApi(filepath: string): Promise<ScanResult | YvYError>{

  const form = new FormData();
  form.append('file', fs.createReadStream(filepath));
  
  const result = await axios.post(apiUrl, form, {
    auth: auth,
  })
  .then(({ data }) => data.findings)
  .catch(err => {
    console.log(err);
    return new YvYError('Cant send request to scanii api', 400, err.message)
  });
    return {badFiles: result} as ScanResult
} 
