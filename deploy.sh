#!/bin/bash

echo " 빌드 시작..."
cd /home/ubuntu/Jeonse-ive-FE || exit 1

npm install
npm run build

echo " dist 복사 중..."
sudo rm -rf /home/ubuntu/dist
sudo cp -r dist /home/ubuntu/
sudo chown -R www-data:www-data /home/ubuntu/dist
sudo chmod -R 755 /home/ubuntu/dist
sudo chmod +x /home /home/ubuntu

echo " Nginx 리로드"
sudo systemctl reload nginx

echo " 배포 완료!"