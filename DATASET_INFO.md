# Información del Dataset NSL-KDD

Este documento proporciona información detallada sobre el dataset NSL-KDD utilizado en esta aplicación.

## 📊 Descripción General

El **NSL-KDD** es un dataset de detección de intrusiones en redes, una versión mejorada del dataset KDD Cup 1999. Es ampliamente utilizado en investigación de ciberseguridad y machine learning para entrenar y evaluar sistemas de detección de intrusiones (IDS).

### Características Principales

- **Total de Registros**: 125,973 conexiones de red
- **Total de Columnas**: 42 características
- **Variable Objetivo**: `class` (normal o anomaly)
- **Tipos de Datos**: Numéricos, categóricos y binarios

## 🔍 Estructura del Dataset

### Categorías de Características

El dataset se organiza en 4 categorías principales:

#### 1. Características Básicas (Basic Features)
Información fundamental sobre la conexión TCP:

| Columna | Tipo | Descripción |
|---------|------|-------------|
| `duration` | Numérico | Duración de la conexión en segundos |
| `protocol_type` | Categórico | Tipo de protocolo (tcp, udp, icmp) |
| `service` | Categórico | Servicio de red de destino (http, ftp, smtp, etc.) |
| `flag` | Categórico | Estado de la conexión (SF, S0, REJ, etc.) |
| `src_bytes` | Numérico | Bytes de datos desde origen a destino |
| `dst_bytes` | Numérico | Bytes de datos desde destino a origen |

#### 2. Características de Contenido (Content Features)
Información sobre el contenido de la conexión:

| Columna | Tipo | Descripción |
|---------|------|-------------|
| `hot` | Numérico | Número de indicadores 'hot' (acceso a archivos sensibles) |
| `num_failed_logins` | Numérico | Número de intentos de login fallidos |
| `logged_in` | Binario | 1 si el login fue exitoso, 0 en caso contrario |
| `num_compromised` | Numérico | Número de condiciones comprometidas |
| `root_shell` | Binario | 1 si se obtuvo acceso root shell |
| `su_attempted` | Binario | 1 si se intentó comando 'su root' |
| `num_root` | Numérico | Número de accesos root |
| `num_file_creations` | Numérico | Número de operaciones de creación de archivos |
| `num_shells` | Numérico | Número de shells iniciados |
| `num_access_files` | Numérico | Número de operaciones en archivos de control de acceso |

#### 3. Características de Tráfico (Traffic Features)
Estadísticas sobre el tráfico de red:

| Columna | Tipo | Descripción |
|---------|------|-------------|
| `count` | Numérico | Conexiones al mismo host en últimos 2 segundos |
| `srv_count` | Numérico | Conexiones al mismo servicio en últimos 2 segundos |
| `serror_rate` | Numérico | % de conexiones con errores SYN |
| `srv_serror_rate` | Numérico | % de conexiones con errores SYN (mismo servicio) |
| `rerror_rate` | Numérico | % de conexiones con errores REJ |
| `srv_rerror_rate` | Numérico | % de conexiones con errores REJ (mismo servicio) |
| `same_srv_rate` | Numérico | % de conexiones al mismo servicio |
| `diff_srv_rate` | Numérico | % de conexiones a diferentes servicios |
| `srv_diff_host_rate` | Numérico | % de conexiones a diferentes hosts |

#### 4. Variable Objetivo (Target)

| Columna | Tipo | Descripción |
|---------|------|-------------|
| `class` | Categórico | **normal** o **anomaly** (ataque) |
| `difficulty_level` | Numérico | Nivel de dificultad para detectar (15-21) |

## 🎯 Tipos de Ataques

El dataset clasifica los ataques en 4 categorías principales:

### 1. DoS (Denial of Service)
**Objetivo**: Hacer que un recurso sea inaccesible

**Ejemplos de ataques**:
- `neptune`: Ataque SYN flood
- `smurf`: Ataque de amplificación ICMP
- `pod`: Ping of Death
- `teardrop`: Fragmentación maliciosa de paquetes
- `land`: Ataque con IP origen = IP destino
- `back`: Ataque Apache backdoor

**Características**:
- Alto número de conexiones (`count`)
- Errores SYN elevados (`serror_rate`)
- Conexiones al mismo host

### 2. Probe (Reconocimiento)
**Objetivo**: Escaneo de puertos y reconocimiento de red

**Ejemplos de ataques**:
- `ipsweep`: Escaneo de IPs activas
- `nmap`: Escaneo de puertos con Nmap
- `portsweep`: Escaneo de múltiples puertos
- `satan`: Herramienta de auditoría de seguridad

**Características**:
- Múltiples conexiones a diferentes puertos
- Conexiones cortas o sin respuesta
- Patrones de escaneo sistemático

### 3. R2L (Remote to Local)
**Objetivo**: Acceso no autorizado desde una máquina remota

**Ejemplos de ataques**:
- `warezclient`: Cliente de software pirata
- `warezmaster`: Servidor de software pirata
- `ftp_write`: Escritura no autorizada vía FTP
- `guess_passwd`: Adivinación de contraseñas
- `imap`: Ataque al servicio IMAP
- `multihop`: Conexión a través de múltiples hosts
- `phf`: Explotación de vulnerabilidad PHF
- `spy`: Espionaje de red

**Características**:
- Intentos de login fallidos (`num_failed_logins`)
- Acceso a archivos sensibles (`hot`)
- Patrones de autenticación anómalos

### 4. U2R (User to Root)
**Objetivo**: Escalada de privilegios de usuario normal a root

**Ejemplos de ataques**:
- `buffer_overflow`: Desbordamiento de búfer
- `loadmodule`: Carga de módulos maliciosos
- `perl`: Explotación de scripts Perl
- `rootkit`: Instalación de rootkit

**Características**:
- Acceso root shell (`root_shell`)
- Intentos de comando su (`su_attempted`)
- Creación de archivos sospechosos
- Número de accesos root elevado

### 5. Normal
**Descripción**: Tráfico de red legítimo sin actividad maliciosa

**Características**:
- Patrones de conexión normales
- Sin indicadores de compromiso
- Servicios legítimos (http, ftp, smtp)

## 📈 Estadísticas del Dataset

### Distribución de Protocolos

| Protocolo | Cantidad | Porcentaje |
|-----------|----------|------------|
| TCP | 102,689 | 81.5% |
| UDP | 14,993 | 11.9% |
| ICMP | 8,291 | 6.6% |

### Distribución de Clases

| Clase | Cantidad | Porcentaje |
|-------|----------|------------|
| Normal | 67,343 | 53.5% |
| Anomaly | 58,630 | 46.5% |

### Top 5 Servicios

| Servicio | Cantidad | Porcentaje |
|----------|----------|------------|
| http | 64,293 | 51.0% |
| private | 20,407 | 16.2% |
| domain_u | 8,346 | 6.6% |
| smtp | 7,775 | 6.2% |
| ftp_data | 3,783 | 3.0% |

## 🔬 Casos de Uso

### 1. Detección de Intrusiones
Entrenar modelos de ML para identificar tráfico malicioso en tiempo real.

### 2. Clasificación Binaria
Distinguir entre tráfico normal y anómalo.

### 3. Clasificación Multiclase
Identificar el tipo específico de ataque (DoS, Probe, R2L, U2R).

### 4. Análisis de Anomalías
Detectar patrones inusuales en el tráfico de red.

### 5. Investigación en Ciberseguridad
Estudiar características de diferentes tipos de ataques.

## 🎓 Mejoras sobre KDD Cup 1999

El NSL-KDD resuelve varios problemas del dataset original:

1. **Sin registros duplicados**: Elimina registros redundantes
2. **Mejor balance**: Distribución más equilibrada de clases
3. **Tamaño razonable**: Más manejable para experimentación
4. **Sin sesgo**: Reduce el sesgo hacia registros frecuentes

## 📚 Referencias

- **Paper Original**: "A Detailed Analysis of the KDD CUP 99 Data Set" (Tavallaee et al., 2009)
- **Dataset**: [NSL-KDD Dataset](https://www.unb.ca/cic/datasets/nsl.html)
- **Formato**: ARFF (Attribute-Relation File Format)

## 🔗 Columnas Completas

El dataset contiene 42 columnas en total:

1. duration
2. protocol_type
3. service
4. flag
5. src_bytes
6. dst_bytes
7. land
8. wrong_fragment
9. urgent
10. hot
11. num_failed_logins
12. logged_in
13. num_compromised
14. root_shell
15. su_attempted
16. num_root
17. num_file_creations
18. num_shells
19. num_access_files
20. num_outbound_cmds
21. is_host_login
22. is_guest_login
23. count
24. srv_count
25. serror_rate
26. srv_serror_rate
27. rerror_rate
28. srv_rerror_rate
29. same_srv_rate
30. diff_srv_rate
31. srv_diff_host_rate
32. dst_host_count
33. dst_host_srv_count
34. dst_host_same_srv_rate
35. dst_host_diff_srv_rate
36. dst_host_same_src_port_rate
37. dst_host_srv_diff_host_rate
38. dst_host_serror_rate
39. dst_host_srv_serror_rate
40. dst_host_rerror_rate
41. dst_host_srv_rerror_rate
42. class (variable objetivo)

## 💡 Insights Clave

1. **TCP domina**: El 81.5% de las conexiones usan TCP
2. **Dataset balanceado**: 53.5% normal vs 46.5% anomalías
3. **HTTP prevalente**: Más del 50% del tráfico es HTTP
4. **Diversidad de ataques**: Múltiples tipos para entrenamiento robusto
5. **Características ricas**: 41 features para análisis detallado

---

Este dataset es fundamental para la investigación en detección de intrusiones y proporciona una base sólida para entrenar y evaluar sistemas de seguridad de redes.
\`\`\`
