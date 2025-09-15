FROM node:22

COPY astro /blog
WORKDIR /blog

RUN npm install -g astro \
    && npm install

RUN npm install playwright \
    && npx playwright install --with-deps chromium

ENV HOST=0.0.0.0
ENV PORT=4321
EXPOSE 4321
CMD ["npm", "run", "dev", "-- --host 0.0.0.0"]
