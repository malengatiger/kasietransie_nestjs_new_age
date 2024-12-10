#!/bin/bash
set -e # Exit immediately if a command exits with a non-zero status.

echo
echo
echo "🔵🐦🔵🐦🔵🐦 Deploying KasieTransie-3 Backend on NestJS to Cloud Run ... 🔵 🔵 🔵 🔵 🔵 🔵"

# Define variables
PROJECT_ID="kasie-transie-3"
IMAGE_NAME="kasie-transie-backend-3"
REGION="europe-west1"
SERVICE_NAME="kasie-transie-backend-3"
echo
echo
echo "🐦🐦🐦 Build the backend app ... 🔵 🔵 🔵 🔵 🔵 🔵"
# npm run build
# echo
# echo "🐦🐦🐦 Build the Docker image ... 🔵 🔵 🔵 🔵 🔵 🔵"
# echo
# # Build the Docker image
# # docker build -t gcr.io/$PROJECT_ID/$IMAGE_NAME .
# docker buildx build --platform linux/amd64 -t gcr.io/$PROJECT_ID/$IMAGE_NAME .    
# echo
# # Push the Docker image to GCR
# echo "🐦🐦🐦 Push the Docker image ... 🔵 🔵 🔵 🔵 🔵 🔵"
# echo
# docker push gcr.io/$PROJECT_ID/$IMAGE_NAME
# echo
echo
echo "🍎 🍎 🍎 🍎 🍎 🍎 🍎 🍎 🍎 start container deployment of app to Cloud Run"
echo
# Deploy the app to Cloud Run
gcloud run deploy --source . kasie-transie-3-backend \
  --platform managed \
  --region europe-west1 \
  --allow-unauthenticated

echo "🍎 🍎 🍎 🍎 🍎 🍎 🍎 🍎 🍎 Hopefully, we have deployed successfully"
echo
# gcloud builds submit --region=europe-west1 --tag gcr.io/kasie-transie-3/ktimage .
echo