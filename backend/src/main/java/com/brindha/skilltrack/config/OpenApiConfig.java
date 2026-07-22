package com.brindha.skilltrack.config;

import io.swagger.v3.oas.models.ExternalDocumentation;
import io.swagger.v3.oas.models.OpenAPI;
import io.swagger.v3.oas.models.Components;
import io.swagger.v3.oas.models.info.Contact;
import io.swagger.v3.oas.models.info.Info;
import io.swagger.v3.oas.models.info.License;
import io.swagger.v3.oas.models.security.SecurityRequirement;
import io.swagger.v3.oas.models.security.SecurityScheme;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class OpenApiConfig {

    @Bean
    public OpenAPI skillTrackOpenAPI() {

        final String securitySchemeName = "bearerAuth";

        return new OpenAPI()

                .info(
                        new Info()
                                .title("SkillTrack API")
                                .version("1.0.0")
                                .description("SkillTrack Backend API")
                                .contact(
                                        new Contact()
                                                .name("Brindha R A")
                                                .email("brindha@example.com")
                                )
                                .license(
                                        new License()
                                                .name("MIT")
                                )
                )

                .externalDocs(
                        new ExternalDocumentation()
                                .description("SkillTrack Documentation")
                )

                .addSecurityItem(
                        new SecurityRequirement()
                                .addList(securitySchemeName)
                )

                .components(
                        new Components()

                                .addSecuritySchemes(
                                        securitySchemeName,

                                        new SecurityScheme()

                                                .name(securitySchemeName)

                                                .type(SecurityScheme.Type.HTTP)

                                                .scheme("bearer")

                                                .bearerFormat("JWT")
                                )
                );

    }

}