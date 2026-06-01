# Cloud-Native Node.js App on AWS (Docker + Kubernetes)

A simple **Node.js** web app, containerized with **Docker**, stored in **Amazon ECR**, and deployed to **Kubernetes (Minikube)** on an **AWS EC2** instance — all within the **AWS Free Tier** at **$0 cost**.

The app shows a live timestamp, the container ID, and a visitor counter, plus a `/health` endpoint.

---

## How It Works

​```
Laptop  -->  Docker image  -->  Amazon ECR  -->  EC2 (Minikube)  -->  Browser
​```

1. Build the Node.js app into a Docker image.
2. Push the image to Amazon ECR.
3. EC2 pulls the image and runs it on a Minikube Kubernetes cluster.
4. The app is exposed publicly on port `30080`.

---

## Files

| File | Purpose |
|------|---------|
| `app.js` | The Express web server |
| `package.json` | Dependencies |
| `Dockerfile` | Builds the container image |
| `deployment.yaml` | Kubernetes Deployment + Service |

---

## Run Locally

​```bash
npm install
npm start
# open http://localhost:3000
​```

Or with Docker:

​```bash
docker build -t cloud-k8s-app .
docker run -p 3000:3000 cloud-k8s-app
​```

---

## Deploy on Kubernetes (EC2)

​```bash
minikube start --driver=docker --memory=850mb --cpus=2 --force
minikube image load <ECR_IMAGE>
kubectl apply -f deployment.yaml
sudo socat TCP-LISTEN:30080,fork,reuseaddr TCP:$(minikube ip):30080 &
​```

App becomes available at `http://<EC2_PUBLIC_IP>:30080`.

---

## Tech Stack

Node.js · Express · Docker · Amazon ECR · Kubernetes (Minikube) · AWS EC2 (Free Tier)

---

*Created for a university Cloud Computing project.*
