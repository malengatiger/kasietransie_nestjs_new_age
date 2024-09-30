import { Injectable, Logger } from '@nestjs/common';
import * as archiver from 'archiver';
import { File } from 'buffer';
import * as fs from 'fs';
import * as path from 'path';
const mm = '🍎🍎🍎 FileArchiverService: 🍎🍎🍎';

@Injectable()
export class FileArchiverService {
  async zip(fileContents: { content: string }[]): Promise<string> {
    const timestamp = Date.now().toString();
    const randomString = Math.random().toString(36).substring(2, 8);
    const key = `${timestamp}_${randomString}`;
    const zipFileName = `file${key}.zip`;

     // Create 'tempZips' folder if it doesn't exist
     const tempZipsDir = path.join(__dirname, '..', 'tempZips');
     if (!fs.existsSync(tempZipsDir)) {
       fs.mkdirSync(tempZipsDir);
     }
 
     // Construct the full path for the zip file inside 'tempZips'
     const zipFilePath = path.join(tempZipsDir, zipFileName);
 
    const sizeInMB = (fileContents[0].content.length / (1024 * 1024)).toFixed(2); 
    Logger.log(`${mm} string content to be zipped: ${sizeInMB}MB`);
    const resultPath = new Promise<string>((resolve, reject) => {
      const output = fs.createWriteStream(zipFilePath);
      const archive = archiver('zip', { zlib: { level: 9 } });

      output.on('data', (chunk) => {
        Logger.log(`${mm} ... on data: chunk length: ${chunk.length} bytes`);
      });
      output.on('close', () => {
        Logger.log(`${mm} ... onClose .. resolved the Promise`);
        resolve(zipFilePath);
      });

      archive.on('error', (error: any) => {
        Logger.log(`${mm} ... archive error: ${error}`);
        reject(error);
      });

      archive.pipe(output);

      for (const file of fileContents) {
        archive.append(file.content, { name: zipFileName });
      }
      //
      Logger.log(`${mm} ... finalize archive: file zipped??`);

      archive.finalize();
    });
    Logger.debug(`${mm} zipped file path: 🥬 \n🥬${await resultPath}🥬`);
    return resultPath;
  }
}
