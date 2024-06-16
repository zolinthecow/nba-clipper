import IVideoConsumerService from './VideoConsumerService.interface';

export default class VideoConsumerService implements IVideoConsumerService {
  private _videoBufferChunks: Buffer[] = [];

  public consumeBuffer(buffer: Buffer): void {
    this._videoBufferChunks.push(buffer);
  }

  public getVideoBuffer(): Buffer {
    return Buffer.concat(this._videoBufferChunks);
  }

  public getVideoBufferChunks(): Buffer[] {
    return this._videoBufferChunks;
  }

  public editVideoBuffer(): void {}
}
