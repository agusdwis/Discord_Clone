FROM nginx:stable
MAINTAINER your_name "your_email"

RUN mkdir -p /home/discord/www/frontend/build
RUN mkdir -p /home/discord/log
RUN mkdir -p /home/discord/cert

COPY default.conf /etc/nginx/conf.d/
ADD /build/. /home/discord/www/frontend/build

WORKDIR /home/discord/www/frontend/build
