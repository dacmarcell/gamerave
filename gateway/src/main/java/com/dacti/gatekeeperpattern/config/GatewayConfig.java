package com.dacti.gatekeeperpattern.config;

import org.springframework.cloud.gateway.route.RouteLocator;
import org.springframework.cloud.gateway.route.builder.RouteLocatorBuilder;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class GatewayConfig {
    @Bean
    public RouteLocator routes(RouteLocatorBuilder builder){
        return builder.routes()
            .route("api-route", r -> r.path("/api/**")
                .filters(f -> f.stripPrefix(1))
                .uri("http://localhost:3333"))
            .build();
    }
}
