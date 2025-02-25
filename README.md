# Back-POS

Este proyecto es un backend diseñado exclusivamente para pruebas.
Su propósito es evaluar y probar las funcionalidades de sistemas, por lo que no es válido para producción.

Por ahora, incluye:

Validación y autenticación de claves en un entorno controlado.

## Instalación

1. Clona el repositorio:
    ```sh
    git clone https://github.com/YisusDev200/back-pos.git
    ```
2. Navega al directorio del proyecto:
    ```sh
    cd back-pos
    ```
3. Instala las dependencias:
    ```sh
    npm install
    ```

## Uso

Para iniciar la aplicación, renombra el archivo .env.example y agrega los datos correspondientes.

1. Inicia el servidor:
    ```sh
    node --watch server.js
    ```
2. El servidor estará corriendo en `http://localhost:3000`.

## Endpoints

### Generación de Clave de Producto

- **URL:** `/generate-product-key`
- **Método:** `POST`
- **Cuerpo de la Solicitud:**
    ```json
    {
        "email": "usuario@example.com",
        "hardware_id": "12345",
        "rfc": "RFC123456"
    }
    ```
- **Respuesta Exitosa:**
    ```json
    {
        "status": 1,
        "message": "Product key generated and email sent"
    }
    ```

### Validación de Clave de Producto

- **URL:** `/validate-product-key`
- **Método:** `POST`
- **Cuerpo de la Solicitud:**
    ```json
    {
        "email": "usuario@example.com",
        "hardware_id": "12345",
        "rfc": "RFC123456",
        "product_key": "ABCDE-FGHIJ-KLMNO-PQRST"
    }
    ```
- **Respuesta Exitosa:**
    ```json
    {
        "status": 1,
        "message": "Product key is valid"
    }
    ```

### Envío de Código de Verificación

- **URL:** `/send-code`
- **Método:** `POST`
- **Cuerpo de la Solicitud:**
    ```json
    {
        "email": "usuario@example.com"
    }
    ```
- **Respuesta Exitosa:**
    ```json
    {
        "status": 1,
        "message": "Verification code sent"
    }
    ```

### Verificación de Código

- **URL:** `/verify-code`
- **Método:** `POST`
- **Cuerpo de la Solicitud:**
    ```json
    {
        "email": "usuario@example.com",
        "code": "123456"
    }
    ```
- **Respuesta Exitosa:**
    ```json
    {
        "status": 1,
        "message": "Code verified successfully"
    }
    ```

## Dependencias

- [express](https://www.npmjs.com/package/express)
- [body-parser](https://www.npmjs.com/package/body-parser)
- [nodemailer](https://www.npmjs.com/package/nodemailer)
- [sqlite3](https://www.npmjs.com/package/sqlite3)

## Licencia

Este proyecto está licenciado bajo la Licencia ISC.

