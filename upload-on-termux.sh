#!/data/data/com.termux/files/usr/bin/bash
set -e

cd "$HOME/emon-design.github.io"

ZIP="/sdcard/Download/deskwork-resume-blog-ready-to-upload.zip"

if [ ! -f "$ZIP" ]; then
  echo "ZIP not found: $ZIP"
  echo "Download the ZIP into your Android Download folder first."
  exit 1
fi

unzip -o "$ZIP" -d "$HOME/emon-design.github.io"

git add blog/free-resume-templates-create-a-professional-resume-online.html blog/posts.json images/
git commit -m "publish free resume templates blog with examples"
git push

echo "Published successfully."
