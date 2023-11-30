import { NextFunction, Request, Response, Router } from "express";
import { StatusCodes } from "http-status-codes";

import multer from "multer";
import { YvYError, isAnError } from "../../utils/error";
import fs from "fs";
import { scanFile } from "../../utils/scan-file/scanFile";
import { scanFileApi} from "../../utils/scan-file/scanFileApi";
import { ScanResult } from "../../utils/scan-file/scanResult.type";
export default function scanFileRouter() : Router{

    const storage = multer.diskStorage({
        destination: 'uploads/cache', 
        filename: (req, file, cb) => {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
        cb(null, file.fieldname + '-' + uniqueSuffix + file.originalname); 
    },
    });

    const upload = multer({ storage: storage });

    const filesDir = process.cwd() + '/uploads/cache';

    return Router()
        .post('/', upload.single('file'), async (req: Request, res: Response, next: NextFunction) => {
            
            const filePath = filesDir + `/${req.file?.filename}`;
            let result : ScanResult | YvYError = await scanFileApi(filePath);
            if(isAnError(result)){ 
                result = await scanFile();
            }
            
            if (req.file) { 
                try{
                    fs.unlink(req.file.path, (err) => {
                        if (err) {
                            console.error("Error al borrar el archivo del caché: " + err.message);
                            result = new YvYError('fileError', 500, err.message)         
                        } else {
                            console.log("Archivo del caché eliminado con éxito.");
                        }
                    })
                }
                catch(e){
                    result = new YvYError('fs error', 500, e.message)
                }
                
            }
            if (isAnError(result)) {
              next(result);
              return;
            }
            console.log(result);
            return res.status(StatusCodes.OK).json(result.badFiles.length > 0);
            
          })
}