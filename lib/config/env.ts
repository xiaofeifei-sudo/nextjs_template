export type AppEnv = 'develop' | 'beta' | 'uat'
export const APP_ENV = (process.env.NEXT_PUBLIC_APP_ENV as AppEnv) || 'develop'
export const env = {
  apiBaseUrl: process.env.NEXT_PUBLIC_API_URL || '/api',
  socketUrl: process.env.NEXT_PUBLIC_SOCKET_URL || '',
  appAccessKey: process.env.NEXT_PUBLIC_APP_ACCESS_KEY || '',
  appEndKey: process.env.NEXT_PUBLIC_APP_END_KEY || '',
  appLogPathName: process.env.NEXT_PUBLIC_APP_LOG_PATH_NAME || '',
  qrCodeDecryptKey: process.env.NEXT_PUBLIC_QR_CODE_DECRYPT_KEY || '',
  assetsMinioBucketName: process.env.NEXT_PUBLIC_ASSETS_MINIO_BUCKET_NAME || '',
  assetsMinioUploadBucketName:
    process.env.NEXT_PUBLIC_ASSETS_MINIO_UPLOAD_BUCKET_NAME || '',
  appId: process.env.NEXT_PUBLIC_APP_ID || '',
  ossUrl: process.env.NEXT_PUBLIC_OSS_URL || '',
  agreement: process.env.NEXT_PUBLIC_AGREEMENT_URL || '',
  privacyPolicy: process.env.NEXT_PUBLIC_PRIVACY_POLICY_URL || '',
} as const
