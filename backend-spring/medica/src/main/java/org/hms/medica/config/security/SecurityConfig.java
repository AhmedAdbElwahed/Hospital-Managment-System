package org.hms.medica.config.security;


import lombok.AllArgsConstructor;
import org.hms.medica.auth.service.LogoutService;
import org.hms.medica.config.jwt.JwtAuthenticationFilter;
import org.hms.medica.user.service.UserDetailServiceImpl;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.access.expression.method.DefaultMethodSecurityExpressionHandler;
import org.springframework.security.access.expression.method.MethodSecurityExpressionHandler;
import org.springframework.security.access.hierarchicalroles.RoleHierarchy;
import org.springframework.security.access.hierarchicalroles.RoleHierarchyImpl;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.AuthenticationProvider;
import org.springframework.security.authentication.dao.DaoAuthenticationProvider;
import org.springframework.security.config.Customizer;
import org.springframework.security.config.annotation.authentication.configuration.AuthenticationConfiguration;
import org.springframework.security.config.annotation.method.configuration.EnableMethodSecurity;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configurers.AbstractHttpConfigurer;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.AuthenticationEntryPoint;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;
import org.springframework.security.web.util.matcher.AntPathRequestMatcher;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.CorsConfigurationSource;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;

import java.util.Arrays;
import java.util.List;

@Configuration
@EnableWebSecurity
@EnableMethodSecurity
@AllArgsConstructor
public class SecurityConfig {

    private AuthenticationEntryPoint authenticationEntryPoint;
    private JwtAuthenticationFilter jwtAuthenticationFilter;
    private UserDetailServiceImpl userDetailService;
    private LogoutService logoutService;

    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity httpSecurity) throws Exception {
        httpSecurity.csrf(AbstractHttpConfigurer::disable)
                .cors(corsConfig -> corsConfig.configurationSource(corsConfigurationSource()))
                .sessionManagement(session -> session.sessionCreationPolicy(SessionCreationPolicy.STATELESS))
                .authorizeHttpRequests((request) ->
                        request.requestMatchers(new AntPathRequestMatcher("/hms/v1/auth/**"),
                                        new AntPathRequestMatcher("/v2/api-docs"),
                                        new AntPathRequestMatcher("/v3/api-docs"),
                                        new AntPathRequestMatcher("/v2/api-docs/**"),
                                        new AntPathRequestMatcher("/swagger-resources"),
                                        new AntPathRequestMatcher("//swagger-resources/**"),
                                        new AntPathRequestMatcher("/configuration/ui"),
                                        new AntPathRequestMatcher("/configuration/security"),
                                        new AntPathRequestMatcher("/swagger-ui/**"),
                                        new AntPathRequestMatcher("/swagger-ui.html"),
                                        new AntPathRequestMatcher("/webjars/**")
                                        )
                                .permitAll()
                                .anyRequest()
                                .authenticated());
        httpSecurity.httpBasic((basic) -> basic.authenticationEntryPoint(authenticationEntryPoint))
                .exceptionHandling(Customizer.withDefaults());
        httpSecurity.authenticationProvider(authenticationProvider());
        httpSecurity.addFilterBefore(jwtAuthenticationFilter, UsernamePasswordAuthenticationFilter.class);
        httpSecurity.logout((logout) -> {
            logout.logoutUrl("/hms/v1/auth/logout");
            logout.addLogoutHandler(logoutService);
            logout.logoutSuccessHandler((request, response, authentication) ->
                    SecurityContextHolder.clearContext());

        });
        return httpSecurity.build();
    }


    @Bean
    public AuthenticationProvider authenticationProvider() {
        DaoAuthenticationProvider authenticationProvider = new DaoAuthenticationProvider();
        authenticationProvider.setUserDetailsService(userDetailService);
        authenticationProvider.setPasswordEncoder(passwordEncoder());
        return authenticationProvider;
    }

    @Bean
    public AuthenticationManager authenticationManager(
            AuthenticationConfiguration authenticationConfiguration) throws Exception {
        return authenticationConfiguration.getAuthenticationManager();
    }

    @Bean
    public PasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder();
    }

    @Bean
    public RoleHierarchy roleHierarchy() {
        RoleHierarchyImpl roleHierarchy = new RoleHierarchyImpl();
        String hierarchy = "ROLE_ADMIN > ROLE_DOCTOR \n ROLE_DOCTOR > ROLE_PATIENT \n ROLE_PATIENT > ROLE_USER";
        roleHierarchy.setHierarchy(hierarchy);
        return roleHierarchy;
    }

//    @Bean
//    public DefaultWebSecurityExpressionHandler customWebSecurityExpressionHandler() {
//        DefaultWebSecurityExpressionHandler expressionHandler = new DefaultWebSecurityExpressionHandler();
//        expressionHandler.setRoleHierarchy(roleHierarchy());
//        return expressionHandler;
//    }


    @Bean
    public MethodSecurityExpressionHandler methodSecurityExpressionHandler() {
        DefaultMethodSecurityExpressionHandler expressionHandler = new DefaultMethodSecurityExpressionHandler();
        expressionHandler.setRoleHierarchy(roleHierarchy());
        return expressionHandler;
    }

    @Bean
    CorsConfigurationSource corsConfigurationSource() {
        CorsConfiguration configuration = new CorsConfiguration();
        configuration.setAllowedOrigins(List.of("*"));
        configuration.setAllowedMethods(List.of("*"));
        configuration.setAllowedHeaders(List.of("*"));
        UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
        source.registerCorsConfiguration("/**", configuration);
        return source;
    }





    /*
     .requestMatchers(new AntPathRequestMatcher("hms/v1/test/admin/**")).hasRole("ADMIN")

                                .requestMatchers(new AntPathRequestMatcher("hms/v1/test/admin/**", "GET")).hasAuthority("READ")
                                .requestMatchers(new AntPathRequestMatcher("hms/v1/test/admin/**", "POST")).hasAuthority("WRITE")
                                .requestMatchers(new AntPathRequestMatcher("hms/v1/test/admin/**", "PUT")).hasAuthority("UPDATE")
                                .requestMatchers(new AntPathRequestMatcher("hms/v1/test/admin/**", "DELETE")).hasAuthority("DELETE")

                                .requestMatchers(new AntPathRequestMatcher("hms/v1/test/doctor/**")).hasRole("DOCTOR")

                                .requestMatchers(new AntPathRequestMatcher("hms/v1/test/doctor/**", "GET")).hasAuthority("READ")
                                .requestMatchers(new AntPathRequestMatcher("hms/v1/test/doctor/**", "POST")).hasAuthority("WRITE")
                                .requestMatchers(new AntPathRequestMatcher("hms/v1/test/doctor/**", "PUT")).hasAuthority("UPDATE")
                                .requestMatchers(new AntPathRequestMatcher("hms/v1/test/doctor/**", "DELETE")).hasAuthority("DELETE")
     */
}
