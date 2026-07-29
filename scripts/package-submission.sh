#!/usr/bin/env sh
set -eu

npm test
npm run build
rm -f submission.zip
zip -q -r submission.zip \
  README.md ARCHITECTURE.md PROMPTS.md PLAN.md FIELD_MAPPING.md VIDEO.md \
  package.json index.html src test scripts data postman Dockerfile compose.yaml .dockerignore .gitignore \
  -x 'dist/*' 'node_modules/*' 'coverage/*' '*.zip' '*.mp4'
echo "Created submission.zip ($(du -h submission.zip | cut -f1))."
