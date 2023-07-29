# LatamWallet

API desarrollada para el proyecto LatamWallet para la emulacion en No Country

## Instalación

1. Clona este repositorio en tu máquina local o sube a tu servidor.
2. Instala las dependencias ejecutando el comando `npm install`.
3. Ejecuta el servidor en modo produccion con `npm start`.
4. Para iniciar el servidor en modo desarrollo con reinicio automatico (usando nodemon) usa `npm run dev`.

## Endpoints

- **Crear usuario:** `/users/newuser`

  - Descripción: Crea un usuario en la base de datos.
  - Método: POST
  - Body:
    ```json
    {
        "firstName": "Daniel",
        "secondName": "Don", // Opcional
        "lastName": " Jhon",
        "secondLastName": "Lopez", // Opcional
        "birthDay": "2000-12-25",
        "phone": "4874574574",
        "documentId": "74884484",
        "country": "Argentina",
        "email": "daniel@daniel.com",
        "password": "Password123",
        "profileImg": "image"
    }
    ```    
  - Respuesta code:
    ```Status code: 200 ```
  - Respuesta:
    ```json
    {
        "firstName": "Daniel",
        "secondName": "Don",
        "lastName": " Jhon",
        "secondLastName": "Lopez",
        "birthDay": "2000-12-25",
        "phone": "4874574574",
        "documentId": "74884484",
        "country": "Argentina",
        "email": "daniel@daniel.com",
        "profileImg": "image",
        "qrCodeUrl": "Codigo QR base64"
    }
    ```

- **Login usuario:** `/login`

  - Descripción: Login.
  - Método: POST
  - Body:
    ```json
    {
        "email": "daniel@daniel.com",
        "password": "Password123"
    }
    ```    
  - Respuesta code:
    ```Status code: 200 ```
  - Respuesta:
    ```json
        {
            "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY0YzFkOTE1YzA4AmM3MWFiY2NhYjRlMyIsImlhdCY6MTY9MDY0MzE2NywiZXhwIjoxNjkxODUyNzY3fQ.xCb-TrJqxVS94HISuezk5KzFt8FRgwmPJcFiC7L4SiM",
            "user": {
                "firstName": "Daniel",
                "secondName": "Don",
                "lastName": " Jhon",
                "secondLastName": "Lopez",
                "birthDay": "2000-12-25",
                "phone": "4874574574",
                "documentId": "74884484",
                "country": "Argentina",
                "email": "daniel@daniel.com",
                "profileImg": "image",
                "qrCodeUrl": "Codigo QR base64"
            },
            "balance": 0,
            "containErrors": false,
            "message": "You have successfully logged in, welcome."
        }
    ```

- **Historial de transaciones del usuario:** `/transactions/get-transactions-all`

  - Descripción: Obtener todo el historial de transaciones del usuario.
  - Método: GET
  - Header: ``` Authorization: token ```
  - Respuesta code:
    ```Status code: 200 ```
  - Respuesta:
    ```json
        [
            {
                "id": "64c3ef8e21456ea943c667d8",
                "walletid": "64c1d9a5c08bc71abccab4e4",
                "type": "DEPOSIT",
                "amount": 200,
                "createdAt": "2023-07-28T16:40:46.260Z",
                "toEmail": null,
                "toWalletAddress": null
            },
            {
                "id": "64c2ebbb21456ea943c667c5",
                "walletid": "64c1d9a5c08bc71abccab4e4",
                "type": "TRANSFER",
                "amount": 10,
                "createdAt": "2023-07-27T22:12:11.741Z",
                "toEmail": "test@test.com",
                "toWalletAddress": null
            },
            {
                "id": "64c1dbe9c08bc71abccab4e5",
                "walletid": "64c1d9a5c08bc71abccab4e4",
                "type": "DEPOSIT",
                "amount": 100,
                "createdAt": "2023-07-27T02:52:25.407Z",
                "toEmail": null,
                "toWalletAddress": null
            }
        ]
    ```

- **Historial de transaciones del usuario:** `/transactions/get-transactions-limit/:limit`

  - Descripción: Obtener historial de transaciones del usuario por limite.
  - Método: GET
  - Parametro en url: ``` :limit ``` ejemplo: ``` 2 ```
  - Header: ``` Authorization: token ```
  - Respuesta code:
    ```Status code: 200 ```
  - Respuesta:
    ```json
        [
            {
                "id": "64c3ef8e21456ea943c667d8",
                "walletid": "64c1d9a5c08bc71abccab4e4",
                "type": "DEPOSIT",
                "amount": 200,
                "createdAt": "2023-07-28T16:40:46.260Z",
                "toEmail": null,
                "toWalletAddress": null
            },
            {
                "id": "64c2ebbb21456ea943c667c5",
                "walletid": "64c1d9a5c08bc71abccab4e4",
                "type": "TRANSFER",
                "amount": 10,
                "createdAt": "2023-07-27T22:12:11.741Z",
                "toEmail": "test@test.com",
                "toWalletAddress": null
            }
        ]
    ```

- **Transferencias entre usuarios:** `/transactions/transfer-amount-by-email`

  - Descripción: Transfiere saldo de la cuenta de un usuario hacia otro usuario.
  - Método: POST
  - Header: ``` Authorization: token ```
  - Body:
    ```json
    {
        "amount": 10,
        "email": "test@test.com"
    }
    ```
  - Respuesta code:
    ```Status code: 201 ```
  - Respuesta:
    ```json
    {
        "containErrors": false,
         "message": "Successful transfer"
    }
    ```

- **Retiro de saldo a crypto wallet:** `/transactions/withdraw-in-usdt`

  - Descripción: Retira saldo de la cuenta del usuario a una crypto wallet en la red BSC testnet con el token USDT.
  - Método: POST
  - Header: ``` Authorization: token ```
  - Body:
    ```json
    {
        "amount": 1,
        "walletReceiver": "0x972D4bd2F2Bd4071892610ADEA2161186056c235"
    }
    ```
  - Respuesta code:
    ```Status code: 201 ```
  - Respuesta:
    ```json
    {
        "containErrors": false,
        "message": "Successful transfer",
        "txId": "0x39da438d1c025b447cd0fe4f657e63c1cdda19affa4eb1ae3f4b4706adb49726"
    }
    ```

- **Endpoint para el uso del formulario stripe :** `/payment/create-payment-intent`

  - Descripción: Endpoint para la conexion entre el formulario de stripe y el backend, recibe un monto y devuelve el clientSecret necesario para completar el pago en el formulario stripe.
  - Método: POST
  - Header: ``` Authorization: token ```
  - Body:
    ```json
    {
        "amount": 10
    }
    ```
  - Respuesta code:
    ```Status code: 201 ```
  - Respuesta:
    ```json
    { 
        "clientSecret": "clientSecret"
    }
    ```

- **WebHook para uso interno de Stripe:** `/payment/create-payment-intent`

  - Descripción: Endpoint para escuchar los eventos enviados por Stripe al procesar un pago (Ya sea un pagos sastifactorios rechazados, en el caso de sastifactorio se asigna el saldo al usuario en su wallet).
  - Método: POST
  - Header: ``` Authorization: token ```
  - Body:
    ```json
    {
        "amount": 10
    }
    ```
  - Respuesta code:
    ```Status code: 200 ```
  - Respuesta:
    ```json
    { 
        "clientSecret": "clientSecret"
    }
    ```

## Variables de entorno
```
    PORT=PORT
    DATABASE_URL= URI CONECTION
    TOKEN_SECRET= TOKEN SECRET FOR JWT
    TOKEN_EXP= TOKEN EXP
    STRIPE_PRIVATE_KEY= STRIPE PRIVATE KEY
    STRIPE_CLI= STRIPE CLI KEY
    WALLET_PRIVATE_KEY= PRIVATE KEY CRYPTO WALLET 
```
