echo "-- Install --"
# Install dependencies
npm i

echo "-- Build --"
# Build
npm run build

echo "-- Deploy --"
# Sync build with our S3 bucket
aws s3 sync build s3://daily-kicks