import React, { useEffect, useState } from 'react';
import axios from 'axios';


const express = require('express');
const mongoose = require('mongoose');
const app = express();

mongoose.connect('mongodb://localhost:27017/marketplace');

const productSchema = new mongoose.Schema({
    name: String,
    description: String,
    price: Number,
    category: String,
});

const Product = mongoose.model('Product', productSchema);

app.get('/api/products', async (req, res) => {
    try {
        const products = await Product.find();
        res.json(products);
    } catch (error) {
        res.status(500).json({ message: 'Erro no servidor' });
    }
});

app.listen(5000, () => console.log('Servidor rodando na porta 5000'));

function ProductList() {
    const [products, setProducts] = useState([]);

    useEffect(() => {
        async function fetchProducts() {
            try {
                const response = await axios.get('http://localhost:5000/api/products');
                setProducts(response.data);
            } catch (error) {
                console.error('Erro ao buscar produtos:', error);
            }
        }
        fetchProducts();
    }, []);

    return (
        <div>
            {products.length > 0 ? (
                products.map(product => (
                    <div key={product._id}>
                        <h2>{product.name}</h2>
                        <p>{product.description}</p>
                    </div>
                ))
            ) : (
                <p>Nenhum produto encontrado.</p>
            )}
        </div>
    );
}

export default ProductList;
// Dados de exemplo para o marketplace
const produtos = [
    { nome: "Biometano A", volume: "1000 m³", preco: "R$ 500,00", localizacao: "São Paulo" },
    { nome: "Biometano B", volume: "2000 m³", preco: "R$ 1000,00", localizacao: "Rio de Janeiro" },
    { nome: "Biometano C", volume: "1500 m³", preco: "R$ 750,00", localizacao: "Minas Gerais" }
];

const express = require('express');
const mongoose = require('mongoose');
const app = express();

mongoose.connect('mongodb://localhost:27017/marketplace');

const productSchema = new mongoose.Schema({
    name: String,
    description: String,
});

const Product = mongoose.model('Product', productSchema);

app.get('/api/products', async (req, res) => {
    try {
        const products = await Product.find();
        res.json(products);
    } catch (error) {
        res.status(500).json({ message: 'Erro no servidor' });
    }
});

app.listen(5000, () => console.log('Servidor rodando na porta 5000'));

const axios = require('axios');

async function fetchBiomethaneData() {
    try {
        const response = await axios.get('https://api.exemplo.com/biometano');
        return response.data;
    } catch (error) {
        console.error('Erro ao buscar dados:', error);
        return null;
    }

    const express = require('express');
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const app = express();

mongoose.connect('mongodb://localhost:27017/biometano-app');

const userSchema = new mongoose.Schema({
    name: String,
    email: { type: String, unique: true },
    password: String,
});

const User = mongoose.model('User', userSchema);

app.post('/register', async (req, res) => {
    const { name, email, password } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = new User({ name, email, password: hashedPassword });
    await user.save();
    res.status(201).send('Usuário registrado com sucesso!');
});
}

const Web3 = require('web3');
const web3 = new Web3('https://mainnet.infura.io/v3/SEU_PROJETO_INFURA');

const contractAddress = '0xd9145CCE52D386f254917e481eB44e9943F39138';
const abi = [ [
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "_buyer",
				"type": "address"
			},
			{
				"internalType": "uint256",
				"name": "_amount",
				"type": "uint256"
			},
			{
				"internalType": "uint256",
				"name": "_price",
				"type": "uint256"
			}
		],
		"name": "createTransaction",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": false,
				"internalType": "uint256",
				"name": "id",
				"type": "uint256"
			},
			{
				"indexed": false,
				"internalType": "address",
				"name": "seller",
				"type": "address"
			},
			{
				"indexed": false,
				"internalType": "address",
				"name": "buyer",
				"type": "address"
			},
			{
				"indexed": false,
				"internalType": "uint256",
				"name": "amount",
				"type": "uint256"
			},
			{
				"indexed": false,
				"internalType": "uint256",
				"name": "price",
				"type": "uint256"
			}
		],
		"name": "NewTransaction",
		"type": "event"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "_id",
				"type": "uint256"
			}
		],
		"name": "getTransaction",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			},
			{
				"internalType": "address",
				"name": "",
				"type": "address"
			},
			{
				"internalType": "address",
				"name": "",
				"type": "address"
			},
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			},
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			},
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"name": "transactions",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "id",
				"type": "uint256"
			},
			{
				"internalType": "address",
				"name": "seller",
				"type": "address"
			},
			{
				"internalType": "address",
				"name": "buyer",
				"type": "address"
			},
			{
				"internalType": "uint256",
				"name": "amount",
				"type": "uint256"
			},
			{
				"internalType": "uint256",
				"name": "price",
				"type": "uint256"
			},
			{
				"internalType": "uint256",
				"name": "timestamp",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	}
]/* ABI do contrato */ ];

async function getData() {
    const data = await contract.methods.getBiomethaneData().call();
    console.log(data);
}

// Função para carregar produtos no marketplace
function carregarProdutos() {
    const produtosDiv = document.getElementById('produtos');
    produtosDiv.innerHTML = produtos.map(produto => `
        <div class="produto">
            <h3>${produto.nome}</h3>
            <p>Volume: ${produto.volume}</p>
            <p>Preço: ${produto.preco}</p>
            <p>Localização: ${produto.localizacao}</p>
        </div>
    `).join('');
}

// Função para lidar com o login
document.getElementById('loginForm').addEventListener('submit', function (event) {
    event.preventDefault();
    const email = document.getElementById('email').value;
    const senha = document.getElementById('senha').value;
    alert(`Login realizado com: ${email}`);
});

// Carregar produtos ao abrir a página
carregarProdutos();