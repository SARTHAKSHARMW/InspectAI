package com.inspectai.backend.service;

import com.inspectai.backend.dto.AiPredictionResponse;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.core.io.ByteArrayResource;
import org.springframework.http.*;
import org.springframework.stereotype.Service;
import org.springframework.util.LinkedMultiValueMap;
import org.springframework.util.MultiValueMap;
import org.springframework.web.client.RestClientException;
import org.springframework.web.client.RestTemplate;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;

@Service
public class AiServiceClient {

    @Autowired
    private RestTemplate restTemplate;

    @Value("${ai.service.url}")
    private String aiServiceUrl;


    public AiPredictionResponse predict(MultipartFile image) {

        try {

            HttpHeaders headers = new HttpHeaders();
            headers.setContentType(MediaType.MULTIPART_FORM_DATA);

            byte[] imageBytes = image.getBytes();
            String originalFilename = image.getOriginalFilename();

            ByteArrayResource fileResource = new ByteArrayResource(imageBytes) {
                @Override
                public String getFilename() {
                    return originalFilename;
                }
            };

            MultiValueMap<String, Object> body = new LinkedMultiValueMap<>();
            body.add("image", fileResource);

            HttpEntity<MultiValueMap<String, Object>> requestEntity =
                    new HttpEntity<>(body, headers);

            ResponseEntity<AiPredictionResponse> response =
                    restTemplate.postForEntity(
                            aiServiceUrl + "/predict",
                            requestEntity,
                            AiPredictionResponse.class
                    );

            if (response.getBody() == null) {
                throw new RuntimeException("AI Service returned empty response");
            }

            return response.getBody();

        } catch (IOException e) {

            throw new RuntimeException(
                    "Failed to read uploaded image: " + e.getMessage()
            );

        } catch (RestClientException e) {

            throw new RuntimeException(
                    "AI Service unavailable: " + e.getMessage()
            );

        }

    }

}
