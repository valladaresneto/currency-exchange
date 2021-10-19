###### **Projeto de cotação de preço de moedas**

O objetivo desse projeto é exibir a cotação de valor de moedas em tempo real. 
A aplicação terá muitos, na casa de milhares, usuários acessando simultaneamente.

Os requisitos funcionais para esse projeto são: 

  - Apresentar e atualizar a cotação em tempo real de pelo menos 10 moedas em BRL
  - Apresentar o histórico de cotação de pelo menos uma moeda em gráfico
  - Utilizar a API para consultar as cotações - https://docs.awesomeapi.com.br/api-de-moedas
  - A aplicação deverá atender o quesito de escalabilidade 
         
Requisitos Opcionais: 

  - Permitir o cadastro de usuários
  - Permitir que o usuário escolha suas moedas favoritas dentre as moedas disponíveis na tela 
    
Requisitos Técnicos: 
  - Docker
  - Backend e frontend utilizando Typescript
  - React
  - Banco de dados não relacional e relacional
  - Armazenar a última cotação em cache
  - Documentação da API 

Critérios de avaliação: 
Requisitos funcionais e não funcionais
Qualidade do código
Estrutura organizacional do projeto
Configuração
Reusabilidade
Modularidade
Teste automatizado 

O projeto deverá ser entregue no GitHub pessoal do candidato, com permissão de acesso pelos avaliadores.


===============

Commands to run before start clusters:

Install ingress-nginx

kubectl apply -f https://raw.githubusercontent.com/kubernetes/ingress-nginx/controller-v1.0.4/deploy/static/provider/cloud/deploy.yaml

Verify if it is running:

kubectl get pods -n ingress-nginx -l app.kubernetes.io/name=ingress-nginx --watch

Create secrets to use in the kubernetes config files:

kubectl create secret generic jwt-secret --from-literal=JWT_KEY=$$$
kubectl create secret generic pg-user-secret --from-literal=POSTGRES_USER=$$$
kubectl create secret generic pg-pass-secret --from-literal=POSTGRES_PASS=$$$

For running the project:

skaffold dev

In development mode try to access:

currencyexchange.dev

If you an security error, type:

thisisunsafe
