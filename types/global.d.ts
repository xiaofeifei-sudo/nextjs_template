declare namespace NodeJS {
  interface ProcessEnv {
    NEXT_PUBLIC_APP_ENV: string;
    NEXT_PUBLIC_APP_URL?: string;
    NEXT_PUBLIC_API_URL: string;
    NEXT_PUBLIC_SOCKET_URL: string;
    NEXT_PUBLIC_APP_ACCESS_KEY: string;
    NEXT_PUBLIC_APP_END_KEY: string;
    NEXT_PUBLIC_APP_LOG_PATH_NAME: string;
    NEXT_PUBLIC_QR_CODE_DECRYPT_KEY: string;
    NEXT_PUBLIC_ASSETS_MINIO_BUCKET_NAME: string;
    NEXT_PUBLIC_ASSETS_MINIO_UPLOAD_BUCKET_NAME: string;
    NEXT_PUBLIC_APP_ID: string;
    NEXT_PUBLIC_OSS_URL: string;
    NEXT_PUBLIC_AGREEMENT_URL: string;
    NEXT_PUBLIC_PRIVACY_POLICY_URL: string;
    NEXT_PUBLIC_API_AK?: string;
    NEXT_PUBLIC_API_SK?: string;
    AK?: string;
    SK?: string;
  }
}
