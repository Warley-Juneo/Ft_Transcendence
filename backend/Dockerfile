
FROM node:21.2.0-alpine

WORKDIR /app
COPY . .
RUN npm install
RUN npm install --save @types/multer
RUN npm run build

#RUN npm install @prisma/adapter-pg
RUN npx prisma generate
# RUN npx prisma migrate deploy
# RUN npm install pg

CMD ["npm", "run", "start:migrate:prod"]
