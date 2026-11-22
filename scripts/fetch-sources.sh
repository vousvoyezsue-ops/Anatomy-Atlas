#!/usr/bin/env bash
# Fetches the BodyParts3D sources the model build needs into .sources/,
# each at a pinned commit so every build gives the same model:
#   4.0  github.com/tamir-ichikawa/human-atlas      (dist/assets, ~110 MB)
#   4.3  github.com/olivercase/body_parts_3d_api    (LFS pointers only; the build
#        downloads the few meshes it uses into .cache/)
# 3.0 needs no step here: the build downloads its few STL files itself.
set -euo pipefail
cd "$(dirname "$0")/.."
mkdir -p .sources

fetch() { # <folder> <repo url> <commit>
  local dir=".sources/$1"
  if [ "$(git -C "$dir" rev-parse HEAD 2>/dev/null)" = "$3" ]; then
    echo "$1: up to date"
    return
  fi
  rm -rf "$dir"
  git init -q "$dir"
  git -C "$dir" remote add origin "$2"
  GIT_LFS_SKIP_SMUDGE=1 git -C "$dir" fetch -q --depth 1 origin "$3"
  GIT_LFS_SKIP_SMUDGE=1 git -C "$dir" -c advice.detachedHead=false checkout -q FETCH_HEAD
  echo "$1: $3"
}

fetch human-atlas https://github.com/tamir-ichikawa/human-atlas 362e79033e598745ef7a6693a89bdb111c6ec6c7
fetch body_parts_3d_api https://github.com/olivercase/body_parts_3d_api fd527e6f4daf732fd814314d9257df5877b844bc
