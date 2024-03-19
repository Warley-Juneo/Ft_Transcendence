
FROM node:21.2.0-alpine

WORKDIR /app
COPY . .
RUN npm install
RUN npm install --save @types/multer

#RUN npm install @prisma/adapter-pg
# RUN npx prisma migrate dev
RUN npx prisma generate
# RUN npm install pg

EXPOSE 3000

CMD ["npm", "run", "start"]
