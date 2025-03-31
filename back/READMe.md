# Spring Boot Custom Authentication Example

## Description
This project implements a Spring Boot application with a custom authentication filter and an in-memory post storage system.

## Technologies Used
- Spring Boot 3.4.4
- Java 17/21/24 (mention the version used)
- Spring Web

## Setup Instructions
1. Clone the repository.
2. Open the project in your IDE.
3. Run the application with `./mvnw spring-boot:run` or through your IDE.
4. The application listens on `localhost:8080`.

## API Endpoints
- `POST /api/post`: Create a new post.
    - Request body: `{ "title": "Post title", "body": "Post body" }`
    - Returns: "Post created successfully" if the `PinggyAuthHeader` is present.

- `GET /api/list`: Retrieve all stored posts.
    - Returns a list of posts with their titles, bodies, and `PinggyAuthHeader`.

## Author
- Name: ARUL
- Email: arulp0888@gmail.com 
