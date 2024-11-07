Para implementar uma autenticação com JWT (JSON Web Token) em uma aplicação Node.js com Sequelize, você precisará de uma estrutura básica que inclua:

1. **Geração do Token**: Um token JWT é gerado após a autenticação do usuário (login).
2. **Proteção de Rotas**: Middleware que verifica a validade do token JWT em rotas protegidas.

### Pacotes Necessários

Instale os pacotes `jsonwebtoken` para manipular tokens e `bcrypt` para hash de senhas:

```bash
npm install jsonwebtoken bcrypt
```

### Passo 1: Configuração do Modelo de Usuário

No Sequelize, configure um modelo de usuário básico, que inclua campos como `email` e `password`:

```javascript
// models/Usuario.js
const { DataTypes } = require('sequelize');
const bcrypt = require('bcrypt');

module.exports = (sequelize) => {
  const Usuario = sequelize.define('Usuario', {
    email: {
      type: DataTypes.STRING,
      unique: true,
      allowNull: false
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false
    }
  });

  // Hash da senha antes de salvar
  Usuario.beforeCreate(async (usuario) => {
    usuario.password = await bcrypt.hash(usuario.password, 10);
  });

  return Usuario;
};
```

### Passo 2: Configuração do Login e Geração do Token JWT

Crie uma rota para autenticação onde o token será gerado ao fazer login com sucesso.

```javascript
// authController.js
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const { Usuario } = require('./models'); // ajuste o caminho conforme sua estrutura

const secret = 'seu_segredo_jwt'; // Idealmente, use uma variável de ambiente

// Função de Login
async function login(req, res) {
  const { email, password } = req.body;

  // Busca o usuário pelo email
  const usuario = await Usuario.findOne({ where: { email } });
  if (!usuario) {
    return res.status(401).json({ message: 'Usuário não encontrado' });
  }

  // Verifica a senha
  const senhaValida = await bcrypt.compare(password, usuario.password);
  if (!senhaValida) {
    return res.status(401).json({ message: 'Senha incorreta' });
  }

  // Gera o token JWT
  const token = jwt.sign({ id: usuario.id }, secret, { expiresIn: '1h' });

  return res.json({ message: 'Login bem-sucedido', token });
}

module.exports = { login };
```

### Passo 3: Middleware de Autenticação JWT

Crie um middleware para verificar o token JWT em rotas protegidas.

```javascript
// authMiddleware.js
const jwt = require('jsonwebtoken');
const secret = 'seu_segredo_jwt'; // Use o mesmo segredo usado no login

function autenticarToken(req, res, next) {
  const token = req.headers['authorization'];

  if (!token) {
    return res.status(403).json({ message: 'Token não fornecido' });
  }

  jwt.verify(token, secret, (err, decoded) => {
    if (err) {
      return res.status(401).json({ message: 'Token inválido' });
    }

    req.usuarioId = decoded.id; // Armazena o ID do usuário no request
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
  res.json({ message: 'Este é um dado protegido', usuarioId: req.usuarioId });
});

module.exports = router;
```

### Passo 5: Configuração do Servidor

Configure o servidor principal para usar essas rotas.

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

1. **Login**: Envie uma requisição `POST` para `/api/login` com `email` e `password` no corpo da requisição. Em resposta, você receberá um token JWT.
2. **Acesso a rota protegida**: Envie uma requisição `GET` para `/api/dados-protegidos` com o token no cabeçalho `Authorization`. Se o token for válido, você terá acesso aos dados da rota.

Essa estrutura garante uma autenticação básica usando JWT com proteção para rotas que necessitam de login.
