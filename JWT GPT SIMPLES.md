Para implementar uma autenticação com JWT de forma mais simples, sem usar banco de dados, podemos utilizar uma abordagem que armazena os usuários e senhas diretamente no código. Em um ambiente de produção, essa abordagem não é recomendada, mas é válida para testes ou pequenas aplicações.

### Estrutura Básica

1. **Configuração de Usuários**: Definimos um conjunto de usuários com credenciais no próprio código.
2. **Autenticação e Geração de Token**: Autentica o usuário com base nos dados configurados e gera um token JWT.
3. **Proteção de Rotas**: Middleware para verificar o token JWT nas rotas protegidas.

### Passo 1: Configuração dos Usuários

Defina uma lista de usuários diretamente no código. Esse exemplo considera que você tem um único usuário.

```javascript
// usuarios.js
const usuarios = [
  { username: 'usuario1', password: 'senha123' },
  { username: 'usuario2', password: 'senha456' },
];

module.exports = usuarios;
```

### Passo 2: Geração do Token JWT

Crie um controlador de autenticação para verificar se o usuário e a senha são válidos e, em caso positivo, gerar um token JWT.

```javascript
// authController.js
const jwt = require('jsonwebtoken');
const usuarios = require('./usuarios');

const secret = 'seu_segredo_jwt'; // Em produção, use uma variável de ambiente

// Função de Login
function login(req, res) {
  const { username, password } = req.body;

  // Verifica se o usuário existe e a senha está correta
  const usuario = usuarios.find(u => u.username === username && u.password === password);
  
  if (!usuario) {
    return res.status(401).json({ message: 'Credenciais inválidas' });
  }

  // Gera o token JWT
  const token = jwt.sign({ username: usuario.username }, secret, { expiresIn: '1h' });

  return res.json({ message: 'Login bem-sucedido', token });
}

module.exports = { login };
```

### Passo 3: Middleware de Autenticação JWT

Esse middleware irá verificar o token JWT em rotas protegidas.

```javascript
// authMiddleware.js
const jwt = require('jsonwebtoken');
const secret = 'seu_segredo_jwt'; // Use o mesmo segredo do login

function autenticarToken(req, res, next) {
  const token = req.headers['authorization'];

  if (!token) {
    return res.status(403).json({ message: 'Token não fornecido' });
  }

  jwt.verify(token, secret, (err, decoded) => {
    if (err) {
      return res.status(401).json({ message: 'Token inválido' });
    }

    req.username = decoded.username; // Armazena o nome do usuário no request
    next();
  });
}

module.exports = autenticarToken;
```

### Passo 4: Proteção de Rotas com o Middleware

Aplique o middleware `autenticarToken` nas rotas que precisam ser protegidas.

```javascript
// routes.js
const express = require('express');
const { login } = require('./authController');
const autenticarToken = require('./authMiddleware');
const router = express.Router();

// Rota de Login
router.post('/login', login);

// Rota protegida
router.get('/dados-protegidos', autenticarToken, (req, res) => {
  res.json({ message: 'Este é um dado protegido', usuario: req.username });
});

module.exports = router;
```

### Passo 5: Configuração do Servidor

Configure o servidor principal para usar as rotas.

```javascript
// app.js
const express = require('express');
const routes = require('./routes');
const app = express();

app.use(express.json());
app.use('/api', routes);

app.listen(3000, () => {
  console.log('Servidor rodando na porta 3000');
});
```

### Testando

1. **Login**: Envie uma requisição `POST` para `/api/login` com `username` e `password` no corpo da requisição. Em resposta, você receberá um token JWT.
2. **Acesso à Rota Protegida**: Envie uma requisição `GET` para `/api/dados-protegidos` com o token no cabeçalho `Authorization`. Se o token for válido, você terá acesso à rota.

Essa configuração fornece uma autenticação JWT básica sem um banco de dados.
