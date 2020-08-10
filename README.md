# Docker Suricata IDS deployment with Elastic Stack SIEM Elastic Stack on Docker

[![Elastic Stack version](https://img.shields.io/badge/ELK-7.6.2-blue.svg?style=flat)](https://github.com/deviantony/docker-elk/issues/483)

Run the latest version of the [Elastic stack][elk-stack] with Docker and Docker Compose.

It gives you the ability to analyze any data set by using the searching/aggregation capabilities of Elasticsearch and
the visualization power of Kibana, with Security alerts consumed from Suricata.

> :information_source: The Docker images backing this stack include [Stack Features][stack-features] (formerly X-Pack)
with [paid features][paid-features] enabled by default (see [How to disable paid
features](#how-to-disable-paid-features) to disable them). The [trial license][trial-license] is valid for 30 days.

Based on the official Docker images from Elastic:

* [Elasticsearch](https://github.com/elastic/elasticsearch/tree/master/distribution/docker)
* [Logstash](https://github.com/elastic/logstash/tree/master/docker)
* [Kibana](https://github.com/elastic/kibana/tree/master/src/dev/build/tasks/os_packages/docker_generator)


## Requirements

### Host setup

* [Docker Engine](https://docs.docker.com/install/) version **17.05** or newer
* [Docker Compose](https://docs.docker.com/compose/install/) version **1.20.0** or newer
* 1.5 GB of RAM

> :information_source: Especially on Linux, make sure your user has the [required permissions][linux-postinstall] to
> interact with the Docker daemon.

By default, the stack exposes the following ports:
* 5000: Logstash TCP input
* 9200: Elasticsearch HTTP
* 9300: Elasticsearch TCP transport
* 5601: Kibana

> :warning: Elasticsearch's [bootstrap checks][booststap-checks] were purposely disabled to facilitate the setup of the
> Elastic stack in development environments. For production setups, we recommend users to set up their host according to
> the instructions from the Elasticsearch documentation: [Important System Configuration][es-sys-config].

### SELinux

On distributions which have SELinux enabled out-of-the-box you will need to either re-context the files or set SELinux
into Permissive mode in order for docker-elk to start properly. For example on Redhat and CentOS, the following will
apply the proper context:

```console
$ chcon -R system_u:object_r:admin_home_t:s0 docker-elk/
```

## Usage

### Bringing up the stack

Ensure your box has: 
  * 2 interfaces 
  * at least 4 CPU cores
  * 6GB memory.

#### On Centos 7: 

What is the second interface name? This would be the interface that you'd like suricata to monitor. You can check by issuing `ip a`
```console 
$ export interface=<YOUR_INTERFACE_NAME>
```
EX:
```console
$ export interface=eth1
``` 

Clone Repo (run as root):
```console
$ git clone https://github.com/cifranix/docker-elk.git && cd docker-elk
```

Add your interface to the .env file
```console
$ echo SURICATA_INT=${interface} > .env
```
Disable off SELinux
```console
$ setenforce 0
$ sed -i 's/enforcing/disabled/g' /etc/selinux/config
```

For Centos7, first install docker, and ensure it's on:
```console
$ yum -y install epel-release 
$ yum -y install docker 
$ systemctl start docker
$ systemctl enable docker
```

Get docker-compose version 1.26.0:
```console
$ sudo curl -L "https://github.com/docker/compose/releases/download/1.26.0/docker-compose-$(uname -s)-$(uname -m)" -o /usr/local/bin/docker-compose
$ sudo chmod +x /usr/local/bin/docker-compose
```

Increase virtual memory count
```console
$ echo vm.max_map_count=262144 >> /etc/sysctl.conf
$ sysctl -w vm.max_map_count=262144
```

Clone this repository onto the Docker host that will run the stack, then start services locally using Docker Compose:

```console
$ docker-compose up
```


You can also run all services in the background (detached mode) by adding the `-d` flag to the above command.

> :warning: It could take several minutes for to bootstrap before kibana is ready on port 5601 

> :warning: You must rebuild the stack images with `docker-compose build` whenever you switch branch or update the
> version of an already existing stack.

If you are starting the stack for the very first time, please read the section below attentively.

### Cleanup

Elasticsearch data is persisted inside a volume by default.

In order to entirely shutdown the stack and remove all persisted data, use the following Docker Compose command:

```console
$ docker-compose down -v
```


[elk-stack]: https://www.elastic.co/elk-stack
[stack-features]: https://www.elastic.co/products/stack
[paid-features]: https://www.elastic.co/subscriptions
[trial-license]: https://www.elastic.co/guide/en/elasticsearch/reference/current/license-settings.html

[linux-postinstall]: https://docs.docker.com/install/linux/linux-postinstall/

[booststap-checks]: https://www.elastic.co/guide/en/elasticsearch/reference/current/bootstrap-checks.html
[es-sys-config]: https://www.elastic.co/guide/en/elasticsearch/reference/current/system-config.html

[win-shareddrives]: https://docs.docker.com/docker-for-windows/#shared-drives
[mac-mounts]: https://docs.docker.com/docker-for-mac/osxfs/

[builtin-users]: https://www.elastic.co/guide/en/elasticsearch/reference/current/built-in-users.html
[ls-security]: https://www.elastic.co/guide/en/logstash/current/ls-security.html
[sec-tutorial]: https://www.elastic.co/guide/en/elasticsearch/reference/current/security-getting-started.html

[connect-kibana]: https://www.elastic.co/guide/en/kibana/current/connect-to-elasticsearch.html
[index-pattern]: https://www.elastic.co/guide/en/kibana/current/index-patterns.html

[config-es]: ./elasticsearch/config/elasticsearch.yml
[config-kbn]: ./kibana/config/kibana.yml
[config-ls]: ./logstash/config/logstash.yml

[es-docker]: https://www.elastic.co/guide/en/elasticsearch/reference/current/docker.html
[kbn-docker]: https://www.elastic.co/guide/en/kibana/current/docker.html
[ls-docker]: https://www.elastic.co/guide/en/logstash/current/docker-config.html

[log4j-props]: https://github.com/elastic/logstash/tree/7.6/docker/data/logstash/config
[esuser]: https://github.com/elastic/elasticsearch/blob/7.6/distribution/docker/src/docker/Dockerfile#L23-L24

[upgrade]: https://www.elastic.co/guide/en/elasticsearch/reference/current/setup-upgrade.html

[swarm-mode]: https://docs.docker.com/engine/swarm/
