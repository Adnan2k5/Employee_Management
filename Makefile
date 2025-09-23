# Makefile for Employee Management System Docker operations

.PHONY: help build up down logs clean dev prod restart

# Default target
help:
	@echo "Employee Management System - Docker Commands"
	@echo "============================================"
	@echo "build     - Build all Docker images"
	@echo "up        - Start all services (production with nginx)"
	@echo "dev       - Start services in development mode"
	@echo "down      - Stop all services"
	@echo "logs      - Show logs for all services"
	@echo "logs-f    - Follow logs for all services"
	@echo "restart   - Restart all services"
	@echo "clean     - Remove all containers, images, and volumes"
	@echo "backend   - Build and start only backend"
	@echo "frontend  - Build and start only frontend"
	@echo "health    - Check health of all services"

# Build all images
build:
	docker-compose -f dockercompose.yml build

# Start all services (production)
up:
	docker-compose -f dockercompose.yml up -d

# Start services in development mode
dev:
	docker-compose -f docker-compose.dev.yml up -d

# Stop all services
down:
	docker-compose -f dockercompose.yml down
	docker-compose -f docker-compose.dev.yml down

# Show logs
logs:
	docker-compose -f dockercompose.yml logs

# Follow logs
logs-f:
	docker-compose -f dockercompose.yml logs -f

# Restart services
restart:
	docker-compose -f dockercompose.yml restart

# Clean up everything
clean:
	docker-compose -f dockercompose.yml down -v --rmi all
	docker-compose -f docker-compose.dev.yml down -v --rmi all
	docker system prune -f

# Backend only
backend:
	docker-compose -f dockercompose.yml up -d backend

# Frontend only
frontend:
	docker-compose -f dockercompose.yml up -d frontend

# Health check
health:
	@echo "Checking service health..."
	@curl -f http://localhost:8080/actuator/health || echo "Backend health check failed"
	@curl -f http://localhost:3000 || echo "Frontend health check failed"
	@curl -f http://localhost:80/health || echo "Nginx health check failed"

# Quick development start
quick-dev:
	@echo "Starting development environment..."
	docker-compose -f docker-compose.dev.yml up -d
	@echo "Services started. Access:"
	@echo "  Frontend: http://localhost:3000"
	@echo "  Backend:  http://localhost:8080"
	@echo "  API Docs: http://localhost:8080/swagger-ui.html"