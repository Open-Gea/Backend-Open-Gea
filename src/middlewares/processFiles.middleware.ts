import { NextFunction, Request, Response } from "express";
import * as fileService from '../services/utils/documentsService';
import { urls } from "../models/farm/farm";

export const processFiles = async (req: Request, res: Response, next: NextFunction) => {
    if (req.method === 'OPTIONS') {
        next();
    } else {
        const {files, ...rest} = req.body;
        req.body = rest;
        if(typeof(req.body.urls) === 'string') req.body.urls = JSON.parse(req.body.urls)
        if(!req.files || req.files.length === 0)  next();
        else{
            const newUrls : urls[] = [];
            for(let i=0; i< Number(req.files.length); i++){
                req.file = req.files[i];
                const uploadFile = await fileService.uploadFile(req as any, res);
                newUrls.push({
                        url: uploadFile.data.url,
                        file_id: uploadFile.data.file_id,
                        filename: uploadFile.data.filename,
                        size: uploadFile.data.size,
                        fechaCarga: new Date().toLocaleDateString()
                      });
            }
            const urls = req.body.urls;
            if(urls) req.body.urls = [...urls, ...newUrls];
            else req.body.urls = newUrls;
            next();
        }
    }
  };