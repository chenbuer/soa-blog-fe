FROM index.alauda.cn/tutum/centos
MAINTAINER chenbuer <chenzy@126.com>
EXPOSE 80
RUN mkdir -p /conf/ && mkdir -p /home/nginx && mkdir -p /data/

WORKDIR /home/nginx

RUN ["yum","install","nginx","-y"]

ADD ./dist /data
ADD /conf/nginx.conf /etc/nginx/
ADD run.sh /home/nginx
RUN chmod 777 /home/nginx/run.sh

#CMD ./run.sh
