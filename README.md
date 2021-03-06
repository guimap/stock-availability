# Getting Started

## Popular banco de dados
Faça um import dos dados no banco de dados mongo, os arquivos de bump estão dentro da pasta `data/`

## Variaveis de ambiente
Crie um arquivo `.env` a partir do `.env.example`

## Instale as depedencias e starte o projeto
Rode o comando `npm install` e após o OK rode `npm start`



# Rotas

## Situação de todas cidades
Retorna uma lista de todas as cidades com os seus respectivos codes
[GET]`/stock/availability/all`
### Response 
```json
[
    {
        "uf": "AC",
        "city": "RIO BRANCO",
        "alert": {
            "code": "red"
        }
    },
    {
        "uf": "AL",
        "city": "MACEIO",
        "alert": {
            "code": "green"
        }
    }
]
```

## Situação de uma cidade especifica
Retorna a situação de uma cidade especifica
[GET] `/stock/availability/{uf}/{city}`

### Params
| Paramatero | Tipo     | Descrição      | Required |
|------------|----------|----------------|----------|
| `city`     | `string` | Cidade do polo | `true`   |
| `uf`       | `string` | UF do polo     | `true`   |

### Response 

```json
{
    "uf": "AL",
    "city": "MACEIO",
    "alert": {
        "code": "green"
    }
}
```

# Cidades exemplos com seus codes

---

Cidades com code **red**

GO - RIO VERDE

---

Cidades com code **green**

AM - MANAUS

---
Cidades com code **amarelo**

MG - ALFENAS

---