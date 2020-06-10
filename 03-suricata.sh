docker rm -f suricata
docker run --name suricata -d --net=host \
  -v /root/docker-elk/suricata/logs/:/var/log/suricata/ \
  -v /root/docker-elk/suricata/etc/:/etc/suricata/ \
  -v /root/docker-elk/suricata/rules/suricata.rules:/var/lib/suricata/rules/suricata.rules \
  -e INT=${interface} \
  docker.io/cifranix/suricata:4.1.2 \
  bash -c "echo ${INT} && /usr/bin/suricata -c /etc/suricata/suricata.yaml -i ${interface} --init-errors-fatal"
