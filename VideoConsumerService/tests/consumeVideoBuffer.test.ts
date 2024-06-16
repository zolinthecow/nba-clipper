import { expect, test } from 'vitest';
import * as fs from 'fs';
import VideoConsumerService from '../VideoConsumerService';

const SAMPLE_MP4_PATH = 'sample-footage.mp4';

function compareBufferArrays(arr1: Buffer[], arr2: Buffer[]): boolean {
  if (arr1.length !== arr2.length) {
    return false;
  }

  for (let i = 0; i < arr1.length; i++) {
    if (!arr1[i].equals(arr2[i])) {
      return false;
    }
  }

  return true;
}

test('reads two chunks of the video stream', async () => {
  const videoConsumerService = new VideoConsumerService();

  const firstTwoBuffers: Buffer[] = [];

  await new Promise<void>((resolve, reject) => {
    const videoStream = fs.createReadStream(SAMPLE_MP4_PATH);

    videoStream.on('data', (chunk: Buffer) => {
      if (firstTwoBuffers.length < 2) {
        firstTwoBuffers.push(chunk);
        videoConsumerService.consumeBuffer(chunk);
      } else {
        videoStream.destroy();
      }
    });

    videoStream.on('close', () => {
      resolve();
    });

    videoStream.on('error', (err) => {
      reject(err);
    });
  });

  expect(
    compareBufferArrays(
      firstTwoBuffers,
      videoConsumerService.getVideoBufferChunks(),
    ),
  ).toBe(true);
  expect(
    Buffer.concat(firstTwoBuffers).equals(
      videoConsumerService.getVideoBuffer(),
    ),
  ).toBe(true);
});

test('reads entire video stream', async () => {
  const videoConsumerService = new VideoConsumerService();

  const videoBuffer = await new Promise<Buffer>((resolve, reject) => {
    const videoStream = fs.createReadStream(SAMPLE_MP4_PATH);
    const chunks: Buffer[] = [];

    videoStream.on('data', (chunk: Buffer) => {
      chunks.push(chunk);
      videoConsumerService.consumeBuffer(chunk);
    });

    videoStream.on('close', () => {
      resolve(Buffer.concat(chunks));
    });

    videoStream.on('error', (err) => {
      reject(err);
    });
  });

  expect(videoBuffer.equals(videoConsumerService.getVideoBuffer())).toBe(true);
});
