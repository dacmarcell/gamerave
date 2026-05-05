package com.dacti.gatekeeperpattern.filters;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.cloud.gateway.filter.GatewayFilterChain;
import org.springframework.cloud.gateway.filter.GlobalFilter;
import org.springframework.core.Ordered;
import org.springframework.http.HttpStatus;
import org.springframework.http.server.reactive.ServerHttpRequest;
import org.springframework.stereotype.Component;
import org.springframework.web.server.ServerWebExchange;

import com.dacti.gatekeeperpattern.utils.JwtUtil;

import reactor.core.publisher.Mono;

@Component
public class JwtAuthFilter implements GlobalFilter, Ordered {
    @Autowired
    private JwtUtil jwtUtil;

    @Override
    public Mono<Void> filter(ServerWebExchange exchange, GatewayFilterChain chain){
        ServerHttpRequest request = exchange.getRequest();
        String path = request.getPath().toString();

        if(!path.startsWith("/api")){
            return chain.filter(exchange);
        }

        String authHeader = request.getHeaders().getFirst("Authorization");
        System.out.println("AUTH HEADER: " + authHeader);
        if(authHeader == null || !authHeader.startsWith("Bearer")){
            return unauthorized(exchange);
        }

        String token = authHeader.substring(7);
        if(!jwtUtil.isValid(token)){
            return unauthorized(exchange);
        }

        return chain.filter(exchange);
    }

    private Mono<Void> unauthorized(ServerWebExchange exchange) {
        exchange.getResponse().setStatusCode(HttpStatus.UNAUTHORIZED);
        return exchange.getResponse().setComplete();
    }

    @Override
    public int getOrder() {
        return -1;
    }

}
