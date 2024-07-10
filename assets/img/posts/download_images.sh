#!/bin/bash

# List of image URLs
urls=(
  "https://hackmd.io/_uploads/HJqwuhZvR.png"
  "https://hackmd.io/_uploads/B1cK_3bPR.png"
  "https://hackmd.io/_uploads/ry-hOhZwR.png"
  "https://hackmd.io/_uploads/H1Gpd2bw0.png"
  "https://hackmd.io/_uploads/HJjRO3-DR.png"
  "https://hackmd.io/_uploads/rJ3kKhbD0.png"
  "https://hackmd.io/_uploads/BJX-KnZv0.png"
  "https://hackmd.io/_uploads/rJrMqhWvR.png"
  "https://hackmd.io/_uploads/r1HQ92-vC.png"
  "https://hackmd.io/_uploads/Skyf_2bw0.png"
  "https://hackmd.io/_uploads/rJa1T2ePR.png"
  "https://hackmd.io/_uploads/r14Xp2gvA.png"
  "https://hackmd.io/_uploads/Hkrop3gw0.png"
  "https://hackmd.io/_uploads/Skwp62ew0.png"
  "https://hackmd.io/_uploads/ryCqn08wA.png"
  "https://hackmd.io/_uploads/By-JdVwvC.png"
  "https://hackmd.io/_uploads/SJuRC5dv0.png"
  "https://hackmd.io/_uploads/HJO3s8jv0.png"
  "https://hackmd.io/_uploads/rkc83UIv0.png"
  "https://hackmd.io/_uploads/S1VznLjDC.png"
  "https://hackmd.io/_uploads/H1jj28ovA.png"
  "https://hackmd.io/_uploads/Sk_jwLjvC.png"
  "https://hackmd.io/_uploads/Hk1UG83vC.png"
)

# Directory to save images
download_dir="./"

# Create directory if it doesn't exist
mkdir -p "$download_dir"

# Function to download images
download_image() {
  local url=$1
  local file_name=$(basename "$url")
  curl -L -o "$download_dir/$file_name" "$url"
  echo "Downloaded $file_name"
}

# Iterate over the URLs and download each image
for url in "${urls[@]}"; do
  download_image "$url"
done
