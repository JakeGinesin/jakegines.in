Docker: OS-level virtualization software.

# Concepts
- Namespaces: what the virtualization software can *see*. We set these up with syscalls. Restricts the view of the stuff on the virtualization. 

# Tricks
- `sudo docker run --rm -it ubuntu /bin/bash` -> run docker with ubuntu, then activate shell
- `sudo docker ps` -> list all docker running processes
- `docker build -t [name]:[latest] .` -> build your dockerfile
- `ducker run -it [name]:[latest]` -> run your docker stuff interactively
- `docker image` -> look at docker images around
- `docker exec -it [container] sh` -> open shell inside a container
- `docker inspect <container name>` -> inspect some shit
- `docker container stats` -> look at stats
