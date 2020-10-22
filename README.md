# Task-e
<https://task-e.web.app>

**Бесплатное онлайн-приложение для планирования твоего времени, в котором сочетаются локаничность и простота.**

Этот проект создан с помощью [Create React App](https://github.com/facebook/create-react-app).

## Разработка

Проект использует Google [Firebase](https://firebase.google.com), поэтому, перед выполнением команд, необходимо получить объект `firebaseConfig`, который доступен после [настройки Firebase](https://firebase.google.com/docs/web/setup), и записать его в файл `src/helpers/firebaseConfig.js`:

**В корневой директории проекта:**
```
cd src/helpers
touch firebaseConfig.js
```

**В файле firebaseConfig.js (пример):**
```js
const firebaseConfig = {
  apiKey: "AIzaSyDOCAbC123dEf456GhI789jKl01-MnO",
  authDomain: "myapp-project-123.firebaseapp.com",
  databaseURL: "https://myapp-project-123.firebaseio.com",
  projectId: "myapp-project-123",
  storageBucket: "myapp-project-123.appspot.com",
  messagingSenderId: "65211879809",
  appId: "1:65211879909:web:3ae38ef1cdcb2e01fe5f0c",
  measurementId: "G-8GSGZQ44ST"
}

export default apiKey
```

### Команды

Перед использованием команд убедитесь:
1. Убедитесь, что у вас установлен менеджер пакетов [Yarn](https://yarnpkg.com/getting-started/install).
2. Установите зависимости в корневой директории проекта командой `yarn` или `yarn install`.

#### `yarn start`

Запускает приложение в режиме разработчика по адресу [http://localhost:3000](http://localhost:3000).

#### `yarn build`

Собирает готовое приложене в директории `build`.

#### `yarn eject`

**Примечание: эта операция выполняется единожды.**

Позволяет получить доступ к конфигурации: всем зависимостям, которые используются в проекте.

#### `yarn deploy`

Развертывает приложение на [хостинге проекта Firebase](https://firebase.google.com/docs/hosting/quickstart).
