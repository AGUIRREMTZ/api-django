"""
API Views for NSL-KDD Dataset
Provides endpoints to explore the dataset structure and statistics
"""
from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework import status


# Dataset column definitions with descriptions
DATASET_COLUMNS = {
    "basic_features": [
        {
            "name": "duration",
            "type": "numeric",
            "description": "Duración de la conexión en segundos"
        },
        {
            "name": "protocol_type",
            "type": "categorical",
            "description": "Tipo de protocolo (tcp, udp, icmp)",
            "values": ["tcp", "udp", "icmp"]
        },
        {
            "name": "service",
            "type": "categorical",
            "description": "Servicio de red de destino (http, ftp, smtp, etc.)"
        },
        {
            "name": "flag",
            "type": "categorical",
            "description": "Estado de la conexión (SF=Normal, S0=Sin respuesta, REJ=Rechazada, etc.)"
        },
        {
            "name": "src_bytes",
            "type": "numeric",
            "description": "Número de bytes de datos desde el origen al destino"
        },
        {
            "name": "dst_bytes",
            "type": "numeric",
            "description": "Número de bytes de datos desde el destino al origen"
        }
    ],
    "content_features": [
        {
            "name": "hot",
            "type": "numeric",
            "description": "Número de indicadores 'hot' (acceso a archivos sensibles)"
        },
        {
            "name": "num_failed_logins",
            "type": "numeric",
            "description": "Número de intentos de login fallidos"
        },
        {
            "name": "logged_in",
            "type": "binary",
            "description": "1 si el login fue exitoso, 0 en caso contrario"
        },
        {
            "name": "num_compromised",
            "type": "numeric",
            "description": "Número de condiciones comprometidas"
        },
        {
            "name": "root_shell",
            "type": "binary",
            "description": "1 si se obtuvo acceso root shell, 0 en caso contrario"
        },
        {
            "name": "su_attempted",
            "type": "binary",
            "description": "1 si se intentó comando 'su root', 0 en caso contrario"
        }
    ],
    "traffic_features": [
        {
            "name": "count",
            "type": "numeric",
            "description": "Número de conexiones al mismo host en los últimos 2 segundos"
        },
        {
            "name": "srv_count",
            "type": "numeric",
            "description": "Número de conexiones al mismo servicio en los últimos 2 segundos"
        },
        {
            "name": "serror_rate",
            "type": "numeric",
            "description": "Porcentaje de conexiones con errores SYN"
        },
        {
            "name": "srv_serror_rate",
            "type": "numeric",
            "description": "Porcentaje de conexiones con errores SYN para el mismo servicio"
        },
        {
            "name": "rerror_rate",
            "type": "numeric",
            "description": "Porcentaje de conexiones con errores REJ"
        },
        {
            "name": "srv_rerror_rate",
            "type": "numeric",
            "description": "Porcentaje de conexiones con errores REJ para el mismo servicio"
        },
        {
            "name": "same_srv_rate",
            "type": "numeric",
            "description": "Porcentaje de conexiones al mismo servicio"
        },
        {
            "name": "diff_srv_rate",
            "type": "numeric",
            "description": "Porcentaje de conexiones a diferentes servicios"
        }
    ],
    "target": [
        {
            "name": "class",
            "type": "categorical",
            "description": "Clasificación de la conexión: 'normal' o 'anomaly' (ataque)",
            "values": ["normal", "anomaly"],
            "note": "Este es el atributo objetivo (KPI) que se busca predecir"
        },
        {
            "name": "difficulty_level",
            "type": "numeric",
            "description": "Nivel de dificultad para detectar el ataque (15-21)"
        }
    ]
}

ATTACK_TYPES = {
    "DoS (Denial of Service)": {
        "description": "Ataques que buscan hacer que un recurso sea inaccesible",
        "examples": ["neptune", "smurf", "pod", "teardrop", "land", "back"]
    },
    "Probe": {
        "description": "Escaneo de puertos y reconocimiento de red",
        "examples": ["ipsweep", "nmap", "portsweep", "satan"]
    },
    "R2L (Remote to Local)": {
        "description": "Acceso no autorizado desde una máquina remota",
        "examples": ["warezclient", "warezmaster", "ftp_write", "guess_passwd", "imap", "multihop", "phf", "spy"]
    },
    "U2R (User to Root)": {
        "description": "Escalada de privilegios de usuario normal a root",
        "examples": ["buffer_overflow", "loadmodule", "perl", "rootkit"]
    },
    "Normal": {
        "description": "Tráfico de red normal sin actividad maliciosa",
        "examples": ["normal"]
    }
}

DATASET_STATISTICS = {
    "total_records": 125973,
    "total_columns": 42,
    "protocol_distribution": {
        "tcp": 102689,
        "udp": 14993,
        "icmp": 8291
    },
    "class_distribution": {
        "normal": 67343,
        "anomaly": 58630
    },
    "top_services": [
        {"service": "http", "count": 64293},
        {"service": "private", "count": 20407},
        {"service": "domain_u", "count": 8346},
        {"service": "smtp", "count": 7775},
        {"service": "ftp_data", "count": 3783}
    ]
}


@api_view(['GET'])
def api_overview(request):
    """
    Endpoint principal que describe la API y sus endpoints disponibles
    """
    return Response({
        "message": "API de Análisis del Dataset NSL-KDD",
        "description": "Dataset de detección de intrusiones en redes con 125,973 registros",
        "version": "1.0",
        "endpoints": {
            "/api/": "Descripción general de la API",
            "/api/dataset-info/": "Información general del dataset",
            "/api/columns/": "Descripción detallada de todas las columnas",
            "/api/columns/<category>/": "Columnas por categoría (basic_features, content_features, traffic_features, target)",
            "/api/statistics/": "Estadísticas descriptivas del dataset",
            "/api/attack-types/": "Tipos de ataques y sus descripciones",
            "/api/sample-data/": "Datos de ejemplo del dataset"
        }
    })


@api_view(['GET'])
def dataset_info(request):
    """
    Información general sobre el dataset NSL-KDD
    """
    return Response({
        "name": "NSL-KDD Dataset",
        "description": "Dataset de detección de intrusiones en redes basado en KDD Cup 1999",
        "purpose": "Entrenamiento y evaluación de sistemas de detección de intrusiones (IDS)",
        "total_records": 125973,
        "total_columns": 42,
        "target_variable": "class",
        "target_values": ["normal", "anomaly"],
        "features_categories": {
            "basic_features": "Características básicas de la conexión TCP",
            "content_features": "Características del contenido de la conexión",
            "traffic_features": "Características del tráfico de red",
            "target": "Variable objetivo y nivel de dificultad"
        },
        "use_cases": [
            "Detección de ataques de red",
            "Clasificación de tráfico normal vs anómalo",
            "Análisis de patrones de intrusión",
            "Entrenamiento de modelos de Machine Learning para ciberseguridad"
        ]
    })


@api_view(['GET'])
def get_columns(request, category=None):
    """
    Obtiene la descripción de las columnas del dataset
    Si se especifica una categoría, devuelve solo esas columnas
    """
    if category:
        if category not in DATASET_COLUMNS:
            return Response(
                {"error": f"Categoría '{category}' no encontrada. Categorías disponibles: {list(DATASET_COLUMNS.keys())}"},
                status=status.HTTP_404_NOT_FOUND
            )
        return Response({
            "category": category,
            "columns": DATASET_COLUMNS[category]
        })
    
    return Response({
        "total_columns": 42,
        "categories": DATASET_COLUMNS
    })


@api_view(['GET'])
def get_statistics(request):
    """
    Estadísticas descriptivas del dataset
    """
    return Response({
        "dataset_statistics": DATASET_STATISTICS,
        "insights": {
            "protocol_dominance": "TCP es el protocolo más común (81.5% de las conexiones)",
            "class_balance": "Dataset relativamente balanceado: 53.5% normal, 46.5% anomalías",
            "service_diversity": "HTTP es el servicio más común, representando ~51% del tráfico",
            "attack_prevalence": "El dataset contiene múltiples tipos de ataques para entrenamiento robusto"
        }
    })


@api_view(['GET'])
def get_attack_types(request):
    """
    Tipos de ataques presentes en el dataset con descripciones
    """
    return Response({
        "attack_categories": ATTACK_TYPES,
        "total_categories": len(ATTACK_TYPES),
        "note": "Cada categoría agrupa múltiples variantes de ataques específicos"
    })


@api_view(['GET'])
def get_sample_data(request):
    """
    Datos de ejemplo del dataset (primeras filas simuladas)
    """
    sample_data = [
        {
            "id": 1,
            "duration": 0,
            "protocol_type": "tcp",
            "service": "ftp_data",
            "flag": "SF",
            "src_bytes": 491,
            "dst_bytes": 0,
            "logged_in": 0,
            "count": 2,
            "srv_count": 2,
            "serror_rate": 0.00,
            "class": "normal",
            "difficulty_level": 20
        },
        {
            "id": 2,
            "duration": 0,
            "protocol_type": "udp",
            "service": "other",
            "flag": "SF",
            "src_bytes": 146,
            "dst_bytes": 0,
            "logged_in": 0,
            "count": 13,
            "srv_count": 1,
            "serror_rate": 0.00,
            "class": "normal",
            "difficulty_level": 15
        },
        {
            "id": 3,
            "duration": 0,
            "protocol_type": "tcp",
            "service": "private",
            "flag": "S0",
            "src_bytes": 0,
            "dst_bytes": 0,
            "logged_in": 0,
            "count": 123,
            "srv_count": 6,
            "serror_rate": 1.00,
            "class": "anomaly",
            "difficulty_level": 19
        },
        {
            "id": 4,
            "duration": 0,
            "protocol_type": "tcp",
            "service": "http",
            "flag": "SF",
            "src_bytes": 232,
            "dst_bytes": 8153,
            "logged_in": 1,
            "count": 5,
            "srv_count": 5,
            "serror_rate": 0.20,
            "class": "normal",
            "difficulty_level": 21
        },
        {
            "id": 5,
            "duration": 0,
            "protocol_type": "tcp",
            "service": "private",
            "flag": "REJ",
            "src_bytes": 0,
            "dst_bytes": 0,
            "logged_in": 0,
            "count": 121,
            "srv_count": 19,
            "serror_rate": 0.00,
            "class": "anomaly",
            "difficulty_level": 21
        }
    ]
    
    return Response({
        "sample_size": len(sample_data),
        "note": "Estos son ejemplos representativos del dataset NSL-KDD",
        "data": sample_data
    })
