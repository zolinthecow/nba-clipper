export default interface IVideoConsumerService {
  consumeBuffer(buffer: Buffer): void;
  getVideoBuffer(): Buffer;
  getVideoBufferChunks(): Buffer[];
  editVideoBuffer(): void;
}
