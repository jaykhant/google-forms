FROM public.ecr.aws/bitnami/node:16-prod-debian-10

EXPOSE 4000

WORKDIR /usr/src

COPY . .
RUN npm config set unsafe-perm true
RUN npm install
RUN npm uninstall bcrypt
RUN npm i bcrypt
RUN npm run build

CMD [ "node", "dist/index.js" ]
