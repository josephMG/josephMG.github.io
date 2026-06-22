FROM node:22

WORKDIR /blog

# 先只複製相依清單,利用 layer cache(package*.json 沒變就不重裝)
COPY astro/package.json astro/package-lock.json ./

# 用 lockfile 鎖定的版本安裝(含鎖定的 playwright ^1.56.1 -> 1.60.0)
# --legacy-peer-deps 略過既有的 peer 依賴衝突(astro-embed / @astrolib 等)
RUN npm ci --legacy-peer-deps

# 用「剛剛裝好的鎖定版 playwright」安裝對應的瀏覽器,版本永遠一致,
# 避免之前 `npm install playwright`(latest)造成的 chromium 版本漂移
RUN npx playwright install --with-deps chromium

# 再複製其餘專案檔(node_modules / dist 由 .dockerignore 排除)
COPY astro /blog

ENV HOST=0.0.0.0
ENV PORT=4321
EXPOSE 4321
CMD ["npm", "run", "dev", "-- --host 0.0.0.0"]
