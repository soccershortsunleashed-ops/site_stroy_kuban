set -e
APP_DIR=/var/www/site_stroy_kuban/web
ARCH=/tmp/web_deploy_20260526-164102.tgz
[ -d "$APP_DIR" ]
if [ -f "$APP_DIR/.env" ]; then cp "$APP_DIR/.env" /tmp/site_stroy_kuban.env.backup; fi
find "$APP_DIR" -mindepth 1 -maxdepth 1 ! -name ".env" -exec rm -rf {} +
tar -xzf "$ARCH" -C "$APP_DIR"
if [ -f /tmp/site_stroy_kuban.env.backup ]; then mv /tmp/site_stroy_kuban.env.backup "$APP_DIR/.env"; fi
cd "$APP_DIR"
npm ci
npm run build
pm2 restart site-stroy-kuban
pm2 save
pm2 list
curl -I -s http://127.0.0.1:3000/ | head -n 5
