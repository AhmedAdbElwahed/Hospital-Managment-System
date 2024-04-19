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
import org.springframework.security.config.annotation.authentication.configuration.AuthenticationConfiguration;
import org.springframework.security.config.annotation.method.configuration.EnableMethodSecurity;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configurers.AbstractHttpConfigurer;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;
import org.springframework.security.web.util.matcher.AntPathRequestMatcher;

@Configuration
@EnableWebSecurity
@EnableMethodSecurity
@AllArgsConstructor
public class SecurityConfig {

    private JwtAuthenticationFilter jwtAuthenticationFilter;
    private UserDetailServiceImpl userDetailService;
    private LogoutService logoutService;

    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity httpSecurity) throws Exception {
        httpSecurity.csrf(AbstractHttpConfigurer::disable)
                .sessionManagement(session -> session.sessionCreationPolicy(SessionCreationPolicy.STATELESS))
                .authorizeHttpRequests((request) ->
                        request.requestMatchers(new AntPathRequestMatcher("/hms/v1/auth/**"))
                                .permitAll()
                                .anyRequest()
                                .authenticated());
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
