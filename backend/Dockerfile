
FROM maven:3.9.8-amazoncorretto-17 AS build

WORKDIR /backend

COPY .mvn/ .mvn/
COPY mvnw .
COPY mvnw.cmd .
COPY pom.xml .

COPY src/ src/

FROM openjdk:17.0.2


WORKDIR /backend


COPY target/backend-0.0.1-SNAPSHOT.jar /backend/backend-0.0.1-SNAPSHOT.jar


EXPOSE 8080


ENTRYPOINT ["java", "-jar", "backend-0.0.1-SNAPSHOT.jar"]
