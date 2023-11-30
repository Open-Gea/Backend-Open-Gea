
import NodeClam from 'clamscan';
import { scanOptions } from './nodeClam.config';
import { YvYError } from '../error';

import path from "path";
import { ScanResult } from './scanResult.type';

const currentPath = process.cwd();

const scanPath = path.join(currentPath, 'uploads/cache');

export async function scanFile(): Promise<ScanResult | YvYError> {
    try {
        // Get instance by resolving ClamScan promise object
        const clamscan =  new NodeClam().init(scanOptions)
        const response = (await clamscan).scanDir(scanPath);
        return {badFiles: (await response).badFiles} as ScanResult
    } catch (err) {
        console.log(err);
        return new YvYError('Cant Scan File', 500, err.message)
    }
}