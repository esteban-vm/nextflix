'use server'

import fs from 'fs'
import path from 'path'
import sharp from 'sharp'

async function getFileBufferRemote(url: string) {
  const response = await fetch(url)
  return Buffer.from(await response.arrayBuffer())
}

async function getFileBufferLocal(filepath: string) {
  const realFilepath = path.join(process.cwd(), 'public', filepath)
  return await fs.promises.readFile(realFilepath)
}

function getFileBuffer(src: string) {
  const isRemote = src.startsWith('http')
  return isRemote ? getFileBufferRemote(src) : getFileBufferLocal(src)
}

function toBase64PNG(str: string) {
  return `data:image/png;base64,${str}`
}

export async function getPlaceholderImage(str: string) {
  try {
    const originalBuffer = await getFileBuffer(str)
    const resizedBuffer = await sharp(originalBuffer).resize(20).toBuffer()
    return toBase64PNG(resizedBuffer.toString('base64'))
  } catch {
    const str = 'iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mOsa2yqBwAFCAICLICSyQAAAABJRU5ErkJggg=='
    return toBase64PNG(str)
  }
}
