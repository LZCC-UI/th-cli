FROM nginx


MAINTAINER wangxiaoming

RUN ln -sf /dev/stdout /var/log/nginx/access.log
RUN ln -sf /dev/stderr /var/log/nginx/error.log

#将配置文件拷贝的文件拷贝到nginx的相应目录
COPY nignxConfig/nginx.conf /etc/nginx/nginx.conf
COPY nignxConfig/default.conf /etc/nginx/conf.d/default.conf

#将build 产生的文件 dist拷贝的文件拷贝到nginx的相应目录
COPY dist/*.* /usr/share/nginx/html/
COPY dist/static/css/* /usr/share/nginx/html/static/css/
COPY dist/static/fonts/* /usr/share/nginx/html/static/fonts/
COPY dist/static/img/* /usr/share/nginx/html/static/img/
COPY dist/static/js/* /usr/share/nginx/html/static/js/


