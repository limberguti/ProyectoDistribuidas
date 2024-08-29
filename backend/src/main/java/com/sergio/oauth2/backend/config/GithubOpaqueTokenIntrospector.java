package com.sergio.oauth2.backend.config;

import com.sergio.oauth2.backend.dtos.UserInfo;
import lombok.RequiredArgsConstructor;
import org.springframework.security.oauth2.core.OAuth2AuthenticatedPrincipal;
import org.springframework.security.oauth2.server.resource.introspection.OAuth2IntrospectionAuthenticatedPrincipal;
import org.springframework.security.oauth2.server.resource.introspection.OpaqueTokenIntrospector;
import org.springframework.web.reactive.function.client.WebClient;
import org.springframework.web.reactive.function.client.WebClientResponseException;

import java.util.HashMap;
import java.util.Map;

@RequiredArgsConstructor
public class GithubOpaqueTokenIntrospector implements OpaqueTokenIntrospector {

    private final WebClient userInfoClient;

    @Override
    public OAuth2AuthenticatedPrincipal introspect(String token) {
        try {
            UserInfo userInfo = userInfoClient.get()
                    .uri("/user")  // Configura el URI del recurso de usuario
                    .headers(headers -> headers.setBearerAuth(token))  // Agrega el token al header
                    .retrieve()
                    .bodyToMono(UserInfo.class)
                    .block();

            Map<String, Object> attributes = new HashMap<>();
            attributes.put("sub", userInfo.sub()); // Accede a los campos del record usando los métodos generados automáticamente
            attributes.put("name", userInfo.name()); // Accede a los campos del record usando los métodos generados automáticamente
            return new OAuth2IntrospectionAuthenticatedPrincipal(userInfo.name(), attributes, null);
        } catch (WebClientResponseException e) {
            // Maneja el error aquí si es necesario
            throw new RuntimeException("Error during introspection", e);
        }
    }
}
