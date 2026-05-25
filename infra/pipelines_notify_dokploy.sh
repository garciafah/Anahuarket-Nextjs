#!/bin/bash

response=$(curl -s -o /dev/null -w "%{http_code}" -X POST $DOKPLOY_WEBHOOK_URL
          if [ "$response" -ne 200 ]; then
            echo "Error al notificar con Dokploy"
            exit 1
          fi
            echo "Dokploy notificado con éxito. Despliegue en curso."