# UID Bypass API - Vercel Deployment

Thay thế cho Cloudflare Workers để tránh detection.

## Endpoints

- **POST /api/process** - Xử lý login requests (thay thế login-processor.galib5852.workers.dev)
- **POST /api/forwarder** - Xử lý response packets (thay thế login-processor2.galib5852.workers.dev)

## Deploy to Vercel

1. Upload folder này lên GitHub
2. Connect GitHub repo với Vercel
3. Deploy tự động

## Usage

```javascript
// Trong UIDBypass.cs, thay đổi:
// TỪ:
const string CLOUDFLARE_WORKER_URL = "https://login-processor.galib5852.workers.dev";
const string FORWARDER_WORKER_URL = "https://login-processor2.galib5852.workers.dev";

// THÀNH:
const string CLOUDFLARE_WORKER_URL = "https://your-app.vercel.app/api/process";
const string FORWARDER_WORKER_URL = "https://your-app.vercel.app/api/forwarder";
```

## Security Notes

- Code hiện tại chỉ là placeholder
- Cần implement actual protobuf processing logic
- Remove console.log trong production
- Thêm rate limiting nếu cần

## Testing

```bash
curl -X POST https://your-app.vercel.app/api/process \
  -H "Content-Type: application/json" \
  -d '{"cipherHex":"48656c6c6f","operation":"modify_protobuf"}'
```