## Запуск приложения books локально

1. cd books
2. npm i
3. npm run dev

---

## Запуск приложения viewCounter локально

1. cd viewCounter
2. npm i
3. npm run dev

---

## запуск Docker

1. docker-compose up

---

## Docker hub

[docker-hub](https://hub.docker.com/repository/docker/alexander7373/netology-books/general)

--- 

## Запросы для задания

### 1. Вставка данных о двух книгах в коллекцию `books`

```js
db.books.insertMany([
  {
    title: "Book One",
    description: "Description of book one.",
    authors: "Author One"
  },
  {
    title: "Book Two",
    description: "Description of book two.",
    authors: "Author Two"
  }
])
```

---

### 2. Поиск документов коллекции `books` по полю `title`

```js
db.books.find({ title: "Book One" })
```

---

### 3. Обновление полей `description` и `authors` по `_id` записи

```js
db.books.updateOne(
  { _id: ObjectId("вставьте_сюда_объект_id_записи") },
  { $set: { description: "New description", authors: "New author" } }
)
```

---



