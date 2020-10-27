# todo-backend

This is a very simple REST API for a To Do list, it supports multiple tenants and multiple lists per tenant.

working demo: https://multi-tenant-todo.herokuapp.com/

### `GET`

- `/` : returns an array with all todos by all tenants
- `/:id` : returns a single todo
- `/t/:tenant/` : returns an array with all todos for a specific tenant
- `/t/:tenant/:list` : returns an array with all todos for a specitic list and a specific tenant

### `POST`

- `/` : creates a new todo
  - if no tenant is specified it will defaul to `anonymous`
  - if no list is specified it will default to `main`

### `PATCH`

- `/:id` : update a todo

### `PUT`

- `/:id` : update a todo

### `DELETE`

- `/:id` : deletes a single todo
- `/t/:tenant/` : deletes all todos for a specific tenant
- `/t/:tenant/:list` : deletes all todos for a specitic list
