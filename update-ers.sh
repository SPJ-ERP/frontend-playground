#!/bin/bash

set -e

REPO_URL="https://github.com/SPJ-ERP/ers-resources.git"
TARGET_DIR="ers-resources"

echo ""
echo "=== ERS Resources Updater ==="
echo ""

if [ -d "$TARGET_DIR" ]; then
  echo "[Reset] Folder $TARGET_DIR found. Removing..."
  echo ""
  rm -rf "$TARGET_DIR"
fi

echo "[Cloning] Cloning fresh copy into $TARGET_DIR..."
echo ""
git clone --branch main --depth 1 "$REPO_URL" "$TARGET_DIR"

echo "[Cleanup] Removing .git directory..."
rm -rf "$TARGET_DIR/.git"

echo ""
echo "[Done] $TARGET_DIR"