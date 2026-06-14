package com.taskapp.backend.service;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;
import software.amazon.awssdk.core.sync.RequestBody;
import software.amazon.awssdk.services.s3.S3Client;
import software.amazon.awssdk.services.s3.model.PutObjectRequest;

import java.io.IOException;
import java.util.UUID;

@Service
public class S3Service {

    private final S3Client s3Client;

    @Value("${AWS_S3_BUCKET_NAME}")
    private String bucketName;

    @Value("${AWS_ENDPOINT_URL}")
    private String endpointUrl;

    public S3Service(S3Client s3Client) {
        this.s3Client = s3Client;
    }

    public String uploadFile(MultipartFile file) throws IOException {

        String fileName = UUID.randomUUID() + "-" + file.getOriginalFilename();

        PutObjectRequest putObjectRequest = PutObjectRequest.builder()
                .bucket(bucketName)
                .key(fileName)
                .contentType(file.getContentType())
                .build();

        s3Client.putObject(
                putObjectRequest,
                RequestBody.fromBytes(file.getBytes())
        );

        return endpointUrl + "/" + bucketName + "/" + fileName;
    }

    public void deleteFile(String fileUrl) {

        if (fileUrl == null || fileUrl.isEmpty()) {
            return;
        }

        String fileKey = fileUrl.substring(
                fileUrl.lastIndexOf("/") + 1
        );

        s3Client.deleteObject(builder -> builder
                .bucket(bucketName)
                .key(fileKey)
        );
    }
}