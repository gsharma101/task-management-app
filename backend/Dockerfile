FROM eclipse-temurin:21

WORKDIR /app

COPY . .

RUN ./mvnw clean package -DskipTests

EXPOSE 5454

CMD ["java", "-jar", "target/taskapp-0.0.1-SNAPSHOT.jar"]