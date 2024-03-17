
FROM node:21.2.0-alpine

WORKDIR /app
COPY . .
RUN npm install
RUN npm install --save @types/multer
EXPOSE 3000

RUN npm install @prisma/adapter-pg
RUN npx prisma generate
# RUN npm install pg


CMD ["npm", "run", "start"]
