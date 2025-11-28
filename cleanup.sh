#!/bin/bash

# Cleanup script for Employee Management System

set -e

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

echo -e "${YELLOW}========================================${NC}"
echo -e "${YELLOW}Removing Employee Management System${NC}"
echo -e "${YELLOW}========================================${NC}"
echo ""

# Confirm deletion
read -p "Are you sure you want to remove all resources? (yes/no): " CONFIRM

if [ "$CONFIRM" != "yes" ]; then
    echo -e "${RED}Deletion cancelled${NC}"
    exit 0
fi

echo -e "${YELLOW}Removing resources...${NC}"

kubectl delete -f k8s/05-ingress.yaml --ignore-not-found=true
kubectl delete -f k8s/04-frontend-deployment.yaml --ignore-not-found=true
kubectl delete -f k8s/03-backend-deployment.yaml --ignore-not-found=true
kubectl delete -f k8s/02-secrets.yaml --ignore-not-found=true
kubectl delete -f k8s/01-configmap.yaml --ignore-not-found=true
kubectl delete -f k8s/00-namespace.yaml --ignore-not-found=true

echo -e "${GREEN}✓ All resources removed${NC}"
echo ""
echo -e "${GREEN}Cleanup complete!${NC}"
