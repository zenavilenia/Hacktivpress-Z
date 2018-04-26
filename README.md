# Hacktivpress-Z
Repo for my final live code assignment phase 2 using Express, Vue 3, and Mongoose

# Frontend Structure
Path | Information
--- | ---
/ | Main Page : open access for everyone w/o login/signup
/myarticle | article posted by logged user
/:categoryid | article by category
/:categoryid/:articleid | detail article

# End Point

| Route        | HTTP           | Desription  |
| ------------- |-------------| -----|
| /login      | POST | login |
| /register      | POST | register new account |

List of article routes:

| Route        | HTTP           | Desription  |
| ------------- |-------------| -----|
| /articles      | GET | Get all the articles |
| /articles/byauthor/:idauthor      | GET | Get articles by author |
| /articles/bycategory/:idcategory      | GET | Get articles by category |
| /articles/:id      | GET | Get one article |
| /articles      | POST | Create an article |
| /addcomment      | POST | Create a comment on article |
| /like/:id      | POST | add or remove like on article |
| /dislike/:id      | POST | add or remove dislike on article |
| /articles/:id      | DELETE | Delete an article |
| /articles/:id      | PUT | Update an article with new info |

List of category routes:

| Route        | HTTP           | Desription  |
| ------------- |-------------| -----|
| /categories      | GET | Get all the categories |
| /categories/:id      | GET | Get one category |
| /categories      | POST | Create a category |
| /categories/:id      | DELETE | Delete a category |
| /categories/:id      | PUT | Update a category with new info |

List of comments routes:

| Route        | HTTP           | Desription  |
| ------------- |-------------| -----|
| /comments/like/:id      | POST | add or remove like on comment |
| /comments/dislike/:id      | POST | add or remove dislike on comment |
| /comments/:id      | DELETE | Delete an comment |
| /comments/:id      | PUT | Update an comment with new info |

# Usage
Clone this repo

```
client:
npm install
npm run serve
```

```
server:
npm install
npm start
```
# Technologies User
* Vue-cli 3
* express

# Built With
* VS Code