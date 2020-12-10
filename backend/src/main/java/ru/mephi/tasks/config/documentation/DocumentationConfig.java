package ru.mephi.tasks.config.documentation;

import io.swagger.v3.oas.models.Components;
import io.swagger.v3.oas.models.OpenAPI;
import io.swagger.v3.oas.models.info.Info;
import io.swagger.v3.oas.models.security.SecurityRequirement;
import io.swagger.v3.oas.models.security.SecurityScheme;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
@RequiredArgsConstructor
public class DocumentationConfig {

    @Value("${info.app.version}")
    private String appVersion;

    @Bean
    public OpenAPI openAPI() {
        return new OpenAPI()
                .info(
                        new Info().title("Task management")
                                .description("Task management application")
                                .version(appVersion))
                .addSecurityItem(new SecurityRequirement().addList("bearerAuth"))
                .components(
                        new Components()
                                .addSecuritySchemes("bearerAuth",
                                        new SecurityScheme()
                                                .name("bearerAuth")
                                                .type(SecurityScheme.Type.HTTP)
                                                .scheme("bearer")
                                                .bearerFormat("JWT")
                                )
                );
    }
}