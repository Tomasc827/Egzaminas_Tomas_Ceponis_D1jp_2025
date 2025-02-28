# Egzaminas:

## About

An examination work creating an app that allows users to add an advertisement or a category, edit them and delete them. Requires having authentication to post any advertisement.

## Programming languages
Java, JavaScript(TypeScript), SQL Queries

## Front-end 

### React
* Vite
* TypeScript
* React Router
* React hook forms
* Jwt decoder
* TailwindCSS

## Back-end

### Desktop docker
* PhpMyAdmin
* MySQL

### Spring Boot
* Spring Web
* Spring Data JPA
* Spring Boot Dev Tools
* MySQL Driver
* Bean Validation
* Spring Security
* OAuth2 Resource Server

## Getting Started


1. Copy the link: 
* Https: https://github.com/Tomasc827/Egzaminas_Tomas_Ceponis_D1jp_2025.git
* SSH: git@github.com:Tomasc827/Devjobs_web_app.git

2. Open your favourite terminal and clone the repository
```
git clone https://github.com/Tomasc827/Egzaminas_Tomas_Ceponis_D1jp_2025.git
cd Egzaminas_Tomas_Ceponis_D1jp_2025
```
Alternatively with SSH
```
git clone git@github.com:Tomasc827/Egzaminas_Tomas_Ceponis_D1jp_2025.git
cd Egzaminas_Tomas_Ceponis_D1jp_2025
```
#### Homepage will be visible on http://localhost:5173

3. ### Desktop Docker
#### Once desktop docker is active and running, paste the two following commands in the terminal (Do not forget to change password and username or just use defaults)

```
docker run --name some-mysql -e MYSQL_ROOT_PASSWORD=YOUR-PASSWORD-GOES-HERE -d -p 3306:3306 mysql:8.0
```
```
docker run --name phpmyadmin -d --link some-mysql:db -p 8081:80 phpMyAdmin
```
#### Then in Desktop Docker, first run phpMyAdmin then MySQL and the database will be available on http://localhost:8081 - defaults:
* Username - root
* Password - YOUR-PASSWORD-GOES-HERE
#### Create a database in MySQL
* CREATE DATABASE egzaminas
* In the back folder, src/main/java/resources edit application.properties to reflect your db username and password

4. ### Front-end
 #### Run following commands (Node.js required)
```
npm install 
npm run dev
```

### Back-end
#### Use an IDE of your choice and simply launch the application. Alternatively, if you do not have an IDE like Eclipse or IntelliJ Idea, you can run it through terminal being inside the folder that contains pom.xml file, but you still need to have JRE/JDK and Maven installed for it to work: 

```
mvn clean install
mvn spring-boot:run
```

