# web-app-angular-spring

## ANGULAR

#### Estructura

> Component.ts = Controller
> Component.html = View
> Service.ts = Model(Lógica negocio)

### Crear app

```
ng new customers-app
```

### Lanzar servidor

```
ng serve -o
ng serve --open
```

### Generar nuevo componente(manual)

> Desde src/nombre componente ejecutar:

```
ng generate class footer.component
```

### Generar componente(automático con "generate")

> Forma larga

```
ng generate component directive

```

> Forma corta

```
ng g c directive
```

### Generar servicio

```
ng generate service customer
```

## Spring Boot

### Endpints

#### GET /customers

> http://localhost:8080/api/customers
