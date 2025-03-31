/*package com.example.custom.AuthenticationFilter;

import jakarta.servlet.Filter;
import jakarta.servlet.FilterChain;
import jakarta.servlet.FilterConfig;
import jakarta.servlet.ServletException;
import jakarta.servlet.ServletRequest;
import jakarta.servlet.ServletResponse;
import jakarta.servlet.annotation.WebFilter;
import jakarta.servlet.http.HttpServletRequest;
import org.springframework.stereotype.Component;

import java.io.IOException;

@Component
@WebFilter("/*")  // Apply this filter to all incoming requests
public class AuthenticationFilter implements Filter {

    public static ThreadLocal<String> pinggyAuthHeader = new ThreadLocal<>();

    @Override
    public void init(FilterConfig filterConfig) throws ServletException {
        // Initialize any resources needed by the filter
    }

    @Override
    public void doFilter(ServletRequest request, ServletResponse response, FilterChain chain)
            throws IOException, ServletException {
        HttpServletRequest httpRequest = (HttpServletRequest) request;
        String headerValue = httpRequest.getHeader("PinggyAuthHeader");

        if (headerValue != null && !headerValue.isEmpty()) {
            pinggyAuthHeader.set(headerValue);  // Store in ThreadLocal for use later
            chain.doFilter(request, response);  // Continue processing the request
        } else {
            response.setStatus(401);  // Unauthorized if the header is missing or empty
            return;
        }
    }

    @Override
    public void destroy() {
        // Cleanup resources if needed
    }
}*/
package com.example.custom.AuthenticationFilter;

import jakarta.servlet.Filter;
import jakarta.servlet.FilterChain;
import jakarta.servlet.FilterConfig;
import jakarta.servlet.ServletException;
import jakarta.servlet.ServletRequest;
import jakarta.servlet.ServletResponse;
import jakarta.servlet.annotation.WebFilter;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;  // Import HttpServletResponse
import org.springframework.stereotype.Component;

import java.io.IOException;

@Component
@WebFilter("/*")  // Apply this filter to all incoming requests
public class AuthenticationFilter implements Filter {

    public static ThreadLocal<String> pinggyAuthHeader = new ThreadLocal<>();

    @Override
    public void init(FilterConfig filterConfig) throws ServletException {
        // Initialize any resources needed by the filter
    }

    @Override
    public void doFilter(ServletRequest request, ServletResponse response, FilterChain chain)
            throws IOException, ServletException {

        // Cast ServletRequest to HttpServletRequest
        HttpServletRequest httpRequest = (HttpServletRequest) request;
        // Cast ServletResponse to HttpServletResponse
        HttpServletResponse httpResponse = (HttpServletResponse) response;

        String headerValue = httpRequest.getHeader("PinggyAuthHeader");

        if (headerValue != null && !headerValue.isEmpty()) {
            pinggyAuthHeader.set(headerValue);  // Store the header value in ThreadLocal
            chain.doFilter(request, response);  // Continue processing the request
        } else {
            httpResponse.setStatus(401);  // Set HTTP status code 401 for Unauthorized
            return;  // Don't continue the chain if unauthorized
        }
    }

    @Override
    public void destroy() {
        // Cleanup resources if needed
    }
}


