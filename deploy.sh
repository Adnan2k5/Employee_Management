#!/bin/bash

# Quick Deployment Script for Employee Management System
# This script provides a fast way to deploy the application

set -e  # Exit on error

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

echo -e "${GREEN}========================================${NC}"
echo -e "${GREEN}Employee Management System - K8s Deploy${NC}"
echo -e "${GREEN}========================================${NC}"
echo ""

# Check prerequisites
echo -e "${YELLOW}Checking prerequisites...${NC}"

if ! command -v kubectl &> /dev/null; then
    echo -e "${RED}Error: kubectl is not installed${NC}"
    exit 1
fi

if ! command -v docker &> /dev/null; then
    echo -e "${RED}Error: Docker is not installed${NC}"
    exit 1
fi

if ! kubectl cluster-info &> /dev/null; then
    echo -e "${RED}Error: Cannot connect to Kubernetes cluster${NC}"
    exit 1
fi

echo -e "${GREEN}✓ All prerequisites met${NC}"
echo ""

# Build images
echo -e "${YELLOW}Building Docker images...${NC}"

echo "Building backend image..."
docker build -t ems-backend:latest -f backend/ems/dockerfile backend/ems/

echo "Building frontend image..."
docker build -t ems-frontend:latest -f client/dockerfile client/

echo -e "${GREEN}✓ Images built successfully${NC}"
echo ""

# Deploy to Kubernetes
echo -e "${YELLOW}Deploying to Kubernetes...${NC}"

kubectl apply -f k8s/00-namespace.yaml
kubectl apply -f k8s/01-configmap.yaml
kubectl apply -f k8s/02-secrets.yaml
kubectl apply -f k8s/03-backend-deployment.yaml
kubectl apply -f k8s/04-frontend-deployment.yaml
kubectl apply -f k8s/05-ingress.yaml

echo -e "${GREEN}✓ Resources deployed${NC}"
echo ""

# Wait for deployments
echo -e "${YELLOW}Waiting for deployments to be ready...${NC}"

kubectl wait --for=condition=available --timeout=300s deployment/ems-backend -n ems
kubectl wait --for=condition=available --timeout=300s deployment/ems-frontend -n ems

echo -e "${GREEN}✓ Deployments ready${NC}"
echo ""

# Display status
echo -e "${YELLOW}Deployment Status:${NC}"
kubectl get all -n ems

echo ""
echo -e "${GREEN}========================================${NC}"
echo -e "${GREEN}Deployment Complete!${NC}"
echo -e "${GREEN}========================================${NC}"
echo ""
echo "To access the application:"
echo "1. Get ingress IP: kubectl get ingress -n ems"
echo "2. Add to /etc/hosts: <INGRESS_IP> ems.local"
echo "3. Visit: http://ems.local"
echo ""
echo "Useful commands:"
echo "  kubectl get pods -n ems"
echo "  kubectl logs -n ems -l app=ems-backend"
echo "  kubectl logs -n ems -l app=ems-frontend"
