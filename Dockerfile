FROM keymetrics/pm2
WORKDIR /usr/src/app
ADD . /usr/src/app
RUN npm config set https://registry.npm.taobao.org/ && \ 
    npm i
EXPOSE 3000
CMD ["pm2-runtime","start","process.yml"]

