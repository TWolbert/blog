import { NextRequest, NextResponse } from "next/server";
import { db } from "../Database/schema";
import { hash } from "bcryptjs";
import Blog from "../Models/Blog";
import Image from "../Models/Image";
import fs from "fs"
import sharp from "sharp";
import { b2, getBucket } from "../storage/.backblaze";

export async function store(request: NextRequest | null): Promise<NextResponse<unknown>> {
    const { file }: { file: string } = await request?.json();

    const buffer = Buffer.from(file.split(',')[1], 'base64');

    const resized = await sharp(buffer)
        .resize({ height: 1000 })
        .toBuffer();

    await getBucket();

    const uploadUrl = await b2.getUploadUrl({
        bucketId: process.env.BACKBLAZE_BUCKET_ID!
    })

    const upload = await b2.uploadFile({
        uploadUrl: uploadUrl.data.uploadUrl,
        uploadAuthToken: uploadUrl.data.authorizationToken,
        fileName: `${Date.now()}.png`,
        data: resized
    })

    if (upload.status === 200) { 
        const newImage = await db.insert(Image.getPG()).values({ path: upload.data.fileName });
        return NextResponse.json({
            message: "Image created",
            data: newImage
        })
    }

    return NextResponse.json({
        message: "Image not created",
        data: {}
    })
}

export async function show(request: NextRequest | null = null): Promise<NextResponse<unknown>> {
    const id = parseInt(request?.nextUrl.href.split("/").pop()!);
    const { path } = await Image.getImageById(id)

    if (!path) { 
        // Send empty file as response
        return NextResponse.json({
            message: "Image not found",
            data: {}
        })
    }

    getBucket();

    const auth = await b2.authorize();

    const downloadAuth = await b2.getDownloadAuthorization({
        bucketId: process.env.BACKBLAZE_BUCKET_ID!,
        fileNamePrefix: path,
        validDurationInSeconds: 60,
    })

    const file = await b2.downloadFileByName({ 
        bucketName: process.env.BACKBLAZE_BUCKET_NAME!,
        fileName: path,
        responseType: "arraybuffer"
    })

    return new NextResponse(file.data, {
        headers: {
            "Content-Type": "image/png",
            "Cache-Control": "public, max-age=31536000, immutable"
        }
    });
}