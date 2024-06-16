export default interface IVideoConsumerService {
  consumerBuffer(buffer: Buffer): void;
  getVideoBuffer(): Buffer;
  getVideoBufferChunks(): Buffer[];
  editVideoBuffer(): void;
}
