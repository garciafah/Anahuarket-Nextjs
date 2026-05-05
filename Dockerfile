FROM node:20-alpine
RUN apk add --no-cache openssl libc6-compat

WORKDIR /app

COPY package*.json ./

RUN npm install

RUN npm ci

COPY . .

COPY .env.example .env
COPY prisma ./prisma/

ENV NODE_ENV=local
ENV PORT=3000
ENV HOST=0.0.0.0

RUN npx prisma generate

RUN npm run build

EXPOSE 3000

CMD ["sh", "-c", "npx prisma db push && npm start"]
