package com.sadman.financial.utils;

import io.swagger.v3.oas.models.Components;
import io.swagger.v3.oas.models.OpenAPI;
import io.swagger.v3.oas.models.info.Contact;
import io.swagger.v3.oas.models.info.Info;
import io.swagger.v3.oas.models.info.License;
import io.swagger.v3.oas.models.security.SecurityRequirement;
import io.swagger.v3.oas.models.security.SecurityScheme;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class SwaggerConfig {

    @Bean
    public OpenAPI openAPI() {
        String securitySchemeName = "Auth JWT";
        return new OpenAPI()
                .addSecurityItem(
                        new SecurityRequirement()
                                .addList(securitySchemeName)
                )
                .components(
                        new Components()
                                .addSecuritySchemes(securitySchemeName, apiSecurityScheme(securitySchemeName))
                )
                .info(apiInfo());
    }



    private Info apiInfo() {
        return new Info()
                .title("Financial Activity Management System API Documentation")
                .description("A system to manage financial activities including income, expenses, and loans with " +
                        "contract enforcement between users and the system.")
                .version("v0.0.1")
                .contact(apiContact())
                .license(apiLicence());
    }

    private Contact apiContact() {
        return new Contact()
                .name("Sadman Sakib")
                .email("sadmansakib221@gmail.com");
    }


    private License apiLicence() {
        return new License()
                .name("Apache 2.0")
                .url("https://opensource.org/license/apache-2-0/");
    }

    private SecurityScheme apiSecurityScheme(String securitySchemeName) {
        return new SecurityScheme()
                .name(securitySchemeName)
                .type(SecurityScheme.Type.HTTP)
                .scheme("Bearer")
                .bearerFormat("JWT");
    }
}