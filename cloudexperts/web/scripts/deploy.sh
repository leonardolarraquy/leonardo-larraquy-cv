#!/usr/bin/env bash
set -euo pipefail

# CloudExperts deploy to S3 + CloudFront
# Usage: S3_BUCKET=my-bucket CLOUDFRONT_ID=E123456 ./deploy.sh

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
WEB_DIR="$(dirname "$SCRIPT_DIR")"

cd "$WEB_DIR"

echo "Building site..."
npm run build

S3_BUCKET="${S3_BUCKET:-cloudexperts-site}"
CLOUDFRONT_ID="${CLOUDFRONT_ID:-}"

echo "Syncing to s3://${S3_BUCKET}..."
aws s3 sync dist/ "s3://${S3_BUCKET}" --delete \
  --cache-control "public,max-age=31536000,immutable" \
  --exclude "index.html" \
  --exclude "*.html" \
  --exclude "sitemap.xml" \
  --exclude "robots.txt"

aws s3 sync dist/ "s3://${S3_BUCKET}" \
  --cache-control "public,max-age=0,must-revalidate" \
  --exclude "*" \
  --include "index.html" \
  --include "*.html" \
  --include "sitemap.xml" \
  --include "robots.txt"

if [ -n "$CLOUDFRONT_ID" ]; then
  echo "Invalidating CloudFront distribution ${CLOUDFRONT_ID}..."
  aws cloudfront create-invalidation --distribution-id "$CLOUDFRONT_ID" --paths "/*"
fi

echo "✅ Deploy complete"
