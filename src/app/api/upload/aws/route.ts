"use server"
import { S3Client, PutObjectCommand } from "@aws-sdk/client-s3"
import { NextRequest, NextResponse } from "next/server"

const s3Client = new S3Client({
  region: process.env.AWS_BUCKET_REGION!,
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY!,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY!,
  },
})

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData()
    const files = formData.getAll("files") as File[]

    if (!files || files.length === 0) {
      return NextResponse.json({ error: "No files uploaded" }, { status: 400 })
    }

    const uploadedFiles = await Promise.all(
      files.map(async (file) => {
        if (file.size > 5 * 1024 * 1024) {
          throw new Error(`File ${file.name} exceeds 5MB limit`)
        }

        const buffer = Buffer.from(await file.arrayBuffer())

        const filename = `${Date.now()}-${file.name}`

        const uploadParams = {
          Bucket: process.env.AWS_BUCKET_NAME!,
          Key: filename,
          Body: buffer,
          ContentType: file.type,
        }

        await s3Client.send(new PutObjectCommand(uploadParams))

        const fileUrl = `https://${process.env.AWS_BUCKET_NAME}.s3.${process.env.AWS_BUCKET_REGION}.amazonaws.com/${filename}`

        return {
          originalName: file.name,
          filename,
          fileUrl,
          fileType: file.type,
          fileSize: file.size,
        }
      })
    )

    return NextResponse.json({
      message: "Files uploaded successfully",
      files: uploadedFiles,
    })
  } catch (error) {
    console.error("Upload error:", error)
    return NextResponse.json(
      {
        error: error instanceof Error ? error.message : "Error uploading files",
      },
      { status: 500 }
    )
  }
}
