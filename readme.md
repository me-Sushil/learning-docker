Docker Commands<br>
------------------------------------
IMAGES :<br>
List all Local images<br>
docker images<br>

Delete an image<br>
docker rmi <image_name><br>

Remove unused images<br>
docker image prune<br>

Build an image from a Dockerfile<br>
docker build -t <image_name>:<version> . //version is optional<br>
docker build -t <image_name>:<version> . -no-cache //build without cache<br>

CONTAINER :<br>
List all Local containers (running & stopped)<br>
docker ps -a<br>

List all running containers<br>
docker ps<br>

Create & run a new container<br>
docker run <image_name><br>
//if image not available locally, it’ll be downloaded from DockerHub<br>

Run container in background<br>
docker run -d <image_name><br>

Run container with custom name<br>
docker run - -name <container_name> <image_name><br>

Port Binding in container<br>
docker run -p<host_port>:<container_port> <image_name><br>

Set environment variables in a container<br>
docker run -e <var_name>=<var_value> <container_name> (or <container_id>)<br>

Start or Stop an existing container<br>
docker start|stop <container_name> (or <container_id>)<br>

Inspect a running container<br>
docker inspect <container_name> (or <container_id>)<br>

Delete a container<br>
docker rm <container_name> (or <container_id>)<br>

TROUBLESHOOT :<br>
Fetch logs of a container<br>
docker logs <container_name> (or <container_id)><br>

Open shell inside running container<br>
docker exec -it <container_name> /bin/bash<br>
docker exec -it <container_name> sh<br>


DOCKER HUB :<br>
Pull an image from DockerHub<br>
docker pull <image_name><br>

Publish an image to DockerHub<br>
docker push <username>/<image_name><br>

Login into DockerHub<br>
docker login -u <image_name><br>
Or<br>
docker login<br>
//also, docker logout to remove credentials<br>

Search for an image on DockerHub<br>
docker search <image_name><br>

VOLUMES :<br>
List all Volumes<br>
docker volume ls<br>

Create new Named volume<br>
docker volume create <volume_name><br>

Delete a Named volume<br>
docker volume rm <volume_name><br>

Mount Named volume with running container<br>
docker run - -volume <volume_name>:<mount_path><br>
//or using - -mount<br>
docker run - -mount type=volume,src=<volume_name>,dest=<mount_path><br>

Mount Anonymous volume with running container<br>
docker run - -volume <mount_path><br>

To create a Bind Mount<br>
docker run - -volume <host_path>:<container_path><br>
//or using - -mount<br>
docker run - -mount type=bind,src=<host_path>,dest=<container_path><br>

Remove unused local volumes<br>
docker volume prune //for anonymous volumes<br>

NETWORK :<br>
List all networks<br>
docker network ls<br>

Create a network<br>
docker network create <network_name><br>

Remove a network<br>
docker network rm <network_name><br>

Remove all unused networks<br>
docker network prune<br>

####################################################################################


Install Docker and Docker Compose on your machine (from official Docker site).<br>
Have your project structured like this (create if not):<br>

my-fullstack-app/<br>
├── frontend/               # Vite + React frontend<br>
│   ├── Dockerfile<br>
│   ├── package.json<br>
│   ├── vite.config.js<br>
│   └── src/              # Your React code<br>
├── backend/               # Node.js backend<br>
│   ├── Dockerfile<br>
│   ├── package.json<br>
│   ├── index.js          # Entry point (e.g., Express server)<br>
│   └── ...               # Other backend files<br>
├── docker-compose.yml    # At root<br>
└── .env                  # For environment variables (optional, but recommended)<br>


Final Answer (No Ambiguity)<br>
- NO, you do NOT need all packages installed locally.<br>
- YES, Docker can do everything.<br>

But what you choose depends on HOW you want to develop.<br>

🧠 There Are 2 VALID Development Styles<br>
🔹 OPTION A: Docker-Only Development (Docker does EVERYTHING)<br>

✔ No Node<br>
✔ No npm<br>
✔ No MongoDB<br>
✔ No local node_modules<br>

What exists on your laptop?<br>
Source code<br>
package.json<br>
Docker files<br>

How you work:<br>
docker compose up --build<br>

Editing:<br>
You edit code<br>
Containers restart / hot-reload via volumes<br>

✔ Clean machine<br>
✔ Zero local setup<br>
❌ Slightly slower<br>
❌ Debugging is harder<br>
➡️ This is common in enterprise teams<br>

🔹 OPTION B: Hybrid Development (MOST COMMON)<br>

✔ Node + npm installed locally<br>
✔ Docker used for consistency & MongoDB<br>
✔ Local node_modules exists<br>

How you work:<br>
npm run dev      # frontend<br>
npm start        # backend<br>
docker compose up mongo<br>


✔ Fast feedback<br>
✔ Easy debugging<br>
✔ Best DX<br>
➡️ This is the industry default<br>

🧠 Important Rule (Don’t Mix Confusion)<br>

Local and Docker environments are ISOLATED.<br>
One does NOT depend on the other.<br>

❓ Do I need packages locally?<br>
Scenario	        Local Packages Needed?<br>
Docker-only dev	          ❌ NO<br>
Hybrid dev	              ✅ YES<br>
CI/CD	                  ❌ NO<br>
Production                ❌ NO<br>

🔧 If You Choose Docker-Only (Example)<br>
docker-compose.yml (hot reload)<br>
frontend:<br>
  volumes:<br>
    - ./frontend:/app<br>
    - /app/node_modules<br>


Docker handles:<br>
npm install<br>
dev server<br>

reload<br>
You just write code.<br>

🧾 FINAL PROFESSIONAL RECOMMENDATION (Honest)<br>
For YOU (learning + full-stack dev):<br>

✅ Use Hybrid Development<br>

Local Node + npm<br>
Docker for MongoDB + final testing<br>

This gives:<br>
Faster learning<br>
Easier debugging<br>
Same production behavior<br>

🧠 One-Line Truth (Remember This)<br>

Docker is a runtime, not a replacement for development tools.



##############################################################


🔹 STEP 1: You run npm locally (ONE TIME)<br>
npm create vite@latest frontend<br>
npm install axios<br>


and<br>

npm init -y<br>
npm install express mongoose jsonwebtoken cors dotenv<br>

What this REALLY does:<br>

✔ Creates package.json<br>
✔ Writes dependency names & versions<br>
✔ Creates node_modules on your laptop<br>

The important file is package.json, not node_modules<br>

🔹 STEP 2: Docker ignores local node_modules<br>

Because of:<br>
node_modules<br>

inside .dockerignore<br>
Docker does NOT copy your laptop’s node_modules.<br>

🔹 STEP 3: Docker installs dependencies INSIDE container<br>
RUN npm install<br>

Docker installs:<br>
axios → inside frontend container<br>
express, mongoose, etc → inside backend container<br>
📦 Completely separate node_modules<br>

