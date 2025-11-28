# Access Your Deployed Application

## ✅ Deployment Status

Your application is successfully deployed to Kubernetes (Minikube)!

## 🚀 How to Access the Application

### Step 1: Run Minikube Tunnel

Open a **NEW TERMINAL** and run:

```bash
minikube tunnel
```

> **Important**: Keep this terminal open. It will ask for your password (sudo required).
> This command routes traffic from 127.0.0.1 to your minikube cluster.

### Step 2: Add Host Entry

Add this line to your `/etc/hosts` file:

```bash
sudo nano /etc/hosts
```

Add this line:

```
127.0.0.1 ems.local
```

Save and exit (Ctrl+O, Enter, Ctrl+X in nano).

### Step 3: Access the Application

Open your browser and visit:

- **Frontend**: http://ems.local
- **Backend API**: http://ems.local/api

## 🔍 Verify Deployment

Check all pods are running:

```bash
kubectl get pods -n ems
```

Expected output:

```
NAME                            READY   STATUS    RESTARTS   AGE
ems-backend-xxxxxxxxx-xxxxx     1/1     Running   0          XXm
ems-backend-xxxxxxxxx-xxxxx     1/1     Running   0          XXm
ems-frontend-xxxxxxxxx-xxxxx    1/1     Running   0          XXm
ems-frontend-xxxxxxxxx-xxxxx    1/1     Running   0          XXm
```

Check services:

```bash
kubectl get svc -n ems
```

Check ingress:

```bash
kubectl get ingress -n ems
```

## 📊 View Logs

Backend logs:

```bash
kubectl logs -n ems -l app=ems-backend --tail=50 -f
```

Frontend logs:

```bash
kubectl logs -n ems -l app=ems-frontend --tail=50 -f
```

## 🧪 Test Backend API

```bash
curl http://ems.local/api/auth/test
# Expected: "Backend is working!"
```

## ⚠️ Troubleshooting

### If you can't access the application:

1. **Ensure minikube tunnel is running**:

   ```bash
   # In a separate terminal
   minikube tunnel
   ```

2. **Check /etc/hosts**:

   ```bash
   cat /etc/hosts | grep ems.local
   # Should show: 127.0.0.1 ems.local
   ```

3. **Verify ingress has address**:

   ```bash
   kubectl get ingress -n ems
   # ADDRESS column should show 127.0.0.1
   ```

4. **Check ingress controller**:

   ```bash
   kubectl get pods -n ingress-nginx
   # Controller pod should be Running
   ```

5. **Test direct pod access**:

   ```bash
   # Get backend pod name
   kubectl get pods -n ems -l app=ems-backend

   # Port forward to test
   kubectl port-forward -n ems svc/ems-backend-service 8080:8080
   # Then visit http://localhost:8080/api/auth/test
   ```

## 🔄 Update Deployment

If you make code changes, rebuild and redeploy:

```bash
# Rebuild images
docker build -t ems-backend:latest -f backend/ems/dockerfile backend/ems/
docker build -t ems-frontend:latest -f client/dockerfile client/

# Load into minikube
minikube image load ems-backend:latest
minikube image load ems-frontend:latest

# Restart pods
kubectl rollout restart deployment/ems-backend -n ems
kubectl rollout restart deployment/ems-frontend -n ems
```

## 🗑️ Clean Up

To remove the deployment:

```bash
./cleanup.sh
# Or manually:
kubectl delete namespace ems
```

## 📝 Quick Reference

| Component       | URL/Command                              |
| --------------- | ---------------------------------------- |
| Frontend        | http://ems.local                         |
| Backend API     | http://ems.local/api                     |
| Test Endpoint   | http://ems.local/api/auth/test           |
| View Pods       | `kubectl get pods -n ems`                |
| View Logs       | `kubectl logs -n ems -l app=ems-backend` |
| Minikube Tunnel | `minikube tunnel` (keep running)         |
