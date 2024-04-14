import B2 from "backblaze-b2";

export const b2 = new B2({
    applicationKeyId: process.env.BACKBLAZE_APP_KEY_ID!,
    applicationKey: process.env.BACKBLAZE_APP_KEY!,
});

export async function getBucket() {
    try {
        await b2.authorize(); // must authorize first (authorization lasts 24 hrs)
        let response = await b2.getBucket({ bucketName: process.env.BACKBLAZE_BUCKET_NAME! });
    } catch (err) {
        console.log("Error getting bucket:", err);
    }
}
